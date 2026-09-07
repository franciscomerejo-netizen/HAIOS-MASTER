# HAIOS Public Live Alpha V1

Portal público estático y de solo lectura.

## Estado autorizado

- Runtime: `UNKNOWN`
- EvidenceLevel: `E1`
- V8: `BLOCKED`
- PocketBase público: `NO`
- `RUNTIME_VERIFIED`: `NO`
- Regulación: `BORRADOR PARA ABOGADO / NO CERTIFICADO`

## Despliegue

El workflow raíz `.github/workflows/deploy-pages.yml` es deliberadamente manual (`workflow_dispatch`) mientras no estén configurados los secretos de Cloudflare. Primero ejecuta `scripts/verify-public-state.mjs`; solo después puede intentar el deploy.

Secretos requeridos en GitHub Actions, nunca en archivos:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

No se debe afirmar `PUBLIC LIVE ALPHA VERIFIED` hasta verificar externamente HTTPS, contenido y cabeceras después del despliegue.
