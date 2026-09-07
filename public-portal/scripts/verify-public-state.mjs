import fs from 'node:fs';
import process from 'node:process';

function fail(message) {
  console.error(`VERIFY_FAIL: ${message}`);
  process.exit(1);
}

function readJson(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`invalid JSON at ${path}: ${error.message}`);
  }
}

const status = readJson('data/status.json');
const countries = readJson('data/countries.json');
const html = fs.readFileSync('index.html', 'utf8');

if (status.schema_version !== 'haios.public-state.v1') fail('unexpected public-state schema');
if (status.public_mode !== 'READ_ONLY') fail('public_mode must remain READ_ONLY');
if (status.runtime?.state !== 'UNKNOWN') fail('runtime must remain UNKNOWN in Alpha');
if (status.runtime?.evidence_level !== 'E1') fail('global EvidenceLevel must remain E1 in Alpha');
if (status.v8?.status !== 'BLOCKED') fail('V8 must remain BLOCKED');
if (status.v24_1_transition?.runtime_verified !== false) fail('runtime_verified must remain false');
if (status.country_live_state?.auto_promotes_evidence !== false) fail('country live state cannot auto-promote evidence');

const forbidden = [
  'RUNTIME_VERIFIED = YES',
  'RUNTIME_VERIFIED=YES',
  'EVIDENCELEVEL: E3',
  'EVIDENCELEVEL: E4',
  'PRODUCTION VERIFIED',
  'POCKETBASE PUBLIC',
  'PB_ADMIN_TOKEN',
  'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_ACCOUNT_ID'
];
for (const marker of forbidden) {
  if (html.toUpperCase().includes(marker.toUpperCase())) {
    fail(`forbidden public claim/secret marker found: ${marker}`);
  }
}

if (countries.schema_version !== 'haios.public-country-registry.v1') fail('unexpected country registry schema');
if (!Array.isArray(countries.nodes) || countries.nodes.length === 0) fail('country registry must contain design entries');

const seen = new Set();
for (const node of countries.nodes) {
  if (!/^[A-Z]{3}$/.test(node.iso3 || '')) fail('country node has invalid ISO3 identifier');
  if (seen.has(node.iso3)) fail(`duplicate country node: ${node.iso3}`);
  seen.add(node.iso3);
  if (node.runtime_state !== 'DESIGNED') fail(`country ${node.iso3} must remain DESIGNED in Public Alpha`);
  if (node.evidence_level !== 'E0') fail(`country ${node.iso3} must remain E0 until country-specific evidence exists`);
  if (node.brand_status !== 'UNVERIFIED') fail(`country ${node.iso3} brand status must remain UNVERIFIED`);
  if (!String(node.brand_assets || '').includes('UNVERIFIED')) fail(`country ${node.iso3} brand assets must remain UNVERIFIED`);
  if (!String(node.brand_assets || '').includes('approved_for_use:false')) fail(`country ${node.iso3} brand assets must not be approved for use`);
}

console.log('VERIFY_PASS: public portal guardrails preserved; global E1 does not promote illustrative country nodes beyond E0.');
