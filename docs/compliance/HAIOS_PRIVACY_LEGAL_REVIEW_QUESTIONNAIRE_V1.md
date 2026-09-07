# HAIOS Privacy Legal Review Questionnaire V1

**Estado:** BORRADOR PARA ABOGADO / NO CERTIFICADO

**Objetivo:** entregar al abogado un cuestionario estructurado para revisar COPPA, CCPA/CPRA y GDPR antes de cualquier función que procese datos personales o información de menores.

## 1. Alcance del producto

- [ ] ¿Qué superficies de HAIOS son exclusivamente públicas y de solo lectura?
- [ ] ¿Qué superficies, si alguna, recopilan información personal?
- [ ] ¿Existe contenido dirigido a menores de 13 años o conocimiento real de usuarios menores de 13?
- [ ] ¿Existe segmentación por jurisdicción y edad?
- [ ] ¿Existe una base jurídica documentada por categoría de dato y finalidad?

## 2. COPPA

- [ ] Determinar si alguna superficie está dirigida a niños menores de 13 años o si existe conocimiento real de recopilación de datos de menores.
- [ ] Validar el mecanismo de aviso parental directo y la política de privacidad aplicable.
- [ ] Validar consentimiento parental verificable antes de recopilar, usar o divulgar información personal cuando corresponda.
- [ ] Revisar si existe publicidad dirigida, divulgación a terceros, retención, seguridad y mecanismos de eliminación.
- [ ] Revisar requisitos derivados de la regla COPPA modificada en 2025, incluyendo consentimiento separado para ciertos usos/divulgaciones a terceros cuando aplique.
- [ ] Documentar excepciones aplicables, si existen, y evidencia que las soporte.

Fuente oficial de referencia: https://www.ftc.gov/legal-library/browse/federal-register-notices/16-cfr-part-312-coppa-final-rule-amendments

## 3. CCPA / CPRA

- [ ] Confirmar si HAIOS califica como "business", "service provider" o "contractor" bajo CCPA.
- [ ] Mapear categorías de información personal y sensible.
- [ ] Revisar Notice at Collection, Privacy Policy, derechos de acceso/corrección/eliminación, opt-out de sale/sharing y limitación de información sensible.
- [ ] Revisar contratos con proveedores y terceros.
- [ ] Determinar si aplican obligaciones de evaluación de riesgo, auditorías de ciberseguridad o ADMT conforme a las reglas efectivas en 2026.
- [ ] Verificar manejo de señales de preferencia de opt-out cuando corresponda.

Fuentes oficiales de referencia:
- https://cppa.ca.gov/regulations/
- https://cppa.ca.gov/regulations/ccpa_updates.html

## 4. GDPR

- [ ] Determinar si GDPR aplica por oferta de bienes/servicios o monitoreo de personas en el EEE.
- [ ] Definir roles controller / processor / joint controller.
- [ ] Definir bases legales por finalidad.
- [ ] Verificar transparencia, minimización, limitación de finalidad, exactitud, retención y seguridad.
- [ ] Revisar derechos del interesado y mecanismos operativos para atender solicitudes.
- [ ] Revisar transferencias internacionales y mecanismos contractuales aplicables.
- [ ] Determinar si se requiere DPIA para funciones de alto riesgo.
- [ ] Revisar obligaciones relativas a decisiones automatizadas y perfilado.

Fuente oficial de referencia: https://eur-lex.europa.eu/eli/reg/2016/679/oj

## 5. Menores y protección reforzada

- [ ] Definir política de edad mínima por producto y jurisdicción.
- [ ] Separar pruebas sintéticas/adultos de cualquier entorno con datos reales de menores.
- [ ] Prohibir publicación de PII infantil en portal público, logs o evidencias.
- [ ] Definir escalamiento humano para incidentes de seguridad, abuso o protección infantil.

## 6. Dictamen solicitado al abogado

El abogado deberá clasificar cada punto como:

- APROBADO
- APROBADO CON CONDICIONES
- REQUIERE CAMBIO
- NO APLICA
- PENDIENTE EVIDENCIA

**Regla HAIOS:** LEGAL_REVIEWED no equivale a SECURITY_TESTED, RUNTIME_VERIFIED ni PLATFORM_APPROVED.
