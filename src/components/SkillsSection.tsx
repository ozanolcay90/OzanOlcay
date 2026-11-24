import { useMemo, useState } from 'react';
import {
  RADAR_AXES,
  SKILL_DOMAINS,
  SKILL_PROFICIENCIES,
  type RadarAxisId,
  type SkillDomain,
} from '../data/portfolioData';
import {
  buildRadarGridPoints,
  buildRadarPolygonPoints,
  filterSkills,
  getAverageProficiency,
  getProficiencyTier,
  getSkillDomainCounts,
  polarToCartesian,
} from '../utils/skillsLogic';

const RADAR_CX = 210;
const RADAR_CY = 178;
const RADAR_MAX_RADIUS = 104;
const RADAR_LABEL_RADIUS = 132;
const GRID_LEVELS = [25, 50, 75, 100] as const;

export function SkillsSection() {
  const [activeDomain, setActiveDomain] = useState<SkillDomain>('all');
  const [focusedAxis, setFocusedAxis] = useState<RadarAxisId | null>(null);

  const domainCounts = useMemo(() => getSkillDomainCounts(SKILL_PROFICIENCIES), []);

  const visibleSkills = useMemo(
    () => filterSkills(SKILL_PROFICIENCIES, activeDomain, focusedAxis),
    [activeDomain, focusedAxis]
  );

  const averageProficiency = useMemo(
    () => getAverageProficiency(visibleSkills),
    [visibleSkills]
  );

  const focusedAxisData = useMemo(
    () => (focusedAxis ? RADAR_AXES.find((axis) => axis.id === focusedAxis) ?? null : null),
    [focusedAxis]
  );

  const polygonPoints = useMemo(
    () =>
      buildRadarPolygonPoints(
        RADAR_AXES.map((axis) => axis.score),
        RADAR_CX,
        RADAR_CY,
        RADAR_MAX_RADIUS
      ),
    []
  );

  const handleToggleAxis = (axisId: RadarAxisId) => {
    setFocusedAxis((prev) => {
      const next = prev === axisId ? null : axisId;
      if (next !== null) {
        setActiveDomain('all');
      }
      return next;
    });
  };

  const handleSelectDomain = (domain: SkillDomain) => {
    setActiveDomain(domain);
    setFocusedAxis(null);
  };

  return (
    <section
      id="skills"
      className="py-20 lg:py-24 border-b border-[#E4E6EA] dark:border-[#252A33] bg-[#FAFAFA] dark:bg-[#0C0E11] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E6EA] dark:border-[#252A33]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] mb-2">
              04. Capabilities &amp; Proficiency
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
              style={{ textWrap: 'balance' }}
            >
              Bridging enterprise logistics governance with an in-house technical stack.
            </h2>
          </div>

          <p className="text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0 self-start lg:self-auto">
            <span>{RADAR_AXES.length} core axes</span>
            <span aria-hidden="true" className="mx-2 text-[#C5C9D0] dark:text-[#474F5E]">
              ·
            </span>
            <span>{SKILL_PROFICIENCIES.length} documented capabilities</span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-white dark:bg-[#13161B] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-6 lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]">
                  Competency Radar
                </h3>
                <p className="mt-1 text-xs text-[#525860] dark:text-[#949CA8]">
                  Select any axis below to inspect operational proof and filter matching skills.
                </p>
              </div>
              {focusedAxis && (
                <button
                  type="button"
                  onClick={() => setFocusedAxis(null)}
                  className="text-xs font-medium text-[#B5381A] dark:text-[#F06A4A] hover:underline whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
                >
                  Reset Focus
                </button>
              )}
            </div>

            <div className="mt-4">
              <svg
                viewBox="0 0 420 356"
                role="img"
                aria-label="Six-axis radar chart visualizing proficiency across Logistics and Distribution, BI and Data Automation, In-House Coding and Web, Quality and Six Sigma, Project and BA Governance, and SAP and AI Systems"
                className="w-full h-auto"
                data-testid="skills-radar-chart"
              >
                {GRID_LEVELS.map((level) => (
                  <polygon
                    key={level}
                    points={buildRadarGridPoints(
                      level,
                      RADAR_AXES.length,
                      RADAR_CX,
                      RADAR_CY,
                      RADAR_MAX_RADIUS
                    )}
                    className="fill-none stroke-[#E4E6EA] dark:stroke-[#252A33]"
                    strokeWidth={level === 100 ? '1.25' : '1'}
                    strokeDasharray={level === 100 ? undefined : '2 3'}
                  />
                ))}

                {GRID_LEVELS.map((level) => {
                  const y = RADAR_CY - (level / 100) * RADAR_MAX_RADIUS;
                  return (
                    <text
                      key={`tick-${level}`}
                      x={RADAR_CX + 5}
                      y={y + 3}
                      className="fill-[#7A818B] dark:fill-[#6E7685] font-mono text-[9px]"
                    >
                      {level}
                    </text>
                  );
                })}

                {RADAR_AXES.map((axis, idx) => {
                  const outer = polarToCartesian(
                    RADAR_CX,
                    RADAR_CY,
                    RADAR_MAX_RADIUS,
                    idx,
                    RADAR_AXES.length
                  );
                  const isFocused = focusedAxis === axis.id;
                  return (
                    <line
                      key={`spoke-${axis.id}`}
                      x1={RADAR_CX}
                      y1={RADAR_CY}
                      x2={outer.x}
                      y2={outer.y}
                      className={
                        isFocused
                          ? 'stroke-[#B5381A] dark:stroke-[#F06A4A]'
                          : 'stroke-[#E4E6EA] dark:stroke-[#252A33]'
                      }
                      strokeWidth={isFocused ? '1.5' : '1'}
                    />
                  );
                })}

                <polygon
                  points={polygonPoints}
                  className="fill-[#D94826]/14 dark:fill-[#F06A4A]/18 stroke-[#B5381A] dark:stroke-[#F06A4A]"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {RADAR_AXES.map((axis, idx) => {
                  const pt = polarToCartesian(
                    RADAR_CX,
                    RADAR_CY,
                    (axis.score / 100) * RADAR_MAX_RADIUS,
                    idx,
                    RADAR_AXES.length
                  );
                  const isFocused = focusedAxis === axis.id;
                  return (
                    <g
                      key={`vertex-${axis.id}`}
                      onClick={() => handleToggleAxis(axis.id)}
                      className="cursor-pointer"
                    >
                      {isFocused && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="9"
                          className="fill-[#D94826]/18 dark:fill-[#F06A4A]/25"
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isFocused ? '5.5' : '4'}
                        className={
                          isFocused
                            ? 'fill-[#B5381A] dark:fill-[#F06A4A] stroke-white dark:stroke-[#13161B]'
                            : 'fill-white dark:fill-[#13161B] stroke-[#B5381A] dark:stroke-[#F06A4A]'
                        }
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}

                {RADAR_AXES.map((axis, idx) => {
                  const labelPt = polarToCartesian(
                    RADAR_CX,
                    RADAR_CY,
                    RADAR_LABEL_RADIUS,
                    idx,
                    RADAR_AXES.length
                  );
                  const isFocused = focusedAxis === axis.id;

                  let textAnchor: 'start' | 'middle' | 'end' = 'middle';
                  let dx = 0;
                  let dyBase = 0;

                  if (idx === 0) {
                    textAnchor = 'middle';
                    dyBase = -8;
                  } else if (idx === 3) {
                    textAnchor = 'middle';
                    dyBase = 12;
                  } else if (idx === 1 || idx === 2) {
                    textAnchor = 'start';
                    dx = 4;
                    dyBase = idx === 1 ? -4 : 4;
                  } else {
                    textAnchor = 'end';
                    dx = -4;
                    dyBase = idx === 5 ? -4 : 4;
                  }

                  return (
                    <text
                      key={`label-${axis.id}`}
                      x={labelPt.x + dx}
                      y={labelPt.y + dyBase}
                      textAnchor={textAnchor}
                      onClick={() => handleToggleAxis(axis.id)}
                      className={`cursor-pointer text-[11px] font-medium transition-colors ${
                        isFocused
                          ? 'fill-[#B5381A] dark:fill-[#F06A4A] font-semibold'
                          : 'fill-[#353A40] dark:fill-[#C2C8D1]'
                      }`}
                    >
                      <tspan x={labelPt.x + dx} dy="0">
                        {axis.labelLines[0]}
                      </tspan>
                      {axis.labelLines[1] && (
                        <tspan x={labelPt.x + dx} dy="13">
                          {axis.labelLines[1]}
                        </tspan>
                      )}
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 pt-5 border-t border-[#E4E6EA] dark:border-[#252A33]">
              <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8] mb-2.5">
                Axis Breakdown
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {RADAR_AXES.map((axis) => {
                  const isFocused = focusedAxis === axis.id;
                  return (
                    <button
                      key={axis.id}
                      type="button"
                      aria-pressed={isFocused}
                      onClick={() => handleToggleAxis(axis.id)}
                      className={`px-3 py-2 rounded-md border text-left transition-colors flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A] ${
                        isFocused
                          ? 'bg-[#FAFAFA] dark:bg-[#1B1F26] border-[#B5381A] dark:border-[#F06A4A] text-[#111315] dark:text-[#F2F4F7]'
                          : 'bg-transparent border-[#E4E6EA] dark:border-[#252A33] text-[#424850] dark:text-[#C2C8D1] hover:border-[#B8BEC8] dark:hover:border-[#3A4150] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                      }`}
                    >
                      <span className="text-xs font-medium">{axis.fullLabel}</span>
                      <span className="font-mono text-xs tabular-nums shrink-0 text-[#B5381A] dark:text-[#F06A4A]">
                        {axis.score}%
                      </span>
                    </button>
                  );
                })}
              </div>

              {focusedAxisData ? (
                <div
                  className="mt-4 pt-4 border-t border-[#E4E6EA] dark:border-[#252A33]"
                  data-testid="radar-axis-detail"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-[#111315] dark:text-[#F2F4F7]">
                      {focusedAxisData.fullLabel}
                    </p>
                    <span className="font-mono text-xs text-[#B5381A] dark:text-[#F06A4A] tabular-nums">
                      {getProficiencyTier(focusedAxisData.score)} · {focusedAxisData.score}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#525860] dark:text-[#949CA8]">
                    {focusedAxisData.evidence}
                  </p>
                </div>
              ) : (
                <p className="mt-4 pt-4 border-t border-[#E4E6EA] dark:border-[#252A33] text-xs text-[#525860] dark:text-[#949CA8]">
                  Scores reflect verified production delivery across Sirius, L.O.T., B/S/H/ field
                  auditing, and 11 accredited certifications.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#13161B] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-6 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E4E6EA] dark:border-[#252A33]">
              <div
                role="tablist"
                aria-label="Filter skills by domain"
                className="inline-flex items-center gap-1 p-1 bg-[#ECEEF2] dark:bg-[#1B1F26] rounded-lg"
              >
                {SKILL_DOMAINS.map((domain) => {
                  const isActive = activeDomain === domain.id && focusedAxis === null;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectDomain(domain.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A] ${
                        isActive
                          ? 'bg-white dark:bg-[#2A303B] text-[#111315] dark:text-[#F2F4F7] shadow-sm'
                          : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                      }`}
                    >
                      <span>{domain.label}</span>
                      <span className="ml-1.5 font-mono text-[11px] text-[#6B7280] dark:text-[#8E96A4] tabular-nums">
                        {domainCounts[domain.id]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-xs text-[#525860] dark:text-[#949CA8] shrink-0">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <span
                    aria-hidden="true"
                    className="w-3 h-1.5 rounded-[1px] bg-[#B5381A] dark:bg-[#F06A4A]"
                  />
                  <span>Technical</span>
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <span
                    aria-hidden="true"
                    className="w-3 h-1.5 rounded-[1px] bg-[#2B313A] dark:bg-[#9BA5B4]"
                  />
                  <span>Logistics</span>
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#525860] dark:text-[#949CA8]">
              <p aria-live="polite" className="tabular-nums">
                Showing {visibleSkills.length} of {SKILL_PROFICIENCIES.length} capabilities
                <span aria-hidden="true" className="mx-1.5 text-[#C5C9D0] dark:text-[#474F5E]">
                  ·
                </span>
                <span>Avg proficiency {averageProficiency}%</span>
              </p>
              {focusedAxisData && (
                <button
                  type="button"
                  onClick={() => setFocusedAxis(null)}
                  className="text-xs font-medium text-[#B5381A] dark:text-[#F06A4A] hover:underline whitespace-nowrap"
                >
                  Filtered by {focusedAxisData.fullLabel} — Show All
                </button>
              )}
            </div>

            <ul className="mt-4 divide-y divide-[#E4E6EA]/80 dark:divide-[#252A33]">
              {visibleSkills.map((skill) => {
                const tier = getProficiencyTier(skill.level);
                const isTechnical = skill.domain === 'technical';
                return (
                  <li key={skill.id} className="py-4 first:pt-2 last:pb-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-sm font-semibold text-[#111315] dark:text-[#F2F4F7]">
                        {skill.name}
                      </p>
                      <p className="font-mono text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0">
                        <span>{tier}</span>
                        <span
                          aria-hidden="true"
                          className="mx-1.5 text-[#C5C9D0] dark:text-[#474F5E]"
                        >
                          ·
                        </span>
                        <span className="font-medium text-[#111315] dark:text-[#F2F4F7]">
                          {skill.level}%
                        </span>
                      </p>
                    </div>

                    <div
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="mt-2 h-2 w-full rounded-sm bg-[#ECEEF2] dark:bg-[#1B1F26] overflow-hidden relative"
                    >
                      <div
                        className={`h-full rounded-sm transition-all duration-300 ${
                          isTechnical
                            ? 'bg-[#B5381A] dark:bg-[#F06A4A]'
                            : 'bg-[#2B313A] dark:bg-[#9BA5B4]'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-1/4 w-px bg-white/60 dark:bg-[#0C0E11]/50 pointer-events-none"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-1/2 w-px bg-white/60 dark:bg-[#0C0E11]/50 pointer-events-none"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-3/4 w-px bg-white/60 dark:bg-[#0C0E11]/50 pointer-events-none"
                      />
                    </div>

                    <div className="mt-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-xs text-[#525860] dark:text-[#949CA8]">
                      <span>{skill.evidence}</span>
                      <span className="text-[11px] text-[#6B7280] dark:text-[#8E96A4] whitespace-nowrap shrink-0">
                        {skill.domainLabel}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
