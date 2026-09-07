# HAIOS Security External Audit Questionnaire V1

**Estado:** BORRADOR PARA AUDITOR / NO CERTIFICADO

## A. Arquitectura y superficie
- [ ] Inventariar activos, servicios, endpoints y fronteras de confianza.
- [ ] Confirmar que Public Alpha es read-only y no expone PocketBase ni secretos.
- [ ] Revisar separación Control Plane / Execution Layer / Commercial Layer.
- [ ] Confirmar que V8 continúa bloqueado hasta evidencia y autorización.

## B. Identidad y autorización
- [ ] Verificar autenticación criptográfica en producción; no aceptar headers declarativos como autoridad.
- [ ] RBAC deny-by-default y mínimo privilegio.
- [ ] Revocación, expiración, rotación y sesiones.
- [ ] MFA para operadores privilegiados.

## C. Secretos y criptografía
- [ ] Secretos únicamente en gestor/secret store; nunca repositorio, logs o snapshots.
- [ ] Rotación y separación dev/staging/prod.
- [ ] Validar algoritmos, parámetros, generación de nonce/IV, almacenamiento de claves y recuperación.
- [ ] Prohibir fingerprints derivados directamente de API keys como sustituto de atestación.

## D. Evidencia y auditoría
- [ ] Verificar canonicalización, hash, firma/atestación y persistencia.
- [ ] Confirmar que HTTP 200 no promociona automáticamente E3/E4.
- [ ] Probar tampering, replay, duplicados, concurrencia e idempotencia.
- [ ] Verificar Audit Ledger append-only o controles equivalentes.

## E. Aplicación / API
- [ ] Evaluar contra OWASP ASVS aplicable y threat model HAIOS.
- [ ] Validación de entrada, output encoding, CORS, CSP, CSRF cuando aplique.
- [ ] Rate limits, límites de tamaño, timeouts y manejo de errores.
- [ ] SSRF, IDOR/BOLA, inyección, traversal, deserialización y supply-chain.

## F. Infraestructura
- [ ] TLS, headers, DNS y configuración Cloudflare.
- [ ] PocketBase ligado a interfaz privada/local salvo decisión documentada.
- [ ] Backups, restauración, RPO/RTO y disaster recovery.
- [ ] CI/CD fail-closed, dependencias fijadas, SBOM y revisión de Actions.

## G. Evidencia requerida para cierre
Cada hallazgo debe contener severidad, activo, pasos reproducibles, evidencia, impacto, remediación y retest.

Clasificación final independiente:
- SECURITY_TESTED
- PEN_TESTED
- RUNTIME_VERIFIED
- PRODUCTION_CERTIFIED

Ninguna clasificación implica automáticamente las demás.

Referencia técnica: OWASP Application Security Verification Standard (ASVS), versión vigente al momento de la auditoría: https://owasp.org/www-project-application-security-verification-standard/
