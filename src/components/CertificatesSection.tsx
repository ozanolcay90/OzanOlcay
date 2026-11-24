import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Search,
  X,
} from 'lucide-react';
import {
  CERTIFICATES,
  CERTIFICATE_CATEGORIES,
  PROFILE,
  type CertificateCategory,
  type CertificateItem,
} from '../data/portfolioData';
import {
  filterCertificates,
  formatCredentialIdPreview,
  getCertificateCategoryCounts,
} from '../utils/portfolioLogic';

export function CertificatesSection() {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categoryCounts = useMemo(() => getCertificateCategoryCounts(CERTIFICATES), []);

  const filteredCertificates = useMemo(
    () => filterCertificates(CERTIFICATES, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  const selectedIndex = useMemo(
    () =>
      selectedCertId
        ? filteredCertificates.findIndex((cert) => cert.id === selectedCertId)
        : -1,
    [filteredCertificates, selectedCertId]
  );

  const selectedCert: CertificateItem | null =
    selectedIndex >= 0
      ? filteredCertificates[selectedIndex]
      : selectedCertId
        ? CERTIFICATES.find((c) => c.id === selectedCertId) ?? null
        : null;

  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCertId(null);
      } else if (event.key === 'ArrowRight' && filteredCertificates.length > 1 && selectedIndex >= 0) {
        const nextIndex = (selectedIndex + 1) % filteredCertificates.length;
        setSelectedCertId(filteredCertificates[nextIndex].id);
        setCopiedId(false);
      } else if (event.key === 'ArrowLeft' && filteredCertificates.length > 1 && selectedIndex >= 0) {
        const prevIndex =
          (selectedIndex - 1 + filteredCertificates.length) % filteredCertificates.length;
        setSelectedCertId(filteredCertificates[prevIndex].id);
        setCopiedId(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert, selectedIndex, filteredCertificates]);

  const handleCopyCredentialId = async (credentialId: string) => {
    try {
      await navigator.clipboard.writeText(credentialId);
      setCopiedId(true);
      window.setTimeout(() => setCopiedId(false), 2000);
    } catch {
      setCopiedId(false);
    }
  };

  return (
    <section
      id="credentials"
      className="py-20 lg:py-24 border-b border-[#E4E6EA] dark:border-[#252A33] bg-white dark:bg-[#13161B] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E6EA] dark:border-[#252A33]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] mb-2">
              05. Verified Credentials
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
              style={{ textWrap: 'balance' }}
            >
              11 accredited certifications across logistics, project management, and AI.
            </h2>
          </div>

          <a
            href={PROFILE.certificatesArchiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <span>Open Full Drive Archive</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter certifications by discipline"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#ECEEF2] dark:bg-[#1B1F26] rounded-lg"
          >
            {CERTIFICATE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A] ${
                    isActive
                      ? 'bg-white dark:bg-[#2A303B] text-[#111315] dark:text-[#F2F4F7] shadow-sm'
                      : 'text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7]'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="ml-1.5 font-mono text-[11px] text-[#6B7280] dark:text-[#8E96A4] tabular-nums">
                    {categoryCounts[category.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="certificate-search" className="sr-only">
              Search credentials by title, issuer, or ID
            </label>
            <Search
              className="w-4 h-4 text-[#6B7280] dark:text-[#8E96A4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="certificate-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, issuer, or ID..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md text-[#111315] dark:text-[#F2F4F7] placeholder:text-[#7A818B] dark:placeholder:text-[#7A8291] focus:outline-none focus:border-[#111315] dark:focus:border-[#8E96A4]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear credential search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6B7280] dark:text-[#8E96A4] hover:text-[#111315] dark:hover:text-[#F2F4F7]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <p aria-live="polite" className="mt-5 text-xs text-[#525860] dark:text-[#949CA8] tabular-nums">
          Showing {filteredCertificates.length} of {CERTIFICATES.length} verified certificates
        </p>

        {filteredCertificates.length === 0 ? (
          <div className="mt-6 bg-white dark:bg-[#13161B] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-12 text-center">
            <p className="font-display text-lg font-semibold text-[#111315] dark:text-[#F2F4F7]">
              No matching credentials found
            </p>
            <p className="mt-1.5 text-sm text-[#525860] dark:text-[#949CA8]">
              Try adjusting your discipline filter or clearing the search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 px-4 py-2 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <article
                key={cert.id}
                className="bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#B8BEC8] dark:hover:border-[#3A4150]"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertId(cert.id);
                    setCopiedId(false);
                  }}
                  aria-label={`View certificate: ${cert.title}`}
                  className="text-left group focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
                >
                  <div className="aspect-[4/3] bg-[#F3F4F6] dark:bg-[#1B1F26] border-b border-[#E4E6EA] dark:border-[#252A33] overflow-hidden relative">
                    {!failedImages[cert.id] ? (
                      <img
                        src={cert.previewImage}
                        alt={`${cert.title} certificate preview`}
                        referrerPolicy="no-referrer"
                        decoding="async"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [cert.id]: true }))
                        }
                        className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#ECEFF3] dark:bg-[#1B1F26]">
                        <span className="font-mono text-xs text-[#525860] dark:text-[#949CA8]">
                          {cert.issuerShort}
                        </span>
                        <span className="mt-2 font-display text-sm font-semibold text-[#111315] dark:text-[#F2F4F7]">
                          {cert.title}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-[#525860] dark:text-[#949CA8]">
                      <span>{cert.issuerShort}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C5C9D0] dark:text-[#474F5E]">
                        ·
                      </span>
                      <span className="tabular-nums">{cert.completedDate}</span>
                    </p>
                    <h3 className="mt-2 font-display text-base font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7] group-hover:text-[#B5381A] dark:group-hover:text-[#F06A4A] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    {cert.subtitle && (
                      <p className="mt-1 text-xs text-[#525860] dark:text-[#949CA8] leading-snug">
                        {cert.subtitle}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-[#424850] dark:text-[#C2C8D1] tabular-nums">
                      {cert.creditSummary}
                    </p>
                  </div>
                </button>

                <div className="px-5 py-3.5 border-t border-[#E4E6EA] dark:border-[#252A33] bg-[#FAFAFA] dark:bg-[#0C0E11]/70 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCertId(cert.id);
                      setCopiedId(false);
                    }}
                    className="text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors whitespace-nowrap"
                  >
                    Inspect Certificate
                  </button>
                  <a
                    href={cert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download PDF for ${cert.title}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>PDF</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111315]/70 dark:bg-black/80 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCertId(null);
          }}
        >
          <div className="bg-white dark:bg-[#13161B] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 bg-white dark:bg-[#13161B] border-b border-[#E4E6EA] dark:border-[#252A33] px-6 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-[#525860] dark:text-[#949CA8] truncate">
                  {selectedCert.issuer} · {selectedCert.completedDate}
                </p>
                <h3
                  id="cert-lightbox-title"
                  className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7] truncate"
                >
                  {selectedCert.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {filteredCertificates.length > 1 && selectedIndex >= 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const prevIndex =
                          (selectedIndex - 1 + filteredCertificates.length) %
                          filteredCertificates.length;
                        setSelectedCertId(filteredCertificates[prevIndex].id);
                        setCopiedId(false);
                      }}
                      aria-label="Previous certificate"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#E4E6EA] dark:border-[#252A33] text-[#424850] dark:text-[#C2C8D1] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#F3F4F6] dark:hover:bg-[#1B1F26] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextIndex = (selectedIndex + 1) % filteredCertificates.length;
                        setSelectedCertId(filteredCertificates[nextIndex].id);
                        setCopiedId(false);
                      }}
                      aria-label="Next certificate"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#E4E6EA] dark:border-[#252A33] text-[#424850] dark:text-[#C2C8D1] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#F3F4F6] dark:hover:bg-[#1B1F26] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedCertId(null)}
                  aria-label="Close certificate preview"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md text-[#525860] dark:text-[#949CA8] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#F3F4F6] dark:hover:bg-[#1B1F26] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="bg-[#F3F4F6] dark:bg-[#1B1F26] border border-[#E4E6EA] dark:border-[#252A33] rounded-lg overflow-hidden flex items-center justify-center p-2">
                <img
                  src={selectedCert.previewImage}
                  alt={`Full view of ${selectedCert.title} certificate`}
                  referrerPolicy="no-referrer"
                  className="max-h-[50vh] w-auto max-w-full object-contain block rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <dl className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                      Issuing Body
                    </dt>
                    <dd className="mt-0.5 text-[#111315] dark:text-[#F2F4F7]">
                      {selectedCert.issuer}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                      Credits &amp; Scope
                    </dt>
                    <dd className="mt-0.5 text-[#111315] dark:text-[#F2F4F7] tabular-nums">
                      {selectedCert.creditSummary}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                      Provider Metadata
                    </dt>
                    <dd className="mt-0.5 text-[#424850] dark:text-[#C2C8D1]">
                      {selectedCert.providerMeta}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                      Credential ID
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-2">
                      <code className="font-mono text-xs text-[#111315] dark:text-[#F2F4F7]">
                        {formatCredentialIdPreview(selectedCert.credentialId)}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyCredentialId(selectedCert.credentialId)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#B5381A] dark:text-[#F06A4A] hover:underline whitespace-nowrap"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </dd>
                  </div>
                </dl>

                <div className="md:col-span-4 flex flex-col gap-2.5 md:items-end">
                  <a
                    href={selectedCert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors whitespace-nowrap w-full md:w-auto"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Open Original PDF</span>
                  </a>
                  <p className="text-xs text-[#525860] dark:text-[#949CA8] md:text-right">
                    Skills: {selectedCert.skills.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
