# HAIOS Public Alpha CI Audit — 2026-09-07

**Estado:** CI VERIFIED FOR CANDIDATE / NO RUNTIME CERTIFICATION

## Scope
This record documents GitHub Actions run `34082466410` for PR #1 head `167a8515f10b1afc119534a3431aa268203fbd98`.

## Observed result
- Workflow: `HAIOS Public Alpha Gate and Deploy`
- Run number: `8`
- Run status: `completed`
- Run conclusion: `success`
- Verify job: `success`
- Deploy job: `skipped` (expected for Pull Request execution)

## Verify steps observed successful
1. Checkout
2. Setup Node
3. Syntax-check V24 control scripts
4. Verify V24 repository deployment preflight
5. Verify public-state guardrails
6. Verify legal-document integrity lock
7. Build explicit public artifact allowlist
8. Audit emitted public artifact

## Evidence emitted in logs
- Preflight: `PASS`
- Runtime: `UNKNOWN`
- Evidence level: `E1`
- V8: `BLOCKED`
- `runtime_verified: false`
- `deployment_authorized: false`
- Public-state guard: `VERIFY_PASS`
- Legal integrity: `PASS`
- Legal questionnaire SHA-256: `933024efb1562c90be369da49e9cfe55ab77078f4d3d9c71f653ccd1d1084e7e`
- Legal reviewed: `false`
- Platform approved: `false`
- Promotion allowed: `false`
- Public build output: `dist/public-alpha`
- Public build emitted exactly 7 allowlisted files
- Public distribution audit: `PASS`

## Interpretation
This run proves that the repository candidate passed its configured CI controls for the tested merge ref at the recorded time. It does **not** prove Cloudflare deployment, external HTTPS reachability, PocketBase integration, V7.2 runtime execution, legal compliance, external security certification, platform approval, or V8 readiness.

## Gate decision
Internal repository CI gate: **PASS**.
Cloudflare deployment gate: **NOT EXECUTED**.
External verification gate: **NOT EXECUTED**.
Runtime verified: **NO**.
V8: **BLOCKED**.
