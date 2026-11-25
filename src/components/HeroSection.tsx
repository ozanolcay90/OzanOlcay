import { useState } from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import { HERO_METRICS, PROFILE } from '../data/portfolioData';

export function HeroSection() {
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section
      id="top"
      className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E4E6EA] dark:border-[#252A33]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-1">
            <div>
              <div className="mb-5 space-y-1">
                <p className="font-mono text-xs uppercase tracking-[0.14em] font-medium text-[#B5381A] dark:text-[#F06A4A]">
                  Curriculum Vitae
                </p>
                <p className="text-sm font-medium text-[#525860] dark:text-[#949CA8]">
                  <span>{PROFILE.targetFocus}</span>
                  <span aria-hidden="true" className="mx-2 text-[#C5C9D0] dark:text-[#474F5E]">
                    ·
                  </span>
                  <span>{PROFILE.location}</span>
                </p>
              </div>

              <h1
                className="font-display font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7] leading-[1.08] max-w-2xl"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                  textWrap: 'balance',
                }}
              >
                Turning field logistics into measurable digital control.
              </h1>

              <p className="mt-6 text-base lg:text-[17px] leading-relaxed text-[#424850] dark:text-[#C2C8D1] max-w-[60ch]">
                I am {PROFILE.fullName}, {PROFILE.roleTitle} at {PROFILE.organization}. I combine
                on-the-ground distribution auditing with in-house software development to build
                transparent control towers, standardize LSP quality, and drive verifiable cost
                avoidance.
              </p>

              <p className="mt-4 font-serif italic text-[17px] text-[#353A40] dark:text-[#D5DAE2] max-w-[56ch]">
                “Analyze, code, and verify on the field — lasting operational excellence happens
                where data meets the loading dock.”
              </p>
            </div>

            <div className="mt-9 pt-6 border-t border-[#E4E6EA] dark:border-[#252A33] flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3.5">
              <a
                href="#experience"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
              >
                <span>View Work Experience</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={PROFILE.cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md hover:border-[#111315] dark:hover:border-[#6C7485] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
              >
                <FileText className="w-4 h-4 text-[#B5381A] dark:text-[#F06A4A]" aria-hidden="true" />
                <span>Full Profile / CV (PDF)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <figure className="relative w-full min-h-[380px] lg:min-h-[460px] bg-[#ECEDEF] dark:bg-[#13161B] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl overflow-hidden flex flex-col justify-end">
              {!portraitFailed ? (
                <img
                  src={PROFILE.portraitPath}
                  alt="Portrait of Ozan Olcay, TR Local Distribution Platform Inspector at B/S/H/"
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 bg-[#ECEFF3] dark:bg-[#1B1F26] flex flex-col items-center justify-center p-8 text-center">
                  <span className="font-display text-4xl font-bold text-[#111315] dark:text-[#F2F4F7] tracking-tight">
                    OO
                  </span>
                  <span className="mt-2 text-sm text-[#525860] dark:text-[#949CA8]">
                    {PROFILE.fullName}
                  </span>
                </div>
              )}

              <figcaption className="relative z-10 bg-gradient-to-t from-[#111315]/90 via-[#111315]/60 to-transparent pt-16 pb-5 px-5 text-white">
                <p className="text-sm font-semibold tracking-tight">{PROFILE.fullName}</p>
                <p className="text-xs text-white/85 mt-0.5">
                  {PROFILE.roleTitle} · {PROFILE.organization} (Since 2020)
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        <div
          aria-label="Key career metrics"
          className="mt-12 lg:mt-14 pt-8 border-t border-[#E4E6EA] dark:border-[#252A33] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <p className="font-mono text-2xl lg:text-[28px] font-medium tracking-tight text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                {metric.value}
              </p>
              <p className="text-sm font-semibold text-[#111315] dark:text-[#F2F4F7]">
                {metric.label}
              </p>
              <p className="text-xs leading-relaxed text-[#525860] dark:text-[#949CA8]">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
