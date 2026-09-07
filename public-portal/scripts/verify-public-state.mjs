import fs from "node:fs";
function fail(msg){console.error("VERIFY_FAIL:",msg);process.exit(1)}
const status=JSON.parse(fs.readFileSync("data/status.json","utf8"));
const html=fs.readFileSync("index.html","utf8");
const countries=JSON.parse(fs.readFileSync("data/countries.json","utf8"));
if(status.public_mode!=="READ_ONLY")fail("public_mode must remain READ_ONLY");
if(status.runtime?.state!=="UNKNOWN")fail("runtime must remain UNKNOWN in Alpha");
if(status.runtime?.evidence_level!=="E1")fail("EvidenceLevel must remain E1 in Alpha");
if(status.v8?.status!=="BLOCKED")fail("V8 must remain BLOCKED");
if(status.v24_1_transition?.runtime_verified!==false)fail("runtime_verified must remain false");
if(status.country_live_state?.auto_promotes_evidence!==false)fail("country live state cannot auto-promote evidence");
const forbidden=["RUNTIME_VERIFIED = YES","EVIDENCELEVEL: E3","EVIDENCELEVEL: E4","PRODUCTION VERIFIED","POCKETBASE PUBLIC","PB_ADMIN_TOKEN","CLOUDFLARE_API_TOKEN","CLOUDFLARE_ACCOUNT_ID"];
for(const x of forbidden){if(html.toUpperCase().includes(x.toUpperCase()))fail(`forbidden public claim/secret marker found: ${x}`)}
for(const n of countries.nodes||[]){if(!["UNKNOWN","DESIGNED","GENERATED"].includes(n.runtime_state))fail(`country ${n.iso3} has disallowed runtime_state ${n.runtime_state}`);if(n.brand_assets&&!n.brand_assets.includes("UNVERIFIED"))fail(`country ${n.iso3} brand assets must remain UNVERIFIED until reviewed`)}
console.log("VERIFY_PASS: public portal guardrails preserved.");
