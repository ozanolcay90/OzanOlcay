import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRadarGridPoints,
  buildRadarPolygonPoints,
  clampScore,
  filterSkills,
  getAverageProficiency,
  getProficiencyTier,
  getSkillDomainCounts,
  polarToCartesian,
} from './skillsLogic';
import type { SkillProficiencyItem } from '../data/portfolioData';

const SAMPLE_SKILLS: SkillProficiencyItem[] = [
  {
    id: 'power-bi',
    name: 'Power BI',
    domain: 'technical',
    domainLabel: 'Technical Stack',
    axisId: 'bi-automation',
    level: 95,
    evidence: 'L.O.T. dashboards',
  },
  {
    id: 'sap',
    name: 'SAP',
    domain: 'technical',
    domainLabel: 'Technical Stack',
    axisId: 'enterprise-systems',
    level: 86,
    evidence: 'Ankara RDC',
  },
  {
    id: 'ld-audit',
    name: 'LD Platform Auditing',
    domain: 'logistics',
    domainLabel: 'Logistics & Governance',
    axisId: 'logistics-distribution',
    level: 96,
    evidence: 'B/S/H/ Inspector',
  },
  {
    id: 'ai-sc',
    name: 'AI in Supply Chain',
    domain: 'technical',
    domainLabel: 'Technical Stack',
    axisId: 'enterprise-systems',
    level: 80,
    evidence: 'TAÜ-DDUAM',
  },
];

test('polarToCartesian places index 0 directly at 12 o-clock and handles clockwise symmetry', () => {
  const top = polarToCartesian(200, 170, 100, 0, 6);
  assert.equal(top.x, 200);
  assert.equal(top.y, 70);

  const bottom = polarToCartesian(200, 170, 100, 3, 6);
  assert.equal(bottom.x, 200);
  assert.equal(bottom.y, 270);
});

test('buildRadarPolygonPoints and buildRadarGridPoints clamp out-of-range scores cleanly', () => {
  assert.equal(clampScore(120), 100);
  assert.equal(clampScore(-15), 0);
  assert.equal(clampScore(Number.NaN), 0);

  const poly = buildRadarPolygonPoints([100, 50, 100, 50], 100, 100, 100);
  assert.equal(poly, '100,0 150,100 100,200 50,100');

  const grid = buildRadarGridPoints(50, 4, 100, 100, 100);
  assert.equal(grid, '100,50 150,100 100,150 50,100');
});

test('getProficiencyTier maps score thresholds deterministically', () => {
  assert.equal(getProficiencyTier(96), 'Expert');
  assert.equal(getProficiencyTier(90), 'Expert');
  assert.equal(getProficiencyTier(88), 'Advanced');
  assert.equal(getProficiencyTier(85), 'Advanced');
  assert.equal(getProficiencyTier(80), 'Proficient');
});

test('filterSkills, getSkillDomainCounts, and getAverageProficiency operate accurately', () => {
  const counts = getSkillDomainCounts(SAMPLE_SKILLS);
  assert.deepEqual(counts, { all: 4, technical: 3, logistics: 1 });

  const techOnly = filterSkills(SAMPLE_SKILLS, 'technical', null);
  assert.equal(techOnly.length, 3);

  const axisFocused = filterSkills(SAMPLE_SKILLS, 'all', 'enterprise-systems');
  assert.deepEqual(
    axisFocused.map((s) => s.id),
    ['sap', 'ai-sc']
  );

  assert.equal(getAverageProficiency(SAMPLE_SKILLS), 89);
  assert.equal(getAverageProficiency([]), 0);
});
