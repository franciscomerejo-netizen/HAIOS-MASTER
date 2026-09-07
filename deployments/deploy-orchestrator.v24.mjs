import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const requiredFiles = [
  'public-portal/index.html',
  'public-portal/data/status.json',
  'public-portal/data/countries.json',
  'public-portal/scripts/verify-public-state.mjs',
  'scripts/verify-legal-integrity.v24.mjs',
  'docs/compliance/legal-integrity.lock.json',
  'docs/compliance/HAIOS_PRIVACY_LEGAL_REVIEW_QUESTIONNAIRE_V1.md',
  'docs/security/HAIOS_SECURITY_EXTERNAL_AUDIT_QUESTIONNAIRE_V1.md',
  'docs/release/HAIOS_PUBLIC_ALPHA_RELEASE_GATE_V1.md',
  '.github/workflows/deploy-pages.yml'
];

function fail(code, message, detail = {}) {
  console.error(JSON.stringify({
    schema_version: 'haios.deploy-preflight.v24',
    status: 'BLOCKED',
    conflict_code: code,
    message,
    runtime: 'UNKNOWN',
    evidence_level: 'E1',
    v8: 'BLOCKED',
    runtime_verified: false,
    deployment_authorized: false,
    checked_at: new Date().toISOString(),
    ...detail
  }, null, 2));
  process.exit(1);
}

for (const relativePath of requiredFiles) {
  const full = path.join(ROOT, relativePath);
  if (!fs.existsSync(full)) {
    fail('FOLDER_MISMATCH', 'Required repository artifact is missing.', { path: relativePath });
  }
}

const status = JSON.parse(fs.readFileSync(path.join(ROOT, 'public-portal/data/status.json'), 'utf8'));
if (status.runtime !== 'UNKNOWN' || status.evidence_level !== 'E1' || status.v8 !== 'BLOCKED' || status.runtime_verified !== false) {
  fail('STATE_CONFLICT', 'Public state violates the frozen V24 publication contract.');
}

const legalLock = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/compliance/legal-integrity.lock.json'), 'utf8'));
if (legalLock.promotion_allowed !== false || legalLock.runtime_verified !== false || legalLock.evidence_level !== 'E1') {
  fail('EVIDENCE_CONFLICT', 'Legal integrity lock attempts to promote authority.');
}

console.log(JSON.stringify({
  schema_version: 'haios.deploy-preflight.v24',
  status: 'PASS',
  runtime: 'UNKNOWN',
  evidence_level: 'E1',
  v8: 'BLOCKED',
  runtime_verified: false,
  deployment_authorized: false,
  next_gate: 'CLOUDFLARE_SECRETS_AND_MANUAL_WORKFLOW',
  note: 'PASS means repository preflight only. It does not deploy, certify runtime, or approve legal/security compliance.',
  checked_at: new Date().toISOString()
}, null, 2));
