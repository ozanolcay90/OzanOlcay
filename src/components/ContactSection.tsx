import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, FileText, Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  buildMailtoHref,
  validateInquiry,
  type InquiryFormInput,
} from '../utils/portfolioLogic';

const TOPIC_OPTIONS = [
  'REM Region Logistics Opportunity',
  'Supply Chain Digitalization & Control Tower',
  'LSP Audit & Operational Excellence',
  'Professional Collaboration',
] as const;

const INITIAL_FORM: InquiryFormInput = {
  name: '',
  email: '',
  organization: '',
  topic: TOPIC_OPTIONS[0],
  message: '',
};

export function ContactSection() {
  const [formState, setFormState] = useState<InquiryFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormInput, string>>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryFormInput | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiry(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedInquiry({ ...formState });
  };

  const handleReset = () => {
    setFormState(INITIAL_FORM);
    setErrors({});
    setSubmittedInquiry(null);
  };

  return (
    <>
      <section
        id="contact"
        className="py-20 lg:py-24 bg-white dark:bg-[#13161B] transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <p className="text-sm font-medium text-[#B5381A] dark:text-[#F06A4A] mb-2">
                  05. Contact
                </p>
                <h2
                  className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]"
                  style={{ textWrap: 'balance' }}
                >
                  Open to regional logistics leadership and digitalization projects.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#424850] dark:text-[#C2C8D1]">
                  Whether you are hiring for REM region logistics expertise, exploring data-backed
                  control towers, or reviewing audit and LSP standards, reach out directly.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#E4E6EA] dark:border-[#252A33]">
                <div className="flex items-center justify-between gap-4 py-2">
                  <div>
                    <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                      Direct Email
                    </p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="mt-0.5 inline-block font-mono text-sm font-medium text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111315] dark:text-[#F2F4F7] bg-[#F3F4F6] dark:bg-[#1B1F26] hover:bg-[#E7E9ED] dark:hover:bg-[#252A33] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
                  >
                    {emailCopied ? (
                      <>
                        <Check
                          className="w-3.5 h-3.5 text-[#B5381A] dark:text-[#F06A4A]"
                          aria-hidden="true"
                        />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-2 border-t border-[#E4E6EA] dark:border-[#252A33]">
                  <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                    Base Location
                  </p>
                  <p className="mt-0.5 text-sm text-[#111315] dark:text-[#F2F4F7]">
                    {PROFILE.location}
                  </p>
                </div>

                <div className="py-2 border-t border-[#E4E6EA] dark:border-[#252A33] space-y-2.5">
                  <p className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                    Documents &amp; Profiles
                  </p>
                  <div className="flex flex-col space-y-2">
                    <a
                      href={PROFILE.interviewDeckPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors"
                    >
                      <FileText
                        className="w-4 h-4 text-[#B5381A] dark:text-[#F06A4A]"
                        aria-hidden="true"
                      />
                      <span>Executive Profile Presentation (PDF)</span>
                    </a>
                    <a
                      href={PROFILE.certificatesArchiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors"
                    >
                      <ExternalLink
                        className="w-4 h-4 text-[#525860] dark:text-[#949CA8]"
                        aria-hidden="true"
                      />
                      <span>Google Drive Certificates Folder</span>
                    </a>
                    <a
                      href={PROFILE.linkedinSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors"
                    >
                      <ExternalLink
                        className="w-4 h-4 text-[#525860] dark:text-[#949CA8]"
                        aria-hidden="true"
                      />
                      <span>LinkedIn: Ozan Olcay</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#FAFAFA] dark:bg-[#0C0E11] border border-[#E4E6EA] dark:border-[#252A33] rounded-xl p-7 lg:p-8">
                {submittedInquiry ? (
                  <div className="space-y-6" data-testid="inquiry-confirmation">
                    <div className="pb-5 border-b border-[#E4E6EA] dark:border-[#252A33]">
                      <p className="text-xs font-semibold text-[#B5381A] dark:text-[#F06A4A]">
                        Inquiry Ready
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]">
                        Thank you, {submittedInquiry.name}.
                      </h3>
                      <p className="mt-2 text-sm text-[#424850] dark:text-[#C2C8D1] leading-relaxed">
                        Your message details have been validated and prepared for{' '}
                        <span className="font-mono text-[#111315] dark:text-[#F2F4F7]">
                          {PROFILE.email}
                        </span>
                        . Use the button below to launch your email client with everything
                        pre-filled, or copy the address directly.
                      </p>
                    </div>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                          Topic
                        </dt>
                        <dd className="mt-0.5 text-[#111315] dark:text-[#F2F4F7]">
                          {submittedInquiry.topic}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                          Reply Email
                        </dt>
                        <dd className="mt-0.5 font-mono text-xs text-[#111315] dark:text-[#F2F4F7]">
                          {submittedInquiry.email}
                        </dd>
                      </div>
                      {submittedInquiry.organization && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                            Organization
                          </dt>
                          <dd className="mt-0.5 text-[#111315] dark:text-[#F2F4F7]">
                            {submittedInquiry.organization}
                          </dd>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-semibold text-[#525860] dark:text-[#949CA8]">
                          Message
                        </dt>
                        <dd className="mt-1 text-[#353A40] dark:text-[#D5DAE2] whitespace-pre-line">
                          {submittedInquiry.message}
                        </dd>
                      </div>
                    </dl>

                    <div className="pt-4 border-t border-[#E4E6EA] dark:border-[#252A33] flex flex-wrap items-center gap-3">
                      <a
                        href={buildMailtoHref(PROFILE.email, submittedInquiry)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>Open in Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2.5 text-sm font-medium text-[#111315] dark:text-[#F2F4F7] bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md hover:border-[#111315] dark:hover:border-[#6C7485] transition-colors whitespace-nowrap"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7]">
                        Send a Professional Inquiry
                      </h3>
                      <p className="mt-1 text-sm text-[#525860] dark:text-[#949CA8]">
                        Fields marked with an asterisk (*) are required.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inquiry-name"
                          className="block text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="inquiry-name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => {
                            setFormState((prev) => ({ ...prev, name: e.target.value }));
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md text-[#111315] dark:text-[#F2F4F7] placeholder:text-[#8A919B] dark:placeholder:text-[#7A8291] focus:outline-none focus:border-[#111315] dark:focus:border-[#8E96A4]"
                        />
                        {errors.name && (
                          <p
                            id="inquiry-name-error"
                            role="alert"
                            className="mt-1.5 text-xs text-[#B5381A] dark:text-[#F06A4A]"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-email"
                          className="block text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="inquiry-email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => {
                            setFormState((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md text-[#111315] dark:text-[#F2F4F7] placeholder:text-[#8A919B] dark:placeholder:text-[#7A8291] focus:outline-none focus:border-[#111315] dark:focus:border-[#8E96A4]"
                        />
                        {errors.email && (
                          <p
                            id="inquiry-email-error"
                            role="alert"
                            className="mt-1.5 text-xs text-[#B5381A] dark:text-[#F06A4A]"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inquiry-org"
                          className="block text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-1.5"
                        >
                          Organization
                        </label>
                        <input
                          id="inquiry-org"
                          name="organization"
                          type="text"
                          value={formState.organization}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, organization: e.target.value }))
                          }
                          placeholder="Company or team (optional)"
                          className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md text-[#111315] dark:text-[#F2F4F7] placeholder:text-[#8A919B] dark:placeholder:text-[#7A8291] focus:outline-none focus:border-[#111315] dark:focus:border-[#8E96A4]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-topic"
                          className="block text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-1.5"
                        >
                          Topic
                        </label>
                        <select
                          id="inquiry-topic"
                          name="topic"
                          value={formState.topic}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, topic: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md text-[#111315] dark:text-[#F2F4F7] focus:outline-none focus:border-[#111315] dark:focus:border-[#8E96A4]"
                        >
                          {TOPIC_OPTIONS.map((topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-message"
                        className="block text-xs font-semibold text-[#111315] dark:text-[#F2F4F7] mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="inquiry-message"
                        name="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => {
                          setFormState((prev) => ({ ...prev, message: e.target.value }));
                          if (errors.message)
                            setErrors((prev) => ({ ...prev, message: undefined }));
                        }}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                        placeholder="Share context about the role, operational challenge, or collaboration..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#13161B] border border-[#D4D8DF] dark:border-[#2F3542] rounded-md text-[#111315] dark:text-[#F2F4F7] placeholder:text-[#8A919B] dark:placeholder:text-[#7A8291] focus:outline-none focus:border-[#111315] dark:focus:border-[#8E96A4] resize-y"
                      />
                      {errors.message && (
                        <p
                          id="inquiry-message-error"
                          role="alert"
                          className="mt-1.5 text-xs text-[#B5381A] dark:text-[#F06A4A]"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-[#525860] dark:text-[#949CA8]">
                        Prepares a direct message addressed to {PROFILE.email}
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E4E6EA] dark:border-[#252A33] bg-[#FAFAFA] dark:bg-[#0C0E11] py-10 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#525860] dark:text-[#949CA8]">
          <p>
            © 2026 {PROFILE.fullName} · {PROFILE.location}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#projects"
              className="hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors"
            >
              Experience
            </a>
            <a
              href="#credentials"
              className="hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors"
            >
              Credentials
            </a>
            <a
              href={PROFILE.interviewDeckPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors"
            >
              Profile PDF
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
