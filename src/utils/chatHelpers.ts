import {
  CAREER_MILESTONES,
  CERTIFICATES,
  CHALLENGES_AND_LEARNINGS,
  HERO_METRICS,
  PROFILE,
  PROJECTS,
  RECOGNITIONS,
  STRATEGIC_PILLARS,
} from '../data/portfolioData';

export type ChatRole = 'user' | 'model';
export type ChatMode = 'ask' | 'compare';

export interface ChatHistoryTurn {
  role: ChatRole;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  mode?: ChatMode;
  isStreaming?: boolean;
  isError?: boolean;
}

export interface StarterPrompt {
  id: string;
  label: string;
  prompt: string;
  mode: ChatMode;
}

export const STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: 'ask-lot-sirius',
    label: '12 MTL cost avoidance & Sirius',
    prompt: 'How did Ozan build the Sirius system and achieve 12 MTL yearly cost avoidance?',
    mode: 'ask',
  },
  {
    id: 'ask-career',
    label: 'Career path & B/S/H/ impact',
    prompt: 'Walk me through Ozan Olcay’s career trajectory, leadership scope, and core strengths.',
    mode: 'ask',
  },
  {
    id: 'ask-credentials',
    label: 'Certifications & AI supply chain',
    prompt: 'Summarize Ozan’s 11 verified certifications and how they connect to logistics & AI.',
    mode: 'ask',
  },
  {
    id: 'ask-rem-vision',
    label: 'REM Region Logistics Expert vision',
    prompt: 'What is Ozan’s strategic roadmap for scaling Türkiye control towers to the REM region?',
    mode: 'ask',
  },
  {
    id: 'compare-systems',
    label: 'Compare Sirius vs. L.O.T.',
    prompt:
      'Give me a detailed side-by-side comparison table of Sirius vs. L.O.T. across scale, datasets, users, security, and operational outcomes.',
    mode: 'compare',
  },
  {
    id: 'compare-jd-digital',
    label: 'Fit for Regional Control Tower Lead',
    prompt:
      'Compare Ozan’s portfolio against a Regional Logistics Digitalization & Control Tower Lead role requiring Power BI, RPA, 3PL/LSP quality auditing, stakeholder management, and Six Sigma.',
    mode: 'compare',
  },
  {
    id: 'compare-field-tech',
    label: 'Field Audit vs. Technical Engineering',
    prompt:
      'Compare Ozan’s hands-on field operations & LSP audit background with his in-house coding, BI, and automation capabilities.',
    mode: 'compare',
  },
  {
    id: 'compare-rem-readiness',
    label: 'Readiness for REM Region Expert',
    prompt:
      'Evaluate Ozan’s strengths, quantified proof points, and any potential interview areas to explore for a REM Region Logistics Expert role.',
    mode: 'compare',
  },
];

const MAX_HISTORY_TURNS = 20;
const MAX_TURN_LENGTH = 6000;

export function sanitizeChatHistory(input: unknown): ChatHistoryTurn[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const cleaned: ChatHistoryTurn[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== 'object') continue;
    const candidate = raw as { role?: unknown; text?: unknown };
    const role = candidate.role === 'user' || candidate.role === 'model' ? candidate.role : null;
    if (!role || typeof candidate.text !== 'string') continue;

    const text = candidate.text.trim();
    if (!text) continue;

    cleaned.push({
      role,
      text: text.slice(0, MAX_TURN_LENGTH),
    });
  }

  const recent = cleaned.slice(-MAX_HISTORY_TURNS);
  // Ensure history starts with a user turn when passed to Gemini chat history
  while (recent.length > 0 && recent[0].role !== 'user') {
    recent.shift();
  }
  return recent;
}

export function buildPortfolioKnowledgeBase(extraNotes?: string): string {
  const projectBlocks = PROJECTS.map((p) => {
    return [
      `### Project: ${p.name} (${p.shortTitle})`,
      `- Kicker: ${p.kicker}`,
      `- Headline Metric: ${p.headlineMetric} (${p.headlineMetricLabel})`,
      `- Summary: ${p.summary}`,
      `- Context: ${p.context}`,
      `- Report Pages: ${p.pagesCount} Pages`,
      `- Data Size: ${p.dataSize.rows} | ${p.dataSize.sourcePages} | ${p.dataSize.graphics} Graphics`,
      `- Restrictions: ${p.restrictions}`,
      `- Data Security: ${p.dataSecurity}`,
      `- Authorized Users (${p.users.length} teams): ${p.users.join(', ')}`,
      `- Included Datasets (${p.includedData.length} datasets): ${p.includedData.join(', ')}`,
      `- Data Sources (${p.sources.length} sources): ${p.sources.join(', ')}`,
      `- Automated Calculation Engines (${p.automatedProcesses.length}): ${p.automatedProcesses.join('; ')}`,
      `- Key Outputs: ${p.outputs.join('; ')}`,
      `- Highlights: ${p.highlights.join('; ')}`,
    ].join('\n');
  }).join('\n\n');

  const careerBlocks = CAREER_MILESTONES.map((m) => {
    return [
      `### ${m.period} — ${m.role} at ${m.company} (${m.location})`,
      `- Summary: ${m.summary}`,
      `- Capabilities: ${m.capabilities.join(', ')}`,
      `- Key Focus Areas: ${m.focusAreas.join('; ')}`,
    ].join('\n');
  }).join('\n\n');

  const certBlocks = CERTIFICATES.map(
    (c, idx) =>
      `${idx + 1}. ${c.title}${c.subtitle ? ` (${c.subtitle})` : ''} — ${c.issuer} via ${c.platform} | Completed: ${c.completedDate} | ${c.creditSummary} | Category: ${c.categoryLabel} | Skills: ${c.skills.join(', ')} | Credential ID: ${c.credentialId}`,
  ).join('\n');

  const pillarBlocks = STRATEGIC_PILLARS.map(
    (s) => `- Pillar ${s.index} — ${s.title}: ${s.points.join('; ')}`,
  ).join('\n');

  const recognitionBlocks = RECOGNITIONS.map(
    (r) => `- ${r.title} (${r.context}): ${r.detail}`,
  ).join('\n');

  const metricBlocks = HERO_METRICS.map(
    (m) => `- ${m.value} — ${m.label}: ${m.detail}`,
  ).join('\n');

  const educationLine = `${PROFILE.education.institution} — ${PROFILE.education.degree} (${PROFILE.education.honors})`;
  const languagesLine = PROFILE.languages
    .map((item) => `${item.language} (${item.level})`)
    .join(', ');

  const sections = [
    `# OZAN OLCAY — VERIFIED PORTFOLIO DATABASE`,
    `## Identity & Contact`,
    `- Name: ${PROFILE.fullName}`,
    `- Current Role: ${PROFILE.roleTitle} at ${PROFILE.organization}`,
    `- Target Focus: ${PROFILE.targetFocus}`,
    `- Location: ${PROFILE.location}`,
    `- Email: ${PROFILE.email}`,
    `- Education: ${educationLine}`,
    `- Languages: ${languagesLine}`,
    `- Core Values (Concentric): ${PROFILE.coreValues.join(' -> ')}`,
    `- Field Improvement Formula: ${PROFILE.fieldFormula.join(' + ')} -> Improvement On The Field`,
    `- Digitalisation Hub Nodes: ${PROFILE.digitalizationNodes.join(', ')}`,
    `- Personal Note: ${PROFILE.personalNote}`,
    `## Headline Metrics\n${metricBlocks}`,
    `## In-House Digital Systems (Detailed Architecture & Governance)\n${projectBlocks}`,
    `## Career Progression\n${careerBlocks}`,
    `## Field Challenges & Operational Learnings`,
    `- Challenges Overcome: ${CHALLENGES_AND_LEARNINGS.challenges.join('; ')}`,
    `- Core Learnings: ${CHALLENGES_AND_LEARNINGS.learnings.join('; ')}`,
    `## Strategic Pillars (REM Region Logistics Expert)\n${pillarBlocks}`,
    `## Awards & Recognitions\n${recognitionBlocks}`,
    `## Verified Credentials (${CERTIFICATES.length} total)\n${certBlocks}`,
  ];

  const trimmedNotes = extraNotes?.trim();
  if (trimmedNotes) {
    sections.push(`## Extended Portfolio Knowledge Notes\n${trimmedNotes}`);
  }

  return sections.join('\n\n');
}

export function buildSystemInstruction(mode: ChatMode, knowledgeBase: string): string {
  const modeGuidance =
    mode === 'compare'
      ? [
          `ACTIVE MODE: COMPARISON & EVALUATION.`,
          `- When comparing Sirius vs. L.O.T., present a crisp Markdown comparison table covering Pages, Data Size (rows, source pages, graphics), Authorized User Teams, Included Datasets (4 vs. 16), Data Sources, Automation Engines, Access Restrictions, Security, and Operational Impact.`,
          `- When a visitor pastes a Job Description, role spec, or comparison benchmark, evaluate Ozan Olcay objectively using structured sections: **Role Fit Summary**, **Direct Matches & Quantified Proof**, **Transferable Strengths**, and **Suggested Interview Discussion Points / Gaps**.`,
        ].join('\n')
      : [
          `ACTIVE MODE: DEEP PORTFOLIO Q&A.`,
          `- Answer questions about Ozan Olcay thoroughly, accurately, and concisely using specific metrics, project names, dataset names, career milestones, and credentials from the verified database.`,
        ].join('\n');

  return [
    `You are Ozan Olcay's dedicated Portfolio & Career Intelligence Assistant embedded directly inside his executive portfolio website.`,
    `Your job is to help recruiters, hiring managers, B/S/H/ leaders, and peers explore Ozan's work deeply and compare his systems or qualifications against specific roles.`,
    ``,
    `STRICT RULES:`,
    `1. Ground EVERY factual claim strictly in the Verified Portfolio Database below. Never invent employers, dates, metrics, certifications, software tools, or salaries not present in the database.`,
    `2. If asked about something outside the database (e.g., salary expectations, notice period, private phone number, or unrelated topics), state transparently that it is not listed in Ozan's portfolio database and suggest contacting Ozan directly at ${PROFILE.email}.`,
    `3. Respond in the same language the user writes in (English, Turkish, German, or Spanish). Default to English if unclear.`,
    `4. Format responses cleanly with Markdown: short executive takeaways, scannable bullet points, bold key metrics, and compact Markdown tables whenever comparing items.`,
    `5. Speak in a confident, executive, factual third-person tone about Ozan Olcay—never boastful or generic.`,
    ``,
    modeGuidance,
    ``,
    `--- VERIFIED PORTFOLIO DATABASE START ---`,
    knowledgeBase,
    `--- VERIFIED PORTFOLIO DATABASE END ---`,
  ].join('\n');
}

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'code'; value: string };

export type MarkdownBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export function parseInlineMarkdown(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('**') && raw.endsWith('**')) {
      tokens.push({ type: 'bold', value: raw.slice(2, -2) });
    } else if (raw.startsWith('`') && raw.endsWith('`')) {
      tokens.push({ type: 'code', value: raw.slice(1, -1) });
    } else if (raw.startsWith('*') && raw.endsWith('*')) {
      tokens.push({ type: 'italic', value: raw.slice(1, -1) });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return tokens.length > 0 ? tokens : [{ type: 'text', value: text }];
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes('|')) return false;
  const cells = splitTableRow(trimmed);
  return cells.length >= 2 && cells.every((cell) => /^:?-{2,}:?$/.test(cell));
}

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || /^-{3,}$/.test(line)) {
      i += 1;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length <= 2 ? 2 : 3;
      blocks.push({ type: 'heading', level, text: headingMatch[2].trim() });
      i += 1;
      continue;
    }

    // Markdown pipe tables
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length) {
        const rowLine = lines[i].trim();
        if (!rowLine || !rowLine.includes('|')) break;
        rows.push(splitTableRow(rowLine));
        i += 1;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    // Unordered list
    if (/^[-*•]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const itemLine = lines[i].trim();
        const match = itemLine.match(/^[-*•]\s+(.+)$/);
        if (!match) break;
        items.push(match[1].trim());
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const itemLine = lines[i].trim();
        const match = itemLine.match(/^\d+[.)]\s+(.+)$/);
        if (!match) break;
        items.push(match[1].trim());
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph (combine consecutive plain lines)
    const paraLines: string[] = [line];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        !next ||
        /^#{1,4}\s+/.test(next) ||
        /^[-*•]\s+/.test(next) ||
        /^\d+[.)]\s+/.test(next) ||
        /^-{3,}$/.test(next) ||
        (next.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
      ) {
        break;
      }
      paraLines.push(next);
      i += 1;
    }
    blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
  }

  return blocks;
}
