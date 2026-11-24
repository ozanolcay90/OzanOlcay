import test from 'node:test';
import assert from 'node:assert/strict';
import { CERTIFICATES } from '../data/portfolioData';
import {
  buildMailtoHref,
  filterCertificates,
  formatCredentialIdPreview,
  getCertificateCategoryCounts,
  validateInquiry,
} from './portfolioLogic';

test('getCertificateCategoryCounts totals all 11 credentials accurately', () => {
  const counts = getCertificateCategoryCounts(CERTIFICATES);
  assert.equal(counts.all, 11);
  assert.equal(counts['project-management'], 4);
  assert.equal(counts['business-analysis'], 3);
  assert.equal(counts['operational-excellence'], 2);
  assert.equal(counts['supply-chain-ai'], 2);
});

test('filterCertificates filters by category and case-insensitive search query', () => {
  const baCerts = filterCertificates(CERTIFICATES, 'business-analysis', '');
  assert.equal(baCerts.length, 3);
  assert.ok(baCerts.every((c) => c.category === 'business-analysis'));

  const sixSigma = filterCertificates(CERTIFICATES, 'all', 'six sigma');
  assert.equal(sixSigma.length, 1);
  assert.equal(sixSigma[0].id, 'six-sigma');

  const byCredentialId = filterCertificates(CERTIFICATES, 'all', 'UN_0410653924785756650');
  assert.equal(byCredentialId.length, 1);
  assert.equal(byCredentialId[0].id, 'ai-supply-chain');

  const noMatch = filterCertificates(CERTIFICATES, 'operational-excellence', 'ethics');
  assert.equal(noMatch.length, 0);
});

test('formatCredentialIdPreview shortens long SHA hashes while preserving short IDs', () => {
  assert.equal(formatCredentialIdPreview('UN_0410653924785756650'), 'UN_0410653924785756650');
  const hash = 'd4667a5a3a414216b4126c639bf84c50a255772f0722aa3f617dc6e7e31faf7d';
  const preview = formatCredentialIdPreview(hash);
  assert.equal(preview, 'd4667a5a3a4142…e31faf7d');
});

test('validateInquiry catches invalid fields and approves complete submissions', () => {
  const emptyResult = validateInquiry({
    name: '',
    email: 'invalid-email',
    organization: '',
    topic: 'Logistics Advisory',
    message: 'Hi',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const validResult = validateInquiry({
    name: 'Mert Kaya',
    email: 'mert.kaya@example.com',
    organization: 'BSH REM Region',
    topic: 'REM Region Logistics Opportunity',
    message: 'We would love to discuss your experience building L.O.T. and Sirius.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoHref encodes recipient, subject, and body cleanly', () => {
  const href = buildMailtoHref('ozanolcay90@gmail.com', {
    name: 'Mert Kaya',
    email: 'mert.kaya@example.com',
    organization: 'BSH',
    topic: 'Control Tower Advisory',
    message: 'Let us connect next Tuesday to review L.O.T. architecture.',
  });
  assert.ok(href.startsWith('mailto:ozanolcay90@gmail.com?subject='));
  assert.ok(href.includes(encodeURIComponent('Control Tower Advisory')));
  assert.ok(href.includes(encodeURIComponent('Organization: BSH')));
});
