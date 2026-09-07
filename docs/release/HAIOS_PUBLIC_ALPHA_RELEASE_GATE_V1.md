# HAIOS Public Alpha Release Gate V1

**Estado:** CANDIDATE / FAIL-CLOSED

## G0 — Baseline
- [x] V24 permanece FROZEN.
- [x] Runtime público declarado UNKNOWN.
- [x] EvidenceLevel público declarado E1.
- [x] V8 declarado BLOCKED.
- [x] RUNTIME_VERIFIED = NO.

## G1 — GitHub
- [x] Rama `public-alpha-candidate` separada de `main`.
- [x] Pull Request #1 en Draft.
- [x] Portal público read-only versionado.
- [x] Verificador fail-closed versionado.
- [x] Workflow de despliegue manual versionado.

## G2 — Legal / Privacy
- [x] Cuestionario COPPA/CCPA/GDPR preparado.
- [ ] Revisión por abogado completada.
- [ ] Cambios legales requeridos implementados.
- [ ] Dictamen/fecha/alcance registrados.

## G3 — Security
- [x] Cuestionario de auditoría externa preparado.
- [ ] Threat model revisado.
- [ ] Auditoría externa/pentest ejecutado si aplica.
- [ ] Hallazgos críticos/altos cerrados o aceptados formalmente.

## G4 — Cloudflare
- [ ] Cuenta/proyecto Pages confirmados.
- [ ] `CLOUDFLARE_ACCOUNT_ID` almacenado como GitHub Secret.
- [ ] `CLOUDFLARE_API_TOKEN` almacenado como GitHub Secret; nunca en chat/repo.
- [ ] Permisos mínimos del token revisados.
- [ ] Workflow manual ejecutado con éxito.
- [ ] URL HTTPS resultante registrada.

## G5 — Verificación externa
- [ ] HTTP/HTTPS observado desde Internet.
- [ ] Headers de seguridad observados.
- [ ] `status.json` coincide con guardrails.
- [ ] No hay secretos, PII ni endpoints privados expuestos.
- [ ] Enlaces y assets funcionan.

## G6 — Promoción
Solo después de G0–G5 puede considerarse cambiar el rótulo documental de `PUBLIC ALPHA CANDIDATE` a `PUBLIC LIVE ALPHA`.

**Prohibido:** usar el despliegue del frontend como evidencia de PocketBase, V7.2, V8, integraciones privadas, cumplimiento legal o certificación de seguridad.
