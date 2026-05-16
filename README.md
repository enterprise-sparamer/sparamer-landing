# Sparamer Landing

This repository contains the Sparamer marketing site, built with Next.js and deployed on Fly.io.

The project uses:

- Fly.io for hosting and deployment
- GoDaddy for DNS management
- Zoho CRM Webforms for lead capture

## Why Fly.io

We chose Fly.io for three practical reasons:

- São Paulo region support via `gru`, which fits the deployment and latency requirements for Brazil
- straightforward deployment flow for a Next.js application
- pay-as-you-go pricing, which is a good fit for a lean production setup

The current Fly application is configured through [fly.toml](fly.toml).

## Project Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build locally:

```bash
npm run build
```

## Fly.io Deployment Flow

This is the deployment flow used for this project.

### 1. Install Fly CLI

Install `flyctl` from the official Fly.io instructions:

```bash
flyctl version
```

Verify the CLI is available before continuing.

### 2. Authenticate your Fly.io user

Log in with your Fly.io account:

```bash
flyctl auth login
```

### 3. Add domain certificates in Fly.io

After the Fly application already exists, add both hostnames to the app:

```bash
flyctl certs add sparamer.com -a sparamer-landing
flyctl certs add www.sparamer.com -a sparamer-landing
```

This step is important because Fly returns the DNS information required for the domain setup.

You can also re-check the setup instructions at any time with:

```bash
flyctl certs setup sparamer.com -a sparamer-landing
flyctl certs setup www.sparamer.com -a sparamer-landing
```

And verify certificate status with:

```bash
flyctl certs check sparamer.com -a sparamer-landing
flyctl certs check www.sparamer.com -a sparamer-landing
```

### 4. Add DNS records in GoDaddy

Take the DNS values returned by `flyctl certs add` or `flyctl certs setup` and configure them in GoDaddy.

For this project, the Fly.io setup resolved to standard apex records:

- `A` record for the root domain
- `AAAA` record for the root domain

Example values used in this deployment:

- `A` -> `66.241.125.198`
- `AAAA` -> `2a09:8280:1::114:e20b:0`

In GoDaddy, the usual configuration is:

- host `@` -> `A` record
- host `@` -> `AAAA` record
- `www` configured according to the Fly output for `www.sparamer.com`

Important: always trust the output from Fly for the final DNS values, since that is the source of truth for the certificate setup.

### 5. Connect the Fly app to the repository and enable automatic deploys

Once DNS and certificates are configured, go to the Fly.io dashboard for the existing project and:

1. open the application settings
2. connect the repository
3. enable automatic deployments

This allows Fly.io to deploy automatically after changes are pushed through the connected repository workflow.

## Zoho CRM Webform Integration

This project uses a Zoho CRM Webform as the lead destination, while keeping the Sparamer visual design in the frontend.

The website does not embed the default Zoho form UI directly. Instead:

- the site keeps the current Sparamer-designed experience
- the backend relays the submission to Zoho WebToLead

### 6. Create the required lead fields and generate the Zoho Webform

In Zoho CRM:

1. create the required fields in the Leads module
2. create the lead flow needed for the campaign
3. generate the Webform

The project currently expects the Webform to provide the hidden values required by Zoho WebToLead, such as:

- `xnQsjsdp`
- `xmIwtLD`
- `actionType`
- `returnURL`

### 7. Add Zoho environment values to Fly secrets

After generating the Webform, take the environment values used by the project and add them to the Fly.io application secrets.

These are the relevant variables for the current integration:

```env
ZOHO_WEBFORM_ACTION_URL=https://crm.zoho.com/crm/WebToLeadForm
ZOHO_WEBFORM_ACTION_TYPE=TGVhZHM=
ZOHO_WEBFORM_XNQSJSDP=
ZOHO_WEBFORM_XMIWTLD=
ZOHO_WEBFORM_RETURN_URL=null
```

For local development, place the real values in `.env.local`.

For Fly.io production, add them in the Fly dashboard Secrets section or with `flyctl secrets set`.

Example:

```bash
flyctl secrets set \
  ZOHO_WEBFORM_ACTION_URL=https://crm.zoho.com/crm/WebToLeadForm \
  ZOHO_WEBFORM_ACTION_TYPE=TGVhZHM= \
  ZOHO_WEBFORM_XNQSJSDP=YOUR_VALUE \
  ZOHO_WEBFORM_XMIWTLD=YOUR_VALUE \
  ZOHO_WEBFORM_RETURN_URL=null \
  -a sparamer-landing
```

## Environment Variables

The repository includes an example file in [.env.example](.env.example).

Use it as a template only.

- `.env.example` documents required variables
- `.env.local` stores real local values
- Fly.io Secrets store real production values

## Notes

- Do not commit real Zoho secrets or Webform tokens into the repository.
- If the domain is already configured in Fly.io, re-run `flyctl certs check` instead of guessing DNS values manually.
- If a deployment issue appears, confirm that [fly.toml](fly.toml) is present in the repository before releasing.