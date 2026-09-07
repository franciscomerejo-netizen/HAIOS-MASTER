import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const OUT = path.join(process.cwd(), 'dist', 'public-alpha');
const allowed = new Set([
  'index.html', '_headers', '_redirects',
  'assets/styles.css', 'assets/app.js',
  'data/status.json', 'data/countries.json'
]);

function walk(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full, base) : [path.relative(base, full).replaceAll('\\', '/')];
  });
}

if (!fs.existsSync(OUT)) {
  console.error('DIST_AUDIT_FAIL: dist/public-alpha does not exist');
  process.exit(1);
}

const files = walk(OUT).sort();
for (const file of files) {
  if (!allowed.has(file)) {
    console.error(`DIST_AUDIT_FAIL: non-whitelisted file emitted: ${file}`);
    process.exit(1);
  }
}
for (const file of allowed) {
  if (!files.includes(file)) {
    console.error(`DIST_AUDIT_FAIL: required file missing: ${file}`);
    process.exit(1);
  }
}

const text = files
  .filter((file) => !file.endsWith('.json') || true)
  .map((file) => fs.readFileSync(path.join(OUT, file), 'utf8'))
  .join('\n');

const forbidden = [
  /PB_ADMIN_TOKEN/i,
  /CLOUDFLARE_API_TOKEN/i,
  /CLOUDFLARE_ACCOUNT_ID/i,
  /BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/i,
  /RUNTIME_VERIFIED\s*[:=]\s*(YES|TRUE)/i,
  /PRODUCTION\s+VERIFIED/i
];
for (const pattern of forbidden) {
  if (pattern.test(text)) {
    console.error(`DIST_AUDIT_FAIL: forbidden marker matched ${pattern}`);
    process.exit(1);
  }
}

console.log(JSON.stringify({
  schema_version: 'haios.public-dist-audit.v1',
  status: 'PASS',
  file_count: files.length,
  files,
  runtime_verified: false,
  note: 'PASS validates only the deployment artifact allowlist and basic forbidden markers.'
}, null, 2));
