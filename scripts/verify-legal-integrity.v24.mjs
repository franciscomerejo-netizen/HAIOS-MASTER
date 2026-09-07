import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const LOCK_PATH = path.join(ROOT, 'docs', 'compliance', 'legal-integrity.lock.json');

function fail(code, message, extra = {}) {
  const result = {
    schema_version: 'haios.legal-integrity-check.v1',
    status: 'FAIL',
    conflict_code: code,
    message,
    evidence_level: 'E1',
    runtime_verified: false,
    promotion_allowed: false,
    checked_at: new Date().toISOString(),
    ...extra
  };
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

if (!fs.existsSync(LOCK_PATH)) {
  fail('FOLDER_MISMATCH', 'Legal integrity lock file is missing.');
}

let lock;
try {
  lock = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf8'));
} catch (error) {
  fail('SCHEMA_CONFLICT', 'Legal integrity lock file is not valid JSON.', { error: error.message });
}

if (lock.schema_version !== 'haios.legal-integrity-lock.v1') {
  fail('SCHEMA_CONFLICT', 'Unexpected legal integrity lock schema version.');
}

if (lock.status !== 'BORRADOR PARA ABOGADO / NO CERTIFICADO') {
  fail('STATE_CONFLICT', 'Legal document status must remain BORRADOR PARA ABOGADO / NO CERTIFICADO.');
}

if (lock.evidence_level !== 'E1' || lock.runtime_verified !== false || lock.promotion_allowed !== false) {
  fail('EVIDENCE_CONFLICT', 'Legal lock attempts to promote evidence or runtime status.');
}

const legalPath = path.resolve(ROOT, lock.document_path);
if (!legalPath.startsWith(ROOT + path.sep)) {
  fail('PATH_CONFLICT', 'Legal document path escapes repository root.');
}
if (!fs.existsSync(legalPath)) {
  fail('FOLDER_MISMATCH', 'Locked legal document is missing.', { document_path: lock.document_path });
}

const bytes = fs.readFileSync(legalPath);
const computed = crypto.createHash('sha256').update(bytes).digest('hex');
const expected = String(lock.sha256 || '').toLowerCase();

if (!/^[a-f0-9]{64}$/.test(expected)) {
  fail('SCHEMA_CONFLICT', 'Expected SHA-256 in lock is malformed.');
}

if (computed !== expected) {
  fail('HASH_MISMATCH', 'Legal document SHA-256 does not match the frozen lock.', {
    document_path: lock.document_path,
    expected_sha256: expected,
    computed_sha256: computed
  });
}

const text = bytes.toString('utf8');
const forbiddenClaims = [
  /\bLEGAL_REVIEWED\s*=\s*(YES|TRUE)\b/i,
  /\bRUNTIME_VERIFIED\s*=\s*(YES|TRUE)\b/i,
  /\bPLATFORM_APPROVED\s*=\s*(YES|TRUE)\b/i,
  /\bSECURITY_TESTED\s*=\s*(YES|TRUE)\b/i
];
for (const pattern of forbiddenClaims) {
  if (pattern.test(text)) {
    fail('FORBIDDEN_PROMOTION_CLAIM', 'Legal draft contains a forbidden certification/promotion claim.');
  }
}

const result = {
  schema_version: 'haios.legal-integrity-check.v1',
  status: 'PASS',
  conflict_code: null,
  document_path: lock.document_path,
  sha256: computed,
  evidence_level: 'E1',
  legal_reviewed: false,
  runtime_verified: false,
  platform_approved: false,
  promotion_allowed: false,
  checked_at: new Date().toISOString()
};

console.log(JSON.stringify(result, null, 2));
