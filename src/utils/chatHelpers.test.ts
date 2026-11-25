import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPortfolioKnowledgeBase,
  buildSystemInstruction,
  parseInlineMarkdown,
  parseMarkdownBlocks,
  sanitizeChatHistory,
} from './chatHelpers';

test('buildPortfolioKnowledgeBase includes core metrics, all 16 L.O.T. datasets, and custom notes', () => {
  const kb = buildPortfolioKnowledgeBase('Custom note: Fluent in Python and SQL.');

  assert.match(kb, /Ozan Olcay/);
  assert.match(kb, /12 MTL \/ year/);
  assert.match(kb, /253 Graphics/);
  assert.match(kb, /Hidden Damage Data/);
  assert.match(kb, /Customer Service Install Data/);
  assert.match(kb, /Included Datasets \(16 datasets\)/);
  assert.match(kb, /Verified Credentials \(11 total\)/);
  assert.match(kb, /Custom note: Fluent in Python and SQL\./);
});

test('buildSystemInstruction adapts instructions for ask vs compare mode', () => {
  const kb = buildPortfolioKnowledgeBase();
  const askPrompt = buildSystemInstruction('ask', kb);
  const comparePrompt = buildSystemInstruction('compare', kb);

  assert.match(askPrompt, /ACTIVE MODE: DEEP PORTFOLIO Q&A/);
  assert.match(comparePrompt, /ACTIVE MODE: COMPARISON & EVALUATION/);
  assert.match(comparePrompt, /Markdown comparison table/);
});

test('sanitizeChatHistory drops invalid entries, trims whitespace, and starts with user turn', () => {
  const sanitized = sanitizeChatHistory([
    { role: 'model', text: 'Leading assistant turn should be dropped' },
    { role: 'user', text: '  Tell me about Sirius  ' },
    { role: 'model', text: 'Sirius saves 12 MTL annually.' },
    { role: 'system', text: 'Invalid role' },
    { role: 'user', text: '   ' },
  ]);

  assert.deepEqual(sanitized, [
    { role: 'user', text: 'Tell me about Sirius' },
    { role: 'model', text: 'Sirius saves 12 MTL annually.' },
  ]);
});

test('parseMarkdownBlocks parses headings, bullet lists, and side-by-side comparison tables', () => {
  const sample = [
    '## Sirius vs. L.O.T.',
    '',
    '| Dimension | Sirius | L.O.T. |',
    '| --- | --- | --- |',
    '| Pages | 4 Pages | 11 Pages |',
    '| Datasets | 4 datasets | 16 datasets |',
    '',
    '- Built in-house on **BSH Server**',
    '- Tracks `600,000` operational rows',
  ].join('\n');

  const blocks = parseMarkdownBlocks(sample);
  assert.equal(blocks.length, 3);
  assert.deepEqual(blocks[0], { type: 'heading', level: 2, text: 'Sirius vs. L.O.T.' });
  assert.deepEqual(blocks[1], {
    type: 'table',
    headers: ['Dimension', 'Sirius', 'L.O.T.'],
    rows: [
      ['Pages', '4 Pages', '11 Pages'],
      ['Datasets', '4 datasets', '16 datasets'],
    ],
  });
  assert.deepEqual(blocks[2], {
    type: 'ul',
    items: ['Built in-house on **BSH Server**', 'Tracks `600,000` operational rows'],
  });
});

test('parseInlineMarkdown splits bold, italic, and inline code safely', () => {
  const tokens = parseInlineMarkdown('Saves **12 MTL** via `L.O.T.` and *in-house* coding');
  assert.deepEqual(tokens, [
    { type: 'text', value: 'Saves ' },
    { type: 'bold', value: '12 MTL' },
    { type: 'text', value: ' via ' },
    { type: 'code', value: 'L.O.T.' },
    { type: 'text', value: ' and ' },
    { type: 'italic', value: 'in-house' },
    { type: 'text', value: ' coding' },
  ]);
});
