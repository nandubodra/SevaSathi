# SevaAgent

SevaAgent is a production-oriented AI-powered citizen government service platform designed to help citizens complete government processes end-to-end with transparency, consent, verification, human escalation, and workflow continuity.

This repository is structured as a monorepo and includes:

- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: Node.js + TypeScript API orchestrator
- AI service: Python + FastAPI for OCR, extraction, and document verification
- Database: PostgreSQL schema and migration-ready structure
- Infrastructure: Docker Compose and deployment-ready configuration

SevaAgent is built to support real citizen workflows such as:

- Income certificate
- Caste certificate
- Residence / domicile certificate
- Birth certificate
- Government schemes / subsidies
- Licences and related citizen services

Important: this system does not claim fake government verification or fabricate official submissions. It is designed to support real provider integrations where legitimate APIs, credentials, and authorization are available.

## Why this project exists

The goal is not to build a simple chatbot demo. The project is designed around the full citizen journey:

- Understand user intent in natural language
- Detect the requested service
- Explain eligibility, required documents, and conditions
- Guide document collection and upload
- Run validation, OCR, and consistency checks
- Autofill forms based on extracted data
- Present a review before submission
- Require explicit consent before sensitive actions
- Submit data through configured provider adapters
- Track application status and retry safely after failures
- Escalate to human support when required
- Store tamper-evident audit history

## Core capabilities

### 1. Multi-language support

The platform is designed to support at least:

- Hindi
- English
- Bhojpuri
- Bengali
- Punjabi

The language layer is modular so additional languages can be plugged in later.

### 2. Voice assistant

The system supports:

- speech-to-text
- language detection
- AI conversation and orchestration
- text-to-speech output
- voice fallback and text interaction

Voice and agent logic are kept modular so multiple providers can be swapped later.

### 3. Service discovery and workflow orchestration

User requests are processed through a structured service catalog and workflow engine rather than raw keyword matching alone.

### 4. Government rule engine

The platform keeps service requirements in a configurable service rules layer. Requirements are versioned and source-backed instead of being invented by the model itself.

### 5. Document lifecycle

The document flow includes:

- required document explanation
- checklist management
- secure upload
- MIME validation and size checks
- OCR and extraction
- validation score and document verification
- cross-document consistency checks
- form population
- review before submission

### 6. Explicit consent and auditability

Sensitive actions require explicit user consent. Every sensitive action is recorded with timestamps, destination, data shared, and result.

### 7. Human escalation

Ambiguous legal requirements, failed verification, conflicting documents, repeated provider failures, or user disputes can escalate to human support.

### 8. Resilience and retry handling

The platform includes workflow persistence, retry-safe semantics, and safe continuation from the last known successful state.

## Monorepo structure

```text
seva-agent/
├── frontend/
│   └── Next.js application
├── backend/
│   └── Node.js + TypeScript API orchestrator
├── ai-service/
│   └── Python + FastAPI AI/OCR/document verification service
├── database/
│   ├── migrations/
│   └── schema.sql
├── infrastructure/
│   ├── docker/
│   └── deployment/
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── security/
│   └── consent/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

## Recommended technology stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- Node.js
- TypeScript
- Express
- JWT authentication
- Route-based API structure
- Security middleware

### AI / document service

- Python
- FastAPI
- OCR / document parsing
- LLM orchestration
- Verification scoring
- Speech processing support

### Data and storage

- PostgreSQL
- Redis (optional for queueing/cache)
- S3-compatible private object storage
- Supabase-compatible patterns possible for auth/storage/realtime

### Infrastructure

- Docker
- Docker Compose
- production-ready environment configuration

## First working user flow

The primary user flow is:

1. Citizen opens SevaAgent
2. Selects Hindi or another supported language
3. Enables voice or types a request like: "Mujhe income certificate banana hai"
4. AI identifies intent and service
5. Eligibility and required documents are explained
6. User confirms
7. Document checklist appears
8. Documents are uploaded and validated
9. OCR extracts data and shows it for confirmation
10. Cross-document validation runs
11. Form is filled and reviewed
12. Explicit consent screen appears
13. User approves
14. Application is submitted via configured provider adapter
15. Status tracking begins with workflow updates
16. Corrections or retries are handled if needed
17. Final result or certificate notification is delivered
18. Audit trail remains available for review

## Security and governance principles

This project is designed with strong safeguards:

- explicit consent before sensitive actions
- no fake policy or fake government verification
- no fabricated application IDs or claims of official submission
- structured rules engine rather than arbitrary LLM-generated requirements
- audit trails and tamper-evident event logging
- human escalation for unsupported or risky situations
- secure JWT-based authentication and role-based access
- file validation and storage controls
- modular provider integrations

## Responsible AI requirements

The AI layer must never:

- invent government requirements
- claim fake verification or authenticity
- claim successful submission without a real provider result
- auto-submit without clear user consent
- hide failed actions or errors
- silently change user information

## Local development

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker + Docker Compose
- PostgreSQL (for production-ready persistence)

### Environment setup

```bash
cp .env.example .env
```

### Run everything

```bash
docker compose up --build
```

Then access:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- AI Service: http://localhost:8000

## API overview

The backend exposes structured endpoints such as:

- `POST /api/agent/message`
- `POST /api/agent/voice`
- `GET /api/services`
- `GET /api/services/:id`
- `POST /api/applications`
- `GET /api/applications/:id`
- `POST /api/applications/:id/documents`
- `POST /api/documents/:id/validate`
- `POST /api/applications/:id/form`
- `POST /api/applications/:id/consent`
- `POST /api/applications/:id/submit`
- `GET /api/applications/:id/status`
- `POST /api/applications/:id/retry`
- `POST /api/applications/:id/escalate`
- `GET /api/applications/:id/audit`
- `GET /api/notifications`

## Database direction

The project uses a PostgreSQL-centric schema with tables for:

- users
- services
- service_versions
- service_rules
- applications
- application_steps
- documents
- document_extractions
- document_verifications
- form_data
- consents
- audit_logs
- notifications
- application_events
- human_escalations
- providers
- provider_requests
- agent_sessions

Proper indexes, foreign keys, and transaction patterns should be implemented for production deployment.

## Production notes

This repository is intentionally structured as a production-grade scaffold. The default implementation may use in-memory development data to keep the platform runnable without external secrets or government provider credentials.

For real deployment, you must configure:

- secure JWT secret management
- PostgreSQL connection settings
- private storage bucket credentials
- provider API credentials / OAuth / onboarding
- role-based access rules
- monitoring and logging
- strict consent policy enforcement

## Roadmap

Planned maturity steps include:

- real PostgreSQL persistence
- robust auth + RBAC
- multilingual voice providers
- production OCR and verification pipeline
- real service-provider adapters
- notification delivery integrations
- human help dashboard
- long-horizon workflow analytics
- deployment automation and CI/CD

## License

This project is currently structured for internal and project-specific development work. Add the appropriate license for production deployment as required by your organization or deployment environment.

## Summary

SevaAgent is designed to be a trustworthy and operational citizen-service assistant, not a fake demo. It balances user guidance, document intelligence, AI workflow orchestration, consent enforcement, and human escalation while maintaining transparent and responsible behavior in a government-services context.

---

For the latest architecture and feature progress, see the repository code and service modules in this monorepo.
