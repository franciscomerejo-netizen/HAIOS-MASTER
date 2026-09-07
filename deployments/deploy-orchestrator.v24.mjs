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

function emitAndExit(status, code, message, detail = {}, exitCode = 1) {
  const payload = {
    schema_version: 'haios.deploy-preflight.v24',
    status,
    conflict_code: code,
    message,
    runtime: 'UNKNOWN',
    evidence_level: 'E1',
    v8: 'BLOCKED',
    runtime_verified: false,
    deployment_authorized: false,
    checked_at: new Date().toISOString(),
    ...detail
  };
  const text = JSON.stringify(payload, null, 2);
  if (exitCode === 0) console.log(text); else console.error(text);
  process.exit(exitCode);
}

function readJson(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    emitAndExit('BLOCKED', 'SCHEMA_CONFLICT', `Invalid JSON: ${relativePath}`, { error: error.message });
  }
}

for (const relativePath of requiredFiles) {
  const fullPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(fullPath)) {
    emitAndExit('BLOCKED', 'FOLDER_MISMATCH', 'Required repository artifact is missing.', { path: relativePath });
  }
}

const status = readJson('public-portal/data/status.json');

if (status.schema_version !== 'haios.public-state.v1') {
  emitAndExit('BLOCKED', 'SCHEMA_CONFLICT', 'Unexpected public-state schema version.');
}
if (status.public_mode !== 'READ_ONLY') {
  emitAndExit('BLOCKED', 'STATE_CONFLICT', 'public_mode must remain READ_ONLY.');
}
if (status.runtime?.state !== 'UNKNOWN') {
  emitAndExit('BLOCKED', 'STATE_CONFLICT', 'Runtime must remain UNKNOWN for Public Alpha candidate.');
}
if (status.runtime?.evidence_level !== 'E1') {
  emitAndExit('BLOCKED', 'EVIDENCE_CONFLICT', 'Evidence level must remain E1 for Public Alpha candidate.');
}
if (status.v8?.status !== 'BLOCKED') {
  emitAndExit('BLOCKED', 'STATE_CONFLICT', 'V8 must remain BLOCKED.');
}
if (status.v24_1_transition?.runtime_verified !== false) {
  emitAndExit('BLOCKED', 'EVIDENCE_CONFLICT', 'runtime_verified must remain false.');
}
if (status.country_live_state?.auto_promotes_evidence !== false) {
  emitAndExit('BLOCKED', 'EVIDENCE_CONFLICT', 'Country live state must not auto-promote evidence.');
}

const legalLock = readJson('docs/compliance/legal-integrity.lock.json');
if (legalLock.schema_version !== 'haios.legal-integrity-lock.v1') {
  emitAndExit('BLOCKED', 'SCHEMA_CONFLICT', 'Unexpected legal-integrity lock schema version.');
}
if (legalLock.status !== 'BORRADOR PARA ABOGADO / NO CERTIFICADO') {
  emitAndExit('BLOCKED', 'STATE_CONFLICT', 'Legal document must remain non-certified draft.');
}
if (
  legalLock.promotion_allowed !== false ||
  legalLock.runtime_verified !== false ||
  legalLock.evidence_level !== 'E1' ||
  legalLock.legal_reviewed !== false ||
  legalLock.platform_approved !== false
) {
  emitAndExit('BLOCKED', 'EVIDENCE_CONFLICT', 'Legal integrity lock attempts to promote authority.');
}

emitAndExit(
  'PASS',
  null,
  'Repository preflight passed. No runtime, legal, security, platform, or deployment certification is implied.',
  { next_gate: 'CLOUDFLARE_SECRETS_AND_MANUAL_WORKFLOW' },
  0
);
