import { PROFILE } from '../data/portfolioData';

export function ProfileSection() {
  return (
    <section
      id="profile"
      className="py-20 lg:py-24 border-b border-[#E4E6EA] dark:border-[#252A33] bg-white dark:bg-[#13161B] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl pb-10 border-b border-[#E4E6EA] dark:border-[#252A33]">
          <p className="text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] mb-2">
            03. Education, Background &amp; Methodology
          </p>
          <h2
            className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
            style={{ textWrap: 'balance' }}
          >
            Academic foundation, languages, and practical field methodology.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="border-t border-[#E4E6EA] dark:border-[#252A33] pt-5">
              <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">Education</p>
              <div className="mt-2 space-y-3">
                <div>
                  <p className="text-[15px] font-semibold text-[#111315] dark:text-[#F2F4F7]">
                    {PROFILE.education.institution}
                  </p>
                  <p className="text-sm text-[#424850] dark:text-[#C2C8D1] mt-0.5">
                    {PROFILE.education.degree} · {PROFILE.education.honors}
                  </p>
                  <p className="font-mono text-xs text-[#B5381A] dark:text-[#F06A4A] mt-1">
                    {PROFILE.education.gpa} · {PROFILE.education.distinction}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-[#E4E6EA]/70 dark:border-[#252A33]/70">
                  <p className="text-sm font-medium text-[#111315] dark:text-[#F2F4F7]">
                    {PROFILE.education.highSchool}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E4E6EA] dark:border-[#252A33] pt-5">
              <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                Military Service
              </p>
              <p className="mt-1.5 text-[15px] font-semibold text-[#111315] dark:text-[#F2F4F7]">
                {PROFILE.militaryService.role}
              </p>
              <p className="font-mono text-xs text-[#B5381A] dark:text-[#F06A4A] mt-1">
                {PROFILE.militaryService.distinction}
              </p>
            </div>

            <div className="border-t border-[#E4E6EA] dark:border-[#252A33] pt-5">
              <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">Languages</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {PROFILE.languages.map((lang) => (
                  <div key={lang.language} className="flex items-baseline justify-between gap-2">
                    <dt className="font-medium text-[#111315] dark:text-[#F2F4F7]">
                      {lang.language}
                    </dt>
                    <dd className="text-xs text-[#525860] dark:text-[#949CA8]">{lang.level}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-[#E4E6EA] dark:border-[#252A33] pt-5">
              <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                Work Principles
              </p>
              <p className="mt-2 font-display text-lg font-bold text-[#111315] dark:text-[#F2F4F7] tracking-tight">
                {PROFILE.coreValues.map((val, idx) => (
                  <span key={val}>
                    {val}
                    {idx < PROFILE.coreValues.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mx-2 text-[#D94826] dark:text-[#F06A4A] font-normal"
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div className="border-t border-[#E4E6EA] dark:border-[#252A33] pt-5">
              <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                Personal Interests
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#424850] dark:text-[#C2C8D1]">
                {PROFILE.personalNote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-6 flex flex-col">
              <div>
                <h3 className="font-display text-base font-bold text-[#111315] dark:text-[#F2F4F7]">
                  Improvement On The Field
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#525860] dark:text-[#949CA8]">
                  Every digital tool begins with physical observation and ends with verified impact
                  on the platform floor.
                </p>
              </div>

              <div className="mt-5 flex items-center justify-center">
                <svg
                  viewBox="0 0 280 308"
                  role="img"
                  aria-label="Funnel diagram showing Analyze, Coding, and Field converging through a funnel into Improvement On The Field"
                  className="w-full max-w-[270px] h-auto"
                >
                  {/* Funnel translucent cone body */}
                  <path
                    d="M 32 76 L 114 196 Q 140 208 166 196 L 248 76 Z"
                    className="fill-[#D94826]/[0.07] dark:fill-[#F06A4A]/[0.08] stroke-[#D94826]/75 dark:stroke-[#F06A4A]/80"
                    strokeWidth="1.35"
                    strokeLinejoin="round"
                  />

                  {/* Funnel top opening back rim (double ellipse lip) */}
                  <ellipse
                    cx="140"
                    cy="76"
                    rx="108"
                    ry="29"
                    className="fill-[#D94826]/[0.06] dark:fill-[#F06A4A]/[0.08] stroke-[#D94826]/75 dark:stroke-[#F06A4A]/80"
                    strokeWidth="1.35"
                  />
                  <ellipse
                    cx="140"
                    cy="76"
                    rx="98"
                    ry="23"
                    className="fill-none stroke-[#D94826]/55 dark:stroke-[#F06A4A]/60"
                    strokeWidth="1.1"
                  />

                  {/* Lower circle inside funnel: Field */}
                  <circle
                    cx="145"
                    cy="149"
                    r="39"
                    className="fill-[#D94826]/20 dark:fill-[#F06A4A]/22 stroke-[#111315]/45 dark:stroke-[#F2F4F7]/40"
                    strokeWidth="1.15"
                  />
                  <text
                    x="145"
                    y="155"
                    textAnchor="middle"
                    className="fill-[#353A40] dark:fill-[#D5DAE2] text-[17px] font-medium"
                  >
                    Field
                  </text>

                  {/* Upper-left circle entering funnel: Analyze */}
                  <circle
                    cx="100"
                    cy="69"
                    r="52"
                    className="fill-[#D94826]/32 dark:fill-[#F06A4A]/32 stroke-[#111315]/55 dark:stroke-[#F2F4F7]/50"
                    strokeWidth="1.2"
                  />
                  <text
                    x="98"
                    y="74"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[16px] font-semibold"
                  >
                    Analyze
                  </text>

                  {/* Middle-right ellipse inside funnel: Coding */}
                  <ellipse
                    cx="171"
                    cy="106"
                    rx="56"
                    ry="32"
                    className="fill-[#D94826]/28 dark:fill-[#F06A4A]/28 stroke-[#111315]/55 dark:stroke-[#F2F4F7]/50"
                    strokeWidth="1.2"
                  />
                  <text
                    x="171"
                    y="112"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[16px] font-semibold"
                  >
                    Coding
                  </text>

                  {/* Funnel front rim arcs layered over circles for 3D depth */}
                  <path
                    d="M 32 76 A 108 29 0 0 0 248 76"
                    className="fill-none stroke-[#D94826] dark:stroke-[#F06A4A]"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 42 76 A 98 23 0 0 0 238 76"
                    className="fill-none stroke-[#D94826]/70 dark:stroke-[#F06A4A]/70"
                    strokeWidth="1.15"
                  />

                  {/* Downward block arrow */}
                  <path
                    d="M 129 211 H 151 V 226 H 162 L 140 244 L 118 226 H 129 Z"
                    className="fill-[#D94826]/22 dark:fill-[#F06A4A]/25 stroke-[#111315]/50 dark:stroke-[#F06A4A]/85"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />

                  {/* Output label */}
                  <text
                    x="140"
                    y="272"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[17px] font-display font-bold"
                  >
                    Improvement
                  </text>
                  <text
                    x="140"
                    y="294"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[17px] font-display font-bold"
                  >
                    On The Field
                  </text>
                </svg>
              </div>
            </div>

            <div className="bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-6 flex flex-col">
              <div>
                <h3 className="font-display text-base font-bold text-[#111315] dark:text-[#F2F4F7]">
                  Digitalisation Ecosystem
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#525860] dark:text-[#949CA8]">
                  Connecting partner governance, KPI transparency, and daily logistics execution.
                </p>
              </div>

              <div className="mt-5 flex items-center justify-center flex-1">
                <svg
                  viewBox="0 0 280 308"
                  role="img"
                  aria-label="Venn diagram showing Digitalisation overlapping with LSP Management, KPI Tracking, and Logistic Management"
                  className="w-full max-w-[270px] h-auto"
                >
                  {/* Central Venn circle: Digitalisation */}
                  <circle
                    cx="140"
                    cy="178"
                    r="80"
                    className="fill-[#D94826]/22 dark:fill-[#F06A4A]/22 stroke-[#111315]/50 dark:stroke-[#F06A4A]/75"
                    strokeWidth="1.25"
                  />

                  {/* Top overlapping Venn circle: LSP Management */}
                  <circle
                    cx="140"
                    cy="69"
                    r="44"
                    className="fill-[#D94826]/22 dark:fill-[#F06A4A]/22 stroke-[#111315]/50 dark:stroke-[#F06A4A]/75"
                    strokeWidth="1.25"
                  />

                  {/* Bottom-left overlapping Venn circle: KPI Tracking */}
                  <circle
                    cx="56"
                    cy="238"
                    r="44"
                    className="fill-[#D94826]/22 dark:fill-[#F06A4A]/22 stroke-[#111315]/50 dark:stroke-[#F06A4A]/75"
                    strokeWidth="1.25"
                  />

                  {/* Bottom-right overlapping Venn circle: Logistic Management */}
                  <circle
                    cx="224"
                    cy="238"
                    r="44"
                    className="fill-[#D94826]/22 dark:fill-[#F06A4A]/22 stroke-[#111315]/50 dark:stroke-[#F06A4A]/75"
                    strokeWidth="1.25"
                  />

                  {/* Labels rendered cleanly above intersecting translucent circles */}
                  <text
                    x="140"
                    y="184"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[20px] font-display font-bold"
                  >
                    Digitalisation
                  </text>

                  <text
                    x="140"
                    y="65"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[12px] font-semibold"
                  >
                    LSP
                  </text>
                  <text
                    x="140"
                    y="81"
                    textAnchor="middle"
                    className="fill-[#353A40] dark:fill-[#D5DAE2] text-[11.5px] font-medium"
                  >
                    Management
                  </text>

                  <text
                    x="55"
                    y="242"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[11.5px] font-semibold"
                  >
                    KPI Tracking
                  </text>

                  <text
                    x="225"
                    y="235"
                    textAnchor="middle"
                    className="fill-[#111315] dark:fill-[#F2F4F7] text-[12px] font-semibold"
                  >
                    Logistic
                  </text>
                  <text
                    x="225"
                    y="250"
                    textAnchor="middle"
                    className="fill-[#353A40] dark:fill-[#D5DAE2] text-[11.5px] font-medium"
                  >
                    Management
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
