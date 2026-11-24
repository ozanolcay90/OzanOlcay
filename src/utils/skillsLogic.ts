import type {
  RadarAxisId,
  SkillDomain,
  SkillProficiencyItem,
} from '../data/portfolioData';

export interface Point2D {
  x: number;
  y: number;
}

export function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, score));
}

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  index: number,
  totalAxes: number
): Point2D {
  if (totalAxes <= 0) {
    return { x: cx, y: cy };
  }
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / totalAxes;
  return {
    x: Number((cx + radius * Math.cos(angle)).toFixed(2)),
    y: Number((cy + radius * Math.sin(angle)).toFixed(2)),
  };
}

export function buildRadarPolygonPoints(
  scores: number[],
  cx: number,
  cy: number,
  maxRadius: number
): string {
  const total = scores.length;
  if (total === 0) return '';
  return scores
    .map((score, index) => {
      const r = (clampScore(score) / 100) * maxRadius;
      const pt = polarToCartesian(cx, cy, r, index, total);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

export function buildRadarGridPoints(
  levelPercent: number,
  totalAxes: number,
  cx: number,
  cy: number,
  maxRadius: number
): string {
  if (totalAxes <= 0) return '';
  const r = (clampScore(levelPercent) / 100) * maxRadius;
  return Array.from({ length: totalAxes }, (_, index) => {
    const pt = polarToCartesian(cx, cy, r, index, totalAxes);
    return `${pt.x},${pt.y}`;
  }).join(' ');
}

export function getProficiencyTier(score: number): 'Expert' | 'Advanced' | 'Proficient' {
  const clamped = clampScore(score);
  if (clamped >= 90) return 'Expert';
  if (clamped >= 85) return 'Advanced';
  return 'Proficient';
}

export function getSkillDomainCounts(
  skills: readonly SkillProficiencyItem[]
): Record<SkillDomain, number> {
  const counts: Record<SkillDomain, number> = {
    all: skills.length,
    technical: 0,
    logistics: 0,
  };

  for (const skill of skills) {
    counts[skill.domain] += 1;
  }

  return counts;
}

export function filterSkills(
  skills: readonly SkillProficiencyItem[],
  domain: SkillDomain,
  focusedAxis: RadarAxisId | null
): SkillProficiencyItem[] {
  return skills.filter((skill) => {
    const matchesDomain = domain === 'all' || skill.domain === domain;
    const matchesAxis = focusedAxis === null || skill.axisId === focusedAxis;
    return matchesDomain && matchesAxis;
  });
}

export function getAverageProficiency(skills: readonly SkillProficiencyItem[]): number {
  if (skills.length === 0) return 0;
  const total = skills.reduce((sum, item) => sum + clampScore(item.level), 0);
  return Math.round(total / skills.length);
}
