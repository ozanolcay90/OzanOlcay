import fs from 'node:fs';
import path from 'node:path';
import { GoogleGenAI, ThinkingLevel, type GenerateContentResponse } from '@google/genai';
import {
  buildPortfolioKnowledgeBase,
  buildSystemInstruction,
  sanitizeChatHistory,
  type ChatHistoryTurn,
  type ChatMode,
} from '../src/utils/chatHelpers';

const MODEL_NAME = 'gemini-4-hydrogen';

let cachedNotes: string | null = null;

function loadExtendedKnowledgeNotes(): string {
  if (cachedNotes !== null) {
    return cachedNotes;
  }
  const parts: string[] = [];
  const notesPath = path.resolve(process.cwd(), 'server', 'portfolio-notes.md');
  try {
    if (fs.existsSync(notesPath)) {
      parts.push(fs.readFileSync(notesPath, 'utf-8'));
    }
  } catch {
    // Optional extended notes file
  }

  if (process.env.GEMINI_CUSTOM_KNOWLEDGE?.trim()) {
    parts.push(process.env.GEMINI_CUSTOM_KNOWLEDGE.trim());
  }

  cachedNotes = parts.join('\n\n');
  return cachedNotes;
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new GeminiChatError(
      'Gemini API key is not configured on the server. Please add GEMINI_API_KEY in Settings > Secrets (or Vercel Environment Variables).',
      503,
    );
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export class GeminiChatError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = 'GeminiChatError';
    this.status = status;
  }
}

export interface PortfolioChatInput {
  message: string;
  history?: unknown;
  mode?: unknown;
}

function mapUpstreamError(err: unknown): GeminiChatError {
  if (err instanceof GeminiChatError) {
    return err;
  }

  const rawMessage = err instanceof Error ? err.message : String(err ?? 'Unknown Gemini error');
  const status =
    typeof (err as { status?: unknown })?.status === 'number'
      ? (err as { status: number }).status
      : 500;

  if (
    status === 400 &&
    /API_KEY_INVALID|API key not valid/i.test(rawMessage)
  ) {
    return new GeminiChatError(
      'The configured Gemini API key appears invalid. Please verify GEMINI_API_KEY in Settings > Secrets.',
      400,
    );
  }

  if (status === 403 || /PERMISSION_DENIED/i.test(rawMessage)) {
    return new GeminiChatError(
      'Gemini API access was denied for this key. Please check GEMINI_API_KEY permissions in Settings > Secrets.',
      403,
    );
  }

  if (status === 429 || /RESOURCE_EXHAUSTED/i.test(rawMessage)) {
    return new GeminiChatError(
      'Gemini API rate limit or quota was reached. Please wait a moment and try again, or check your quota in Settings > Secrets.',
      429,
    );
  }

  return new GeminiChatError(
    'Unable to reach the Gemini portfolio assistant right now. Please try again shortly.',
    status >= 400 && status < 600 ? status : 502,
  );
}

function isRetryableError(err: unknown): boolean {
  const status = (err as { status?: unknown })?.status;
  if (status === 500 || status === 502 || status === 503 || status === 504) {
    return true;
  }
  const msg = err instanceof Error ? err.message : String(err ?? '');
  return /\b(500|502|503|504)\b|UNAVAILABLE|overloaded/i.test(msg);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function* streamPortfolioChat(
  input: PortfolioChatInput,
): AsyncGenerator<string, void, unknown> {
  const message = typeof input.message === 'string' ? input.message.trim() : '';
  if (!message) {
    throw new GeminiChatError('Please enter a question or comparison request.', 400);
  }
  if (message.length > 8000) {
    throw new GeminiChatError(
      'Message is too long (maximum 8,000 characters). Try trimming the pasted text.',
      400,
    );
  }

  const mode: ChatMode = input.mode === 'compare' ? 'compare' : 'ask';
  const historyTurns: ChatHistoryTurn[] = sanitizeChatHistory(input.history);
  const knowledgeBase = buildPortfolioKnowledgeBase(loadExtendedKnowledgeNotes());
  const systemInstruction = buildSystemInstruction(mode, knowledgeBase);

  const ai = getGeminiClient();

  const geminiHistory = historyTurns.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let yieldedAny = false;
    try {
      const chat = ai.chats.create({
        model: MODEL_NAME,
        history: geminiHistory,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const stream = await chat.sendMessageStream({ message });

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          yieldedAny = true;
          yield text;
        }
      }

      if (!yieldedAny) {
        throw new GeminiChatError(
          'Gemini returned an empty response. Please rephrase your question and try again.',
          502,
        );
      }
      return;
    } catch (err) {
      if (!yieldedAny && attempt < maxAttempts && isRetryableError(err)) {
        await sleep(700 * attempt);
        continue;
      }
      throw mapUpstreamError(err);
    }
  }
}
