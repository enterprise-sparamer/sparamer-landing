# Zoho CRM Blueprint para Sparamer Landing

## Objetivo

Integrar la encuesta de [components/sections/Diagnostico.tsx](../components/sections/Diagnostico.tsx) con Zoho CRM para que cada envío:

1. actualice o cree un `Lead` por e-mail,
2. guarde el histórico completo del diagnóstico en un módulo custom,
3. permita segmentación operativa por urgencia, stack y recomendación.

La integración se implementará desde el backend de [app/api/diagnostic/route.ts](../app/api/diagnostic/route.ts). El navegador no debe hablar con Zoho directamente.

## Decisión recomendada

### Opción elegida

- Módulo estándar `Leads` para la identidad del prospecto.
- Módulo custom `Diagnostic_Submissions` para el histórico de cada encuesta.
- OAuth con `Self Client` de Zoho.

### Por qué esta opción

- `Leads` encaja mejor que `Contacts` para captación inbound inicial.
- Un módulo custom evita meter todo el histórico en `Description` o `Notes`.
- `Self Client` es la opción correcta cuando el sitio pertenece a una sola cuenta Zoho y no habrá usuarios externos autorizando la app.

### Cuándo cambiar esta decisión

- Usa `Server-based application` si en el futuro varias cuentas Zoho distintas van a conectar este sitio.
- Usa `Contacts` como entidad principal si el proceso comercial ya considera todo inbound como contacto consolidado y no como lead por calificar.
- Usa solo `Leads + Notes` si quieres un MVP muy corto y aceptas perder estructura analítica.

## Flujo exacto

```text
Usuario responde encuesta
  -> POST /api/diagnostic
  -> backend valida payload
  -> backend recalcula recommendation
  -> backend refresca access token de Zoho
  -> backend busca Lead por Email
  -> backend crea o actualiza Lead
  -> backend crea Diagnostic_Submissions relacionado al Lead
  -> backend responde { ok: true }
```

## Diseño exacto de CRM

## 1. Módulo estándar: Leads

### Campos estándar usados

| Campo Zoho | API name | Tipo | Uso |
| --- | --- | --- | --- |
| Apellido | `Last_Name` | Single Line | Obligatorio. Se derivará del e-mail si el usuario no entrega nombre. |
| E-mail | `Email` | Email | Clave de deduplicación principal. |
| Lead Source | `Lead_Source` | Picklist | Valor fijo: `Website - Diagnostico`. |
| Descripción | `Description` | Multi Line | Resumen corto del último diagnóstico. |

### Campos custom recomendados en Leads

| Etiqueta | API name | Tipo | Valores / formato | Motivo |
| --- | --- | --- | --- | --- |
| Latest Diagnostic Goal | `Latest_Diagnostic_Goal` | Picklist | `vender`, `centralizar`, `escalar`, `lancar` | Filtrar por objetivo actual. |
| Latest Diagnostic Urgency | `Latest_Diagnostic_Urgency` | Picklist | `urgente`, `trimestre`, `estrategico` | Priorización comercial. |
| Latest Diagnostic Stack | `Latest_Diagnostic_Stack` | Picklist | `zoho`, `discord`, `varios`, `zero` | Routing técnico. |
| Latest Diagnostic Service | `Latest_Diagnostic_Service` | Single Line | texto libre | Mostrar recomendación actual en vistas. |
| Latest Diagnostic Slug | `Latest_Diagnostic_Slug` | Picklist | `zoho`, `discord`, `automacoes`, `geral` | Segmentación simple. |
| Latest Diagnostic At | `Latest_Diagnostic_At` | DateTime | ISO 8601 | Saber cuándo fue el último envío. |

### Reglas de negocio en Leads

- Deduplicación por `Email`.
- Si ya existe lead con ese e-mail, se actualizan solo los campos `Latest_*` y `Description`.
- No se crea `Deal` automáticamente en esta fase.
- `Last_Name` se deriva así:
  - si luego el formulario de contacto ya tiene nombre real, se reemplaza,
  - mientras tanto usar el local-part del e-mail capitalizado, o `Site` si no se puede derivar bien.

### Valor exacto recomendado para `Lead_Source`

Agregar este valor a la picklist estándar:

```text
Website - Diagnostico
```

## 2. Módulo custom: Diagnostic_Submissions

### Configuración del módulo

- Label singular: `Diagnostic Submission`
- Label plural: `Diagnostic Submissions`
- API name: `Diagnostic_Submissions`
- Display field API name: `Submission_Name`

### Campos exactos

| Etiqueta | API name | Tipo | Valores / formato | Obligatorio |
| --- | --- | --- | --- | --- |
| Submission Name | `Submission_Name` | Single Line | `diag-YYYYMMDD-HHmmss-email` | Sí |
| Lead | `Lead_Record` | Lookup -> Leads | ID de lead | Sí |
| Email | `Email` | Email | e-mail enviado | Sí |
| Goal | `Goal` | Picklist | `vender`, `centralizar`, `escalar`, `lancar` | Sí |
| Urgency | `Urgency` | Picklist | `urgente`, `trimestre`, `estrategico` | Sí |
| Stack | `Stack` | Picklist | `zoho`, `discord`, `varios`, `zero` | Sí |
| Recommended Service | `Recommended_Service` | Single Line | texto libre | Sí |
| Recommended Tag | `Recommended_Tag` | Single Line | texto libre | Sí |
| Recommended Scope | `Recommended_Scope` | Single Line | texto libre | Sí |
| Recommended Slug | `Recommended_Slug` | Picklist | `zoho`, `discord`, `automacoes`, `geral` | Sí |
| Recommended Involves | `Recommended_Involves` | Multi Line | texto libre | Sí |
| Source Page | `Source_Page` | Picklist | `home`, `consulta` | Sí |
| Source URL | `Source_URL` | URL | URL completa | No |
| Submitted At | `Submitted_At` | DateTime | ISO 8601 | Sí |
| Payload Version | `Payload_Version` | Single Line | `2026-01` | Sí |
| Raw Payload JSON | `Raw_Payload_JSON` | Multi Line (Large) | JSON serializado | No |
| UTM Source | `UTM_Source` | Single Line | texto libre | No |
| UTM Medium | `UTM_Medium` | Single Line | texto libre | No |
| UTM Campaign | `UTM_Campaign` | Single Line | texto libre | No |
| Referrer | `Referrer` | URL | URL de referencia | No |

### Reglas de negocio del módulo custom

- Se crea un registro por cada envío exitoso.
- No se deduplica.
- Este módulo es la fuente de verdad histórica.
- La relación con `Leads` permite ver todos los diagnósticos desde el lead.

## Mapeo exacto desde la encuesta

### Payload de entrada actual

La encuesta actual manda:

```json
{
  "email": "voce@empresa.com",
  "answers": {
    "goal": "vender",
    "urgency": "urgente",
    "stack": "zoho"
  },
  "recommendation": {
    "service": "Zoho Ecosystem — pipeline comercial sob esteróides",
    "tag": "Zoho CRM · Flow · Books",
    "scope": "3–6 semanas",
    "involves": "...",
    "servicoSlug": "zoho"
  },
  "ts": 1715820000000
}
```

### Regla recomendada en backend

- Ignorar `recommendation` del cliente como fuente de verdad.
- Recalcular `recommendation` en servidor usando la misma matriz del frontend.
- Persistir en Zoho solo datos validados y recalculados en servidor.

### Mapeo a Leads

| Dato app | Campo Zoho |
| --- | --- |
| `email` | `Email` |
| `answers.goal` | `Latest_Diagnostic_Goal` |
| `answers.urgency` | `Latest_Diagnostic_Urgency` |
| `answers.stack` | `Latest_Diagnostic_Stack` |
| `recommendation.service` | `Latest_Diagnostic_Service` |
| `recommendation.servicoSlug` | `Latest_Diagnostic_Slug` |
| `ts` | `Latest_Diagnostic_At` |

### Mapeo a Diagnostic_Submissions

| Dato app | Campo Zoho |
| --- | --- |
| `email` | `Email` |
| `answers.goal` | `Goal` |
| `answers.urgency` | `Urgency` |
| `answers.stack` | `Stack` |
| `recommendation.service` | `Recommended_Service` |
| `recommendation.tag` | `Recommended_Tag` |
| `recommendation.scope` | `Recommended_Scope` |
| `recommendation.servicoSlug` | `Recommended_Slug` |
| `recommendation.involves` | `Recommended_Involves` |
| ruta actual (`/` o `/consulta`) | `Source_Page` |
| URL absoluta | `Source_URL` |
| `ts` | `Submitted_At` |
| payload serializado | `Raw_Payload_JSON` |

## Inicialización exacta en Zoho

## Paso 1. Crear el modelo CRM

1. En `Setup -> Customisation -> Modules and Fields`, abre `Leads`.
2. Añade los 6 campos custom `Latest_*` definidos arriba.
3. Agrega el valor `Website - Diagnostico` a `Lead_Source`.
4. Confirma que el layout de `Leads` no tenga `Company` como obligatorio si esta encuesta no lo va a enviar.
5. Crea el módulo custom `Diagnostic_Submissions`.
6. Crea los campos exactos definidos en la tabla anterior.
7. Crea la relación `Lead_Record` como lookup hacia `Leads`.

## Paso 2. Elegir tipo de cliente OAuth

### Recomendado para este repo: Self Client

Usa `Self Client` si se cumplen estas condiciones:

- el sitio pertenece a una sola empresa,
- solo una cuenta Zoho va a recibir los leads,
- no habrá botón `Login with Zoho` para clientes finales,
- la integración vive solo en backend.

### No recomendado aquí: Server-based application

Úsalo solo si distintas cuentas Zoho externas van a conectar su propio CRM a la app.

## Paso 3. Crear el cliente en Zoho

1. Ve a `https://api-console.zoho.com/`.
2. Crea un cliente de tipo `Self Client`.
3. Copia `Client ID` y `Client Secret`.
4. En la pestaña `Generate Code`, solicita un grant token con estos scopes mínimos:

```text
ZohoCRM.modules.leads.READ,
ZohoCRM.modules.leads.CREATE,
ZohoCRM.modules.leads.UPDATE,
ZohoCRM.modules.custom.CREATE,
ZohoCRM.modules.custom.READ
```

Si más adelante decides crear `Notes`, agrega:

```text
ZohoCRM.modules.notes.CREATE
```

## Paso 4. Generar refresh token

Con el grant token recién creado, ejecuta:

```bash
curl -X POST "https://accounts.zoho.com/oauth/v2/token" \
  -d "grant_type=authorization_code" \
  -d "client_id=TU_CLIENT_ID" \
  -d "client_secret=TU_CLIENT_SECRET" \
  -d "code=TU_GRANT_TOKEN"
```

### Si tu cuenta no está en US

Sustituye `https://accounts.zoho.com` por tu dominio real:

- EU: `https://accounts.zoho.eu`
- AU: `https://accounts.zoho.com.au`
- IN: `https://accounts.zoho.in`
- JP: `https://accounts.zoho.jp`
- CA: `https://accounts.zohocloud.ca`

### Resultado esperado

Zoho devuelve:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "api_domain": "https://www.zohoapis.com",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

Guardar:

- `refresh_token`
- `api_domain`
- el `accounts` domain que corresponde a tu DC

## Paso 5. Registrar secrets en Fly

En este proyecto, los secretos a configurar son:

```bash
flyctl secrets set \
  ZOHO_ACCOUNTS_DOMAIN=https://accounts.zoho.com \
  ZOHO_API_DOMAIN=https://www.zohoapis.com \
  ZOHO_CLIENT_ID=... \
  ZOHO_CLIENT_SECRET=... \
  ZOHO_REFRESH_TOKEN=... \
  ZOHO_LEADS_MODULE=Leads \
  ZOHO_DIAGNOSTIC_MODULE=Diagnostic_Submissions \
  ZOHO_LEAD_SOURCE_VALUE="Website - Diagnostico" \
  -a sparamer-landing
```

## Paso 6. Verificación manual antes de programar

Antes de escribir la integración, conviene validar tres cosas desde Zoho:

1. que el `api_domain` sea correcto,
2. que los nombres API de campos y módulo coincidan exactamente,
3. que el usuario OAuth tenga permisos para crear y actualizar en `Leads` y el módulo custom.

## Decisiones que sí debes tomar conscientemente

## 1. Lead o Contact

### Elige `Lead` si:

- este envío es captación inicial,
- aún no pasó por calificación comercial,
- quieres separar inbound frío de clientes/relaciones activas.

### Elige `Contact` si:

- todo el inbound ya entra a una base madura y no manejas fase de calificación.

Para este sitio, `Lead` es la mejor decisión.

## 2. Solo Leads o Leads + módulo custom

### Solo Leads

- más rápido de montar,
- menos estructura,
- peor historial y peores reportes.

### Leads + módulo custom

- permite múltiples envíos por persona,
- soporta reporting real,
- evita sobrecargar `Description`.

Para este sitio, `Leads + Diagnostic_Submissions` es la mejor decisión.

## 3. Picklists con códigos o con etiquetas legibles

### Recomendación

Guardar valores canónicos iguales a la app:

- `vender`
- `centralizar`
- `escalar`
- `lancar`
- `urgente`
- `trimestre`
- `estrategico`
- `zoho`
- `discord`
- `varios`
- `zero`

### Motivo

- evita tablas de traducción en la primera versión,
- mantiene el backend simple,
- reduce errores de mapeo.

Si luego quieres vistas más comerciales, puedes mostrar etiquetas más amigables en reportes o renombrar valores después.

## Siguiente implementación en el repo

Cuando se pase a código, el orden recomendado es:

1. mover `recommend()` a una utilidad compartida de servidor,
2. crear cliente OAuth de Zoho en `lib/zoho/*`,
3. actualizar [app/api/diagnostic/route.ts](../app/api/diagnostic/route.ts) para crear/actualizar Zoho,
4. opcionalmente migrar también [components/sections/CTAForm.tsx](../components/sections/CTAForm.tsx) a un endpoint backend y no `mailto:`.

## Variables de entorno de este proyecto

Estas variables ya están previstas en [.env.example](../.env.example):

```env
ZOHO_ACCOUNTS_DOMAIN=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_LEADS_MODULE=Leads
ZOHO_DIAGNOSTIC_MODULE=Diagnostic_Submissions
ZOHO_LEAD_SOURCE_VALUE=Website - Diagnostico
```