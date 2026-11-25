import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Database, Layers, Shield, Users, X } from 'lucide-react';
import {
  PROJECTS,
  RECOGNITIONS,
  STRATEGIC_PILLARS,
  type ProjectCaseStudy,
} from '../data/portfolioData';

type ModalTab = 'architecture' | 'comparison';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [modalTab, setModalTab] = useState<ModalTab>('architecture');

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const openProjectModal = (project: ProjectCaseStudy, tab: ModalTab = 'architecture') => {
    setSelectedProject(project);
    setModalTab(tab);
  };

  const sirius = PROJECTS.find((p) => p.id === 'sirius')!;
  const lot = PROJECTS.find((p) => p.id === 'lot')!;

  return (
    <section
      id="projects"
      className="py-20 lg:py-24 border-b border-[#E4E6EA] dark:border-[#252A33] bg-white dark:bg-[#13161B] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E4E6EA] dark:border-[#252A33]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] mb-2">
              01. Selected Work
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
              style={{ textWrap: 'balance' }}
            >
              In-house logistics systems built for real distribution platforms.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => openProjectModal(lot, 'comparison')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] bg-[#F3F4F6] dark:bg-[#1B1F26] hover:bg-[#E7E9ED] dark:hover:bg-[#252A33] rounded-md transition-colors whitespace-nowrap shrink-0 self-start md:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
          >
            <Layers className="w-4 h-4 text-[#B5381A] dark:text-[#F06A4A]" aria-hidden="true" />
            <span>Compare Sirius vs. L.O.T.</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {PROJECTS.map((project, idx) => {
            const isFeatured = idx === 0;
            return (
              <article
                key={project.id}
                className={`${
                  isFeatured ? 'lg:col-span-7' : 'lg:col-span-5'
                } bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-7 lg:p-8 flex flex-col justify-between transition-colors duration-150 hover:border-[#C5C9D0] dark:hover:border-[#3A4150]`}
              >
                <div>
                  <p className="text-xs font-medium text-[#525860] dark:text-[#949CA8] mb-3">
                    {project.kicker}
                  </p>

                  <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 border-b border-[#E4E6EA] dark:border-[#252A33]">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]">
                      {project.name}
                    </h3>
                    <span className="font-mono text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] tabular-nums">
                      {project.headlineMetric}
                    </span>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-[#424850] dark:text-[#C2C8D1]">
                    {project.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E4E6EA] dark:border-[#252A33]">
                    <div>
                      <p className="font-mono text-xl font-medium text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                        {project.pagesCount}
                      </p>
                      <p className="text-xs text-[#525860] dark:text-[#949CA8] mt-0.5">
                        Report pages
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xl font-medium text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                        {project.users.length}
                      </p>
                      <p className="text-xs text-[#525860] dark:text-[#949CA8] mt-0.5">
                        User teams
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xl font-medium text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                        {project.includedData.length}
                      </p>
                      <p className="text-xs text-[#525860] dark:text-[#949CA8] mt-0.5">
                        Included datasets
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xl font-medium text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                        {project.dataSize.graphics}
                      </p>
                      <p className="text-xs text-[#525860] dark:text-[#949CA8] mt-0.5">
                        Graphics
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-3">
                      Key Operational Outcomes
                    </p>
                    <ul className="space-y-2.5">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#424850] dark:text-[#C2C8D1] leading-snug"
                        >
                          <Check
                            className="w-4 h-4 text-[#B5381A] dark:text-[#F06A4A] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="mt-6 pt-5 border-t border-[#E4E6EA] dark:border-[#252A33] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">
                        Access Restrictions
                      </dt>
                      <dd className="mt-0.5 text-[#111315] dark:text-[#F2F4F7] font-medium">
                        {project.restrictions}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">
                        Data Security &amp; Scale
                      </dt>
                      <dd className="mt-0.5 text-[#111315] dark:text-[#F2F4F7] font-medium tabular-nums">
                        {project.dataSecurity} · {project.dataSize.rows}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">
                        Authorized User Teams ({project.users.length})
                      </dt>
                      <dd className="mt-1 text-[#424850] dark:text-[#C2C8D1] leading-relaxed">
                        {project.users.join(' · ')}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 pt-5 border-t border-[#E4E6EA] dark:border-[#252A33] flex items-center justify-between gap-4">
                  <span className="text-xs text-[#525860] dark:text-[#949CA8] truncate">
                    {project.headlineMetricLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => openProjectModal(project, 'architecture')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
                  >
                    <span>Inspect {project.shortTitle}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-[#E4E6EA] dark:border-[#252A33] grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7] mb-6">
              Field Recognition &amp; Initiatives
            </h3>
            <div className="divide-y divide-[#E4E6EA] dark:divide-[#252A33] border-t border-b border-[#E4E6EA] dark:border-[#252A33]">
              {RECOGNITIONS.map((item) => (
                <div key={item.id} className="py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[15px] font-semibold text-[#111315] dark:text-[#F2F4F7]">
                      {item.title}
                    </p>
                    <span className="text-xs text-[#525860] dark:text-[#949CA8]">
                      {item.context}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#525860] dark:text-[#949CA8] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7] mb-6">
              REM Region Strategic Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STRATEGIC_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-6"
                >
                  <p className="font-mono text-xs font-medium text-[#B5381A] dark:text-[#F06A4A] tabular-nums">
                    {pillar.index}.
                  </p>
                  <h4 className="mt-1.5 font-display text-base font-bold text-[#111315] dark:text-[#F2F4F7]">
                    {pillar.title}
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-sm text-[#424850] dark:text-[#C2C8D1] leading-snug">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="text-[#9AA0A8] dark:text-[#636C7A] select-none"
                        >
                          —
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111315]/60 dark:bg-black/75 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="bg-white dark:bg-[#13161B] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl max-w-4xl w-full max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 bg-white dark:bg-[#13161B] border-b border-[#E4E6EA] dark:border-[#252A33] px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#525860] dark:text-[#949CA8]">
                  {selectedProject.kicker}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1 font-display text-2xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
                >
                  {modalTab === 'comparison'
                    ? 'Platform Evolution: Sirius → L.O.T.'
                    : selectedProject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#F3F4F6] dark:hover:bg-[#1B1F26] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pt-5 pb-2 border-b border-[#E4E6EA] dark:border-[#252A33] flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Project inspection view"
                className="inline-flex items-center gap-1 p-1 bg-[#F3F4F6] dark:bg-[#1B1F26] rounded-lg"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={modalTab === 'architecture'}
                  onClick={() => setModalTab('architecture')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    modalTab === 'architecture'
                      ? 'bg-white dark:bg-[#2A303B] text-[#111315] dark:text-[#F2F4F7] shadow-sm'
                      : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                  }`}
                >
                  Data Pipeline &amp; Outputs
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={modalTab === 'comparison'}
                  onClick={() => setModalTab('comparison')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    modalTab === 'comparison'
                      ? 'bg-white dark:bg-[#2A303B] text-[#111315] dark:text-[#F2F4F7] shadow-sm'
                      : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                  }`}
                >
                  Sirius vs. L.O.T. Evolution
                </button>
              </div>

              {modalTab === 'architecture' && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#525860] dark:text-[#949CA8]">Switch system:</span>
                  {PROJECTS.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap ${
                        selectedProject.id === proj.id
                          ? 'bg-[#111315] dark:bg-[#F2F4F7] text-white dark:text-[#0C0E11]'
                          : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#F3F4F6] dark:hover:bg-[#1B1F26]'
                      }`}
                    >
                      {proj.shortTitle}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              {modalTab === 'architecture' ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-lg">
                    <p className="text-sm leading-relaxed text-[#424850] dark:text-[#C2C8D1] max-w-2xl">
                      {selectedProject.context}
                    </p>
                    <div className="shrink-0 sm:text-right">
                      <p className="font-mono text-xl font-medium text-[#B5381A] dark:text-[#F06A4A] tabular-nums">
                        {selectedProject.headlineMetric}
                      </p>
                      <p className="text-xs text-[#525860] dark:text-[#949CA8]">
                        {selectedProject.headlineMetricLabel}
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-[#E4E6EA] dark:border-[#252A33] rounded-lg bg-[#FAFAFA]/60 dark:bg-[#0C0E11]/60 text-xs">
                    <div>
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">Pages</dt>
                      <dd className="mt-1 font-mono text-sm font-medium text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                        {selectedProject.pagesCount} Pages
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">
                        Data Size
                      </dt>
                      <dd className="mt-1 font-mono text-xs font-medium text-[#111315] dark:text-[#F2F4F7] tabular-nums leading-snug">
                        {selectedProject.dataSize.rows} · {selectedProject.dataSize.sourcePages} ·{' '}
                        {selectedProject.dataSize.graphics} graphics
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">
                        Restrictions
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[#111315] dark:text-[#F2F4F7]">
                        {selectedProject.restrictions}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#525860] dark:text-[#949CA8]">
                        Data Security
                      </dt>
                      <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#111315] dark:text-[#F2F4F7]">
                        <Shield
                          className="w-3.5 h-3.5 text-[#B5381A] dark:text-[#F06A4A] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{selectedProject.dataSecurity}</span>
                      </dd>
                    </div>
                  </dl>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="border border-[#E4E6EA] dark:border-[#252A33] rounded-lg p-4">
                      <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#E4E6EA] dark:border-[#252A33]">
                        <h4 className="font-display text-sm font-bold text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap">
                          01. Data Sources
                        </h4>
                        <span className="font-mono text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0">
                          {selectedProject.sources.length} feeds
                        </span>
                      </div>
                      <ul className="space-y-2 text-[13px] leading-snug text-[#424850] dark:text-[#C2C8D1]">
                        {selectedProject.sources.map((src) => (
                          <li key={src} className="flex items-start gap-2">
                            <Database
                              className="w-3.5 h-3.5 text-[#7A818B] dark:text-[#8E96A4] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{src}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-[#E4E6EA] dark:border-[#252A33] rounded-lg p-4">
                      <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#E4E6EA] dark:border-[#252A33]">
                        <h4 className="font-display text-sm font-bold text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap">
                          02. Automations
                        </h4>
                        <span className="font-mono text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0">
                          {selectedProject.automatedProcesses.length} engines
                        </span>
                      </div>
                      <ul className="space-y-2 text-[13px] leading-snug text-[#424850] dark:text-[#C2C8D1]">
                        {selectedProject.automatedProcesses.map((proc) => (
                          <li key={proc} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="text-[#B5381A] dark:text-[#F06A4A] font-mono text-xs mt-0.5 shrink-0"
                            >
                              →
                            </span>
                            <span>{proc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-[#E4E6EA] dark:border-[#252A33] rounded-lg p-4 bg-[#FAFAFA] dark:bg-[#0C0E11]">
                      <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#E4E6EA] dark:border-[#252A33]">
                        <h4 className="font-display text-sm font-bold text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap">
                          03. Outputs
                        </h4>
                        <span className="font-mono text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0">
                          {selectedProject.outputs.length} outcomes
                        </span>
                      </div>
                      <ul className="space-y-2 text-[13px] leading-snug text-[#111315] dark:text-[#F2F4F7]">
                        {selectedProject.outputs.map((out) => (
                          <li key={out} className="flex items-start gap-2">
                            <Check
                              className="w-3.5 h-3.5 text-[#B5381A] dark:text-[#F06A4A] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-5 border border-[#E4E6EA] dark:border-[#252A33] rounded-lg p-4">
                      <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#E4E6EA] dark:border-[#252A33]">
                        <h4 className="font-display text-sm font-bold text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap">
                          04. Authorized Users
                        </h4>
                        <span className="font-mono text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0">
                          {selectedProject.users.length} teams
                        </span>
                      </div>
                      <ul className="space-y-2 text-[13px] leading-snug text-[#424850] dark:text-[#C2C8D1]">
                        {selectedProject.users.map((user) => (
                          <li key={user} className="flex items-start gap-2">
                            <Users
                              className="w-3.5 h-3.5 text-[#7A818B] dark:text-[#8E96A4] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{user}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-7 border border-[#E4E6EA] dark:border-[#252A33] rounded-lg p-4">
                      <div className="flex items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#E4E6EA] dark:border-[#252A33]">
                        <h4 className="font-display text-sm font-bold text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap">
                          05. Included Data Scope
                        </h4>
                        <span className="font-mono text-xs text-[#525860] dark:text-[#949CA8] tabular-nums whitespace-nowrap shrink-0">
                          {selectedProject.includedData.length} datasets
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] leading-snug text-[#424850] dark:text-[#C2C8D1]">
                        {selectedProject.includedData.map((dataset) => (
                          <li key={dataset} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="text-[#B5381A] dark:text-[#F06A4A] select-none shrink-0"
                            >
                              —
                            </span>
                            <span>{dataset}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-[#424850] dark:text-[#C2C8D1] leading-relaxed">
                    L.O.T. (Local Operations Tracking) directly scales the Sirius automation core
                    from {sirius.pagesCount} to {lot.pagesCount} report pages—doubling user groups
                    from {sirius.users.length} to {lot.users.length}, expanding included datasets
                    from {sirius.includedData.length} to {lot.includedData.length}, growing visual
                    analytics from {sirius.dataSize.graphics} to {lot.dataSize.graphics} graphics
                    across 600,000 rows, and upgrading access control to {lot.restrictions} on{' '}
                    {lot.dataSecurity}.
                  </p>

                  <div className="overflow-x-auto border border-[#E4E6EA] dark:border-[#252A33] rounded-lg">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#FAFAFA] dark:bg-[#0C0E11] border-b border-[#E4E6EA] dark:border-[#252A33]">
                          <th className="py-3.5 px-4 font-display font-semibold text-[#111315] dark:text-[#F2F4F7] w-44">
                            Dimension
                          </th>
                          <th className="py-3.5 px-4 font-display font-semibold text-[#111315] dark:text-[#F2F4F7]">
                            Sirius
                          </th>
                          <th className="py-3.5 px-4 font-display font-semibold text-[#B5381A] dark:text-[#F06A4A]">
                            Local Operations Tracking (L.O.T.)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E6EA] dark:divide-[#252A33] align-top">
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Pages
                          </td>
                          <td className="py-3.5 px-4 font-mono tabular-nums text-[#424850] dark:text-[#C2C8D1]">
                            {sirius.pagesCount} Pages
                          </td>
                          <td className="py-3.5 px-4 font-mono tabular-nums text-[#111315] dark:text-[#F2F4F7] font-medium">
                            {lot.pagesCount} Pages
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Data Size
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#424850] dark:text-[#C2C8D1] space-y-1">
                            <div>{sirius.dataSize.rows}</div>
                            <div>{sirius.dataSize.sourcePages}</div>
                            <div>{sirius.dataSize.graphics} Graphics</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#111315] dark:text-[#F2F4F7] font-medium space-y-1">
                            <div>{lot.dataSize.rows}</div>
                            <div>{lot.dataSize.sourcePages}</div>
                            <div>{lot.dataSize.graphics} Graphics</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Users
                          </td>
                          <td className="py-3.5 px-4 text-xs text-[#424850] dark:text-[#C2C8D1]">
                            <p className="font-mono text-[11px] text-[#6B7280] dark:text-[#8E96A4] mb-1.5 tabular-nums">
                              {sirius.users.length} teams
                            </p>
                            <ul className="space-y-1">
                              {sirius.users.map((user) => (
                                <li key={user}>— {user}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-[#111315] dark:text-[#F2F4F7]">
                            <p className="font-mono text-[11px] text-[#B5381A] dark:text-[#F06A4A] mb-1.5 tabular-nums">
                              {lot.users.length} teams
                            </p>
                            <ul className="space-y-1">
                              {lot.users.map((user) => (
                                <li key={user}>— {user}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Included Data
                          </td>
                          <td className="py-3.5 px-4 text-xs text-[#424850] dark:text-[#C2C8D1]">
                            <p className="font-mono text-[11px] text-[#6B7280] dark:text-[#8E96A4] mb-1.5 tabular-nums">
                              {sirius.includedData.length} datasets
                            </p>
                            <ul className="space-y-1">
                              {sirius.includedData.map((item) => (
                                <li key={item}>— {item}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-[#111315] dark:text-[#F2F4F7]">
                            <p className="font-mono text-[11px] text-[#B5381A] dark:text-[#F06A4A] mb-1.5 tabular-nums">
                              {lot.includedData.length} datasets
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                              {lot.includedData.map((item) => (
                                <li key={item}>— {item}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Data Sources &amp; Engines
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#424850] dark:text-[#C2C8D1]">
                            {sirius.sources.length} sources · {sirius.automatedProcesses.length}{' '}
                            automations
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#111315] dark:text-[#F2F4F7] font-medium">
                            {lot.sources.length} sources · {lot.automatedProcesses.length}{' '}
                            automations
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Restrictions
                          </td>
                          <td className="py-3.5 px-4 text-[#424850] dark:text-[#C2C8D1]">
                            {sirius.restrictions}
                          </td>
                          <td className="py-3.5 px-4 text-[#111315] dark:text-[#F2F4F7] font-medium">
                            {lot.restrictions}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Data Security
                          </td>
                          <td className="py-3.5 px-4 text-[#424850] dark:text-[#C2C8D1]">
                            {sirius.dataSecurity}
                          </td>
                          <td className="py-3.5 px-4 text-[#111315] dark:text-[#F2F4F7] font-medium">
                            {lot.dataSecurity}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-medium text-[#111315] dark:text-[#F2F4F7]">
                            Impact &amp; Mobility
                          </td>
                          <td className="py-3.5 px-4 text-[#424850] dark:text-[#C2C8D1]">
                            12 MTL Yearly Cost Avoidance · Daily scorecards &amp; weekly LSP reports
                          </td>
                          <td className="py-3.5 px-4 text-[#111315] dark:text-[#F2F4F7] font-medium">
                            360° Local Distribution Control Tower · Real-time mobile tracking
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
