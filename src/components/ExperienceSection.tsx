import { useState } from 'react';
import {
  CAREER_MILESTONES,
  CHALLENGES_AND_LEARNINGS,
} from '../data/portfolioData';

type ReflectionTab = 'challenges' | 'learnings';

export function ExperienceSection() {
  const [reflectionTab, setReflectionTab] = useState<ReflectionTab>('challenges');

  return (
    <section
      id="experience"
      className="py-20 lg:py-24 border-b border-[#E4E6EA] dark:border-[#252A33] bg-white dark:bg-[#13161B] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl pb-10 border-b border-[#E4E6EA] dark:border-[#252A33]">
          <p className="text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] mb-2">
            01. Work Experience
          </p>
          <h2
            className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
            style={{ textWrap: 'balance' }}
          >
            From regional operations to national distribution auditing &amp; automation.
          </h2>
        </div>

          <div className="divide-y divide-[#E4E6EA] dark:divide-[#252A33]">
            {CAREER_MILESTONES.map((milestone) => (
              <article
                key={milestone.id}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
              >
                <div className="lg:col-span-4 space-y-1.5">
                  <p className="font-mono text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] tabular-nums">
                    {milestone.period}
                  </p>
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]">
                    {milestone.company}
                  </h3>
                  <p className="text-sm font-medium text-[#424850] dark:text-[#C2C8D1]">
                    {milestone.role}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#8E96A4]">{milestone.location}</p>
                </div>

                <div className="lg:col-span-8 space-y-5">
                  <p className="text-[15px] leading-relaxed text-[#353A40] dark:text-[#D5DAE2] max-w-[68ch]">
                    {milestone.summary}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-[#424850] dark:text-[#C2C8D1]">
                    {milestone.focusAreas.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 leading-snug">
                        <span
                          aria-hidden="true"
                          className="text-[#9AA0A8] dark:text-[#636C7A] select-none shrink-0"
                        >
                          —
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-[#E4E6EA]/80 dark:border-[#252A33]">
                    <p className="text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-1.5">
                      Gained Capabilities
                    </p>
                    <p className="text-xs leading-relaxed text-[#525860] dark:text-[#949CA8]">
                      {milestone.capabilities.map((cap, idx) => (
                        <span key={cap}>
                          {cap}
                          {idx < milestone.capabilities.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="mx-2 text-[#C5C9D0] dark:text-[#474F5E]"
                            >
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-7 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E6EA] dark:border-[#252A33]">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]">
                  Field Journey: Challenges Solved &amp; Core Learnings
                </h3>
                <p className="text-sm text-[#525860] dark:text-[#949CA8] mt-1">
                  Lessons distilled from building audit teams and standardizing LSP operations.
                </p>
              </div>
              <div
                role="tablist"
                aria-label="Field journey reflections"
                className="inline-flex items-center gap-1 p-1 bg-[#F3F4F6] dark:bg-[#1B1F26] rounded-lg self-start"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={reflectionTab === 'challenges'}
                  onClick={() => setReflectionTab('challenges')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    reflectionTab === 'challenges'
                      ? 'bg-white dark:bg-[#2A303B] text-[#111315] dark:text-[#F2F4F7] shadow-sm'
                      : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                  }`}
                >
                  Challenges Tackled
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={reflectionTab === 'learnings'}
                  onClick={() => setReflectionTab('learnings')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    reflectionTab === 'learnings'
                      ? 'bg-white dark:bg-[#2A303B] text-[#111315] dark:text-[#F2F4F7] shadow-sm'
                      : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                  }`}
                >
                  Core Learnings
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {CHALLENGES_AND_LEARNINGS[reflectionTab].map((entry, idx) => (
                <div key={entry} className="flex items-start gap-3.5">
                  <span className="font-mono text-xs font-medium text-[#B5381A] dark:text-[#F06A4A] tabular-nums mt-0.5 shrink-0">
                    0{idx + 1}.
                  </span>
                  <p className="text-sm leading-relaxed text-[#353A40] dark:text-[#D5DAE2]">
                    {entry}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
