import type { CertificateCategory, CertificateItem } from '../data/portfolioData';

export interface InquiryFormInput {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export function filterCertificates(
  certificates: CertificateItem[],
  category: CertificateCategory,
  rawQuery: string
): CertificateItem[] {
  const query = rawQuery.trim().toLowerCase();

  return certificates.filter((cert) => {
    const matchesCategory = category === 'all' || cert.category === category;
    if (!matchesCategory) {
      return false;
    }
    if (!query) {
      return true;
    }

    const haystack = [
      cert.title,
      cert.subtitle ?? '',
      cert.issuer,
      cert.issuerShort,
      cert.categoryLabel,
      cert.credentialId,
      cert.creditSummary,
      ...cert.skills,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getCertificateCategoryCounts(
  certificates: CertificateItem[]
): Record<CertificateCategory, number> {
  const counts: Record<CertificateCategory, number> = {
    all: certificates.length,
    'project-management': 0,
    'business-analysis': 0,
    'operational-excellence': 0,
    'supply-chain-ai': 0,
  };

  for (const cert of certificates) {
    counts[cert.category] += 1;
  }

  return counts;
}

export function formatCredentialIdPreview(credentialId: string): string {
  const trimmed = credentialId.trim();
  if (trimmed.length <= 24) {
    return trimmed;
  }
  return `${trimmed.slice(0, 14)}…${trimmed.slice(-8)}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (input.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (input.message.trim().length < 15) {
    errors.message = 'Please include a brief message (at least 15 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(recipientEmail: string, input: InquiryFormInput): string {
  const subject = `[Portfolio Inquiry] ${input.topic || 'Professional Collaboration'} — ${input.name.trim()}`;
  const orgLine = input.organization.trim()
    ? `Organization: ${input.organization.trim()}\n`
    : '';
  const body = `Hello Ozan,\n\n${input.message.trim()}\n\n---\nFrom: ${input.name.trim()}\nEmail: ${input.email.trim()}\n${orgLine}Topic: ${input.topic}`;

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
