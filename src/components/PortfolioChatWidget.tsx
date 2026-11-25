import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  ArrowUp,
  Check,
  Copy,
  GitCompareArrows,
  Maximize2,
  MessageSquareText,
  Minimize2,
  RotateCcw,
  Sparkles,
  Square,
  X,
} from 'lucide-react';
import {
  parseInlineMarkdown,
  parseMarkdownBlocks,
  STARTER_PROMPTS,
  type ChatMessage,
  type ChatMode,
} from '../utils/chatHelpers';

function InlineMarkdown({ text }: { text: string }) {
  const tokens = parseInlineMarkdown(text);
  return (
    <>
      {tokens.map((token, idx) => {
        if (token.type === 'bold') {
          return (
            <strong
              key={idx}
              className="font-semibold text-[#111315] dark:text-[#F2F4F7]"
            >
              {token.value}
            </strong>
          );
        }
        if (token.type === 'code') {
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 rounded bg-[#EFEFEF] dark:bg-[#1E232B] font-mono text-[11.5px] text-[#B5381A] dark:text-[#F06A4A]"
            >
              {token.value}
            </code>
          );
        }
        if (token.type === 'italic') {
          return (
            <em key={idx} className="italic">
              {token.value}
            </em>
          );
        }
        return <span key={idx}>{token.value}</span>;
      })}
    </>
  );
}

function FormattedAssistantMessage({ text }: { text: string }) {
  const blocks = useMemo(() => parseMarkdownBlocks(text), [text]);

  return (
    <div className="space-y-2.5 text-[13px] leading-relaxed text-[#353A40] dark:text-[#D0D5DD]">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h4
              key={index}
              className={`font-display font-bold text-[#111315] dark:text-[#F2F4F7] ${
                block.level === 2 ? 'text-[13.5px] pt-1' : 'text-[13px] pt-0.5'
              }`}
            >
              <InlineMarkdown text={block.text} />
            </h4>
          );
        }

        if (block.type === 'table') {
          return (
            <div
              key={index}
              className="overflow-x-auto rounded-md border border-[#E4E6EA] dark:border-[#2A303B] my-2"
            >
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#F3F4F6] dark:bg-[#0C0E11] border-b border-[#E4E6EA] dark:border-[#2A303B]">
                    {block.headers.map((header, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-2 px-2.5 font-display font-semibold text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap"
                      >
                        <InlineMarkdown text={header} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E6EA] dark:divide-[#252A33]">
                  {block.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="bg-white dark:bg-[#14171D] even:bg-[#FAFAFA] dark:even:bg-[#11141A]"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2 px-2.5 align-top ${
                            cIdx === 0
                              ? 'font-medium text-[#111315] dark:text-[#F2F4F7]'
                              : 'text-[#424850] dark:text-[#C2C8D1]'
                          }`}
                        >
                          <InlineMarkdown text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={index} className="space-y-1.5">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="text-[#B5381A] dark:text-[#F06A4A] select-none shrink-0 mt-0.5"
                  >
                    —
                  </span>
                  <span>
                    <InlineMarkdown text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={index} className="space-y-1.5 list-decimal list-inside">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="marker:font-mono marker:text-[#B5381A] dark:marker:text-[#F06A4A]">
                  <InlineMarkdown text={item} />
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={index}>
            <InlineMarkdown text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

export function PortfolioChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<ChatMode>('ask');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const inputId = useId();
  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const activeStarters = useMemo(
    () => STARTER_PROMPTS.filter((item) => item.mode === mode),
    [mode],
  );

  // Auto-scroll smoothly to bottom when messages stream in (never scroll empty welcome state)
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen]);

  // Focus composer when opened & allow Escape to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 80);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Cleanup active stream on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  // Auto-resize textarea vertically up to 112px
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [input]);

  const stopStreaming = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)),
    );
  };

  const sendMessage = async (rawText: string, overrideMode?: ChatMode) => {
    const trimmed = rawText.trim();
    if (!trimmed || isStreaming) return;

    const effectiveMode = overrideMode ?? mode;
    setLastFailedPrompt(null);

    const historyForApi = messages
      .filter((m) => !m.isError && m.text.trim().length > 0)
      .map((m) => ({ role: m.role, text: m.text }));

    const userMsgId = `u-${Date.now()}`;
    const assistantMsgId = `m-${Date.now() + 1}`;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', text: trimmed, mode: effectiveMode },
      { id: assistantMsgId, role: 'model', text: '', mode: effectiveMode, isStreaming: true },
    ]);
    setInput('');
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          mode: effectiveMode,
        }),
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') ?? '';

      if (!response.ok || !response.body || contentType.includes('application/json')) {
        let errorText = 'Unable to reach the Gemini portfolio assistant right now.';
        try {
          const errJson = (await response.json()) as { error?: string };
          if (errJson?.error) errorText = errJson.error;
        } catch {
          // Use default fallback message
        }
        throw new Error(errorText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';
      let streamError: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';

        for (const event of events) {
          const lines = event.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;

            try {
              const parsed = JSON.parse(payload) as {
                text?: string;
                done?: boolean;
                error?: string;
              };
              if (parsed.error) {
                streamError = parsed.error;
                break;
              }
              if (parsed.text) {
                accumulated += parsed.text;
                const snapshot = accumulated;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId ? { ...m, text: snapshot } : m,
                  ),
                );
              }
            } catch {
              // Ignore malformed partial SSE frames
            }
          }
          if (streamError) break;
        }
        if (streamError) break;
      }

      if (streamError) {
        throw new Error(streamError);
      }

      if (!accumulated.trim()) {
        throw new Error('No response was received from Gemini. Please try again.');
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId ? { ...m, text: accumulated, isStreaming: false } : m,
        ),
      );
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') {
        setMessages((prev) =>
          prev
            .map((m) => (m.id === assistantMsgId ? { ...m, isStreaming: false } : m))
            .filter((m) => !(m.id === assistantMsgId && !m.text.trim())),
        );
      } else {
        const messageText =
          err instanceof Error
            ? err.message
            : 'Unable to reach the Gemini portfolio assistant right now.';
        setLastFailedPrompt(trimmed);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, text: messageText, isStreaming: false, isError: true }
              : m,
          ),
        );
      }
    } finally {
      abortControllerRef.current = null;
      setIsStreaming(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const handleClear = () => {
    if (isStreaming) {
      stopStreaming();
    }
    setMessages([]);
    setLastFailedPrompt(null);
    textareaRef.current?.focus();
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1800);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleRetry = () => {
    if (!lastFailedPrompt || isStreaming) return;
    const retryPrompt = lastFailedPrompt;
    setMessages((prev) => {
      // Remove the failed assistant error turn and preceding user turn so retry stays clean
      if (prev.length >= 2 && prev[prev.length - 1].isError && prev[prev.length - 2].role === 'user') {
        return prev.slice(0, -2);
      }
      return prev;
    });
    void sendMessage(retryPrompt);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-label="Ozan Olcay Gemini Portfolio Assistant"
          data-testid="portfolio-chat-popup"
          className={`flex flex-col bg-white dark:bg-[#14171D] border border-[#E4E6EA] dark:border-[#2A303B] rounded-xl shadow-[0_24px_64px_-16px_rgba(0,0,0,0.45)] overflow-hidden transition-[width] duration-200 ${
            isExpanded
              ? 'w-[calc(100vw-2rem)] sm:w-[560px]'
              : 'w-[calc(100vw-2rem)] sm:w-[420px] md:w-[440px]'
          } h-[min(650px,calc(100dvh-2rem))] sm:h-[min(650px,calc(100dvh-3rem))]`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#FAFAFA] dark:bg-[#0C0E11] border-b border-[#E4E6EA] dark:border-[#252A33] flex items-center justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Sparkles
                  className="w-3.5 h-3.5 text-[#B5381A] dark:text-[#F06A4A] shrink-0"
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B5381A] dark:text-[#F06A4A] truncate">
                  Gemini Portfolio Database
                </p>
              </div>
              <h2 className="font-display text-[15px] font-bold text-[#111315] dark:text-[#F2F4F7] tracking-tight truncate mt-0.5">
                Ask or Compare Ozan’s Profile
              </h2>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#EFEFEF] dark:hover:bg-[#1C212A] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-label={isExpanded ? 'Collapse chat width' : 'Expand chat width'}
                title={isExpanded ? 'Standard width' : 'Wide view for comparisons'}
                className="hidden sm:flex w-8 h-8 rounded-md items-center justify-center text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#EFEFEF] dark:hover:bg-[#1C212A] transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close portfolio assistant"
                title="Close (Esc)"
                className="w-8 h-8 rounded-md flex items-center justify-center text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#EFEFEF] dark:hover:bg-[#1C212A] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div
            role="tablist"
            aria-label="Assistant mode"
            className="px-4 py-2 bg-[#FAFAFA] dark:bg-[#0C0E11] border-b border-[#E4E6EA] dark:border-[#252A33] grid grid-cols-2 gap-1.5 shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'ask'}
              onClick={() => setMode('ask')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'ask'
                  ? 'bg-[#111315] dark:bg-[#F2F4F7] text-white dark:text-[#0C0E11]'
                  : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#EFEFEF] dark:hover:bg-[#1A1E26]'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Ask Portfolio</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'compare'}
              onClick={() => setMode('compare')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'compare'
                  ? 'bg-[#B5381A] dark:bg-[#F06A4A] text-white dark:text-[#0C0E11]'
                  : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#EFEFEF] dark:hover:bg-[#1A1E26]'
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Compare &amp; Fit</span>
            </button>
          </div>

          {/* Scrollable Message Thread */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation history"
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white dark:bg-[#14171D]"
          >
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33]">
                  <p className="text-[13px] leading-relaxed text-[#353A40] dark:text-[#D0D5DD]">
                    {mode === 'ask' ? (
                      <>
                        Ask deep questions about{' '}
                        <strong className="font-semibold text-[#111315] dark:text-[#F2F4F7]">
                          Ozan Olcay’s
                        </strong>{' '}
                        systems (<span className="font-mono text-xs">Sirius</span> &amp;{' '}
                        <span className="font-mono text-xs">L.O.T.</span>), B/S/H/ career
                        trajectory, education, 11 verified credentials, or operational
                        methodology—in English or Türkçe.
                      </>
                    ) : (
                      <>
                        Compare{' '}
                        <strong className="font-semibold text-[#111315] dark:text-[#F2F4F7]">
                          Sirius vs. L.O.T.
                        </strong>{' '}
                        or paste a{' '}
                        <strong className="font-semibold text-[#111315] dark:text-[#F2F4F7]">
                          Job Description
                        </strong>{' '}
                        below to benchmark Ozan’s verified experience, metrics, and role fit.
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A818B] dark:text-[#8E96A4] mb-2">
                    {mode === 'ask' ? 'Suggested deep dives' : 'Quick comparisons'}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {activeStarters.map((starter) => (
                      <button
                        key={starter.id}
                        type="button"
                        onClick={() => void sendMessage(starter.prompt, starter.mode)}
                        className="group text-left p-3 rounded-lg border border-[#E4E6EA] dark:border-[#252A33] bg-[#FAFAFA] dark:bg-[#0F1217] hover:border-[#B5381A] dark:hover:border-[#F06A4A] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12.5px] font-semibold text-[#111315] dark:text-[#F2F4F7] group-hover:text-[#B5381A] dark:group-hover:text-[#F06A4A] transition-colors">
                            {starter.label}
                          </span>
                          <ArrowUp
                            className="w-3.5 h-3.5 rotate-45 text-[#7A818B] group-hover:text-[#B5381A] dark:group-hover:text-[#F06A4A] shrink-0 transition-colors"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-[11.5px] text-[#525860] dark:text-[#949CA8] mt-1 line-clamp-2 leading-snug">
                          {starter.prompt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[92%] rounded-lg px-3.5 py-2.5 ${
                        isUser
                          ? 'bg-[#111315] dark:bg-[#F2F4F7] text-white dark:text-[#0C0E11] text-[13px] leading-relaxed whitespace-pre-wrap'
                          : msg.isError
                            ? 'w-full bg-[#FEF2F2] dark:bg-[#2A1518] border border-[#FECACA] dark:border-[#6B212A] text-[#991B1B] dark:text-[#FCA5A5] text-[12.5px] leading-relaxed'
                            : 'w-full bg-[#FAFAFA] dark:bg-[#0F1217] border border-[#E4E6EA] dark:border-[#252A33]'
                      }`}
                    >
                      {isUser ? (
                        msg.text
                      ) : msg.isError ? (
                        <div className="space-y-2">
                          <p>{msg.text}</p>
                          {lastFailedPrompt && (
                            <button
                              type="button"
                              onClick={handleRetry}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 hover:opacity-80 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" aria-hidden="true" />
                              Try again
                            </button>
                          )}
                        </div>
                      ) : msg.text ? (
                        <>
                          <FormattedAssistantMessage text={msg.text} />
                          {msg.isStreaming && (
                            <span
                              aria-label="Generating response"
                              className="inline-block w-1.5 h-3.5 ml-1 bg-[#B5381A] dark:bg-[#F06A4A] animate-pulse align-middle"
                            />
                          )}
                        </>
                      ) : (
                        <div className="flex items-center gap-2 py-1 text-xs text-[#6B7280] dark:text-[#949CA8]">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B5381A] dark:bg-[#F06A4A] animate-pulse" />
                          <span className="font-mono text-[11px]">
                            Querying Ozan’s portfolio database…
                          </span>
                        </div>
                      )}
                    </div>

                    {!isUser && !msg.isStreaming && !msg.isError && msg.text && (
                      <div className="mt-1 flex items-center gap-2 px-1">
                        <button
                          type="button"
                          onClick={() => void handleCopy(msg.id, msg.text)}
                          aria-label="Copy response"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#6B7280] dark:text-[#8E96A4] hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={threadEndRef} />
          </div>

          {/* Input Composer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#FAFAFA] dark:bg-[#0C0E11] border-t border-[#E4E6EA] dark:border-[#252A33] shrink-0"
          >
            <label htmlFor={inputId} className="sr-only">
              {mode === 'ask'
                ? 'Ask a question about Ozan Olcay’s portfolio'
                : 'Paste a job description or ask to compare Ozan’s systems and qualifications'}
            </label>
            <div className="flex items-end gap-2 rounded-lg border border-[#D4D7DD] dark:border-[#2C323E] bg-white dark:bg-[#14171D] px-3 py-2 focus-within:border-[#B5381A] dark:focus-within:border-[#F06A4A] transition-colors">
              <textarea
                ref={textareaRef}
                id={inputId}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder={
                  mode === 'ask'
                    ? 'Ask about Sirius, L.O.T., career, or credentials…'
                    : 'Paste a Job Description or ask to compare…'
                }
                disabled={isStreaming}
                className="flex-1 resize-none bg-transparent text-[13px] leading-snug text-[#111315] dark:text-[#F2F4F7] placeholder:text-[#7A818B] dark:placeholder:text-[#7A8290] focus:outline-none max-h-28 disabled:opacity-60"
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={stopStreaming}
                  aria-label="Stop generating"
                  title="Stop generating"
                  className="w-8 h-8 rounded-md bg-[#111315] dark:bg-[#F2F4F7] text-white dark:text-[#0C0E11] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Square className="w-3 h-3 fill-current" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  title="Send message (Enter)"
                  className="w-8 h-8 rounded-md bg-[#B5381A] dark:bg-[#F06A4A] text-white dark:text-[#0C0E11] flex items-center justify-center shrink-0 hover:bg-[#9A2E14] dark:hover:bg-[#E05A3A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-2 text-[10.5px] font-mono text-[#7A818B] dark:text-[#8E96A4] px-0.5">
              <span className="whitespace-nowrap">Verified portfolio database</span>
              <span className="hidden sm:inline whitespace-nowrap shrink-0">Enter to send</span>
            </div>
          </form>
        </section>
      )}

      {/* Floating Right-Section Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Ozan Olcay Gemini portfolio assistant"
          aria-expanded={isOpen}
          data-testid="portfolio-chat-launcher"
          className="group flex items-center gap-2 pl-2.5 pr-3 py-2.5 rounded-xl bg-[#111315] dark:bg-[#14171D] text-white dark:text-[#F2F4F7] border border-[#2C323E] dark:border-[#323947] shadow-[0_14px_34px_-8px_rgba(0,0,0,0.45)] hover:border-[#B5381A] dark:hover:border-[#F06A4A] hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <span className="w-7 h-7 rounded-lg bg-[#B5381A] dark:bg-[#F06A4A] text-white dark:text-[#0C0E11] flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
          <span className="text-left leading-none">
            <span className="block font-display text-[12.5px] font-bold whitespace-nowrap">
              Ask Gemini
            </span>
            <span className="block font-mono text-[9.5px] text-[#A4ACB8] whitespace-nowrap mt-0.5">
              Q&amp;A · Compare
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
