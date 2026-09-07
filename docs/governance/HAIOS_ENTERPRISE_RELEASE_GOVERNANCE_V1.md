# HAIOS Enterprise Release Governance V1

**Estado:** GOVERNANCE BASELINE / NO CERTIFICA RUNTIME

## Propósito
Establecer segregación de funciones, trazabilidad y criterios mínimos para cualquier promoción de HAIOS desde candidato documental hasta publicación o runtime verificado.

## Roles de liberación
- **Autoridad Humana Final:** aprueba o rechaza promociones materiales. La aprobación humana no sustituye evidencia técnica.
- **Engineering Owner:** prepara el cambio y evidencia reproducible; no puede autocertificar auditoría externa.
- **Security Reviewer:** revisa amenazas, secretos, autenticación, autorización y hallazgos; no otorga aprobación legal.
- **Privacy/Legal Reviewer:** emite dictamen jurídico cuando corresponda; no certifica seguridad ni runtime.
- **Release Operator:** ejecuta el mecanismo aprobado de publicación; no altera evidencia para obtener PASS.
- **Evidence/Audit Owner:** conserva hashes, resultados, conflictos y procedencia; no transforma observaciones en niveles probatorios superiores sin política satisfecha.

## Segregación de funciones
Una misma señal no puede significar simultáneamente aprobación legal, seguridad, plataforma y runtime. Los estados se mantienen independientes:

`LEGAL_REVIEWED != SECURITY_TESTED != PLATFORM_APPROVED != RUNTIME_VERIFIED`.

Ningún voto de IA, comentario, captura, HTTP 200 aislado o hash de archivo equivale por sí solo a RUNTIME_VERIFIED.

## Gates mínimos de Public Alpha
1. PR revisable y checks CI exitosos.
2. Artefacto público construido desde allowlist explícita.
3. Auditoría del directorio de despliegue sin secretos ni archivos internos.
4. V8 permanece BLOCKED.
5. Runtime global permanece UNKNOWN/E1 hasta evidencia posterior.
6. Despliegue Cloudflare únicamente manual desde `main` y sujeto a secretos externos de mínimo privilegio.
7. Verificación HTTPS externa posterior al despliegue antes de declarar PUBLIC LIVE ALPHA VERIFIED.

## Gestión de excepciones
Toda excepción debe registrar: identificador, motivo, alcance, riesgo, propietario, fecha de expiración, compensating controls y aprobación humana. Una excepción nunca puede elevar EvidenceLevel.

## Gestión de incidentes y rollback
Ante exposición de secretos, contenido no autorizado, corrupción de estado, conflicto material o fallo de seguridad: detener promoción, preservar evidencia, revocar/rotar credenciales afectadas, ejecutar rollback a artefacto conocido y abrir revisión humana.

## Retención y procedencia
Los resultados de CI, hashes, revisiones externas, decisiones humanas y evidencia de despliegue deben conservar fecha UTC, commit SHA, versión de herramienta y origen. Los documentos históricos permanecen históricos; una versión nueva no reescribe silenciosamente una anterior.

## Regla final
**La arquitectura puede adelantarse; el runtime nunca puede mentir.**
