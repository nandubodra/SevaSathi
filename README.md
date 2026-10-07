# SevaAgent

SevaAgent is a production-oriented citizen-government service platform built as a monorepo with:

- Frontend: Next.js + React + TypeScript + Tailwind
- Backend: Node.js + TypeScript API orchestrator
- AI service: Python + FastAPI for OCR, document verification, and intent handling
- Database: PostgreSQL schema and seed data
- Infrastructure: Docker Compose for local orchestration

## Goals

- Guide citizens through government service workflows end-to-end
- Support Hindi, English, Bhojpuri, Bengali, and Punjabi
- Manage document uploads, OCR, verification, form autofill, review, consent, submission, retries, and escalation
- Maintain secure audit logs and explicit consent
- Keep government requirements configurable and source-backed rather than hallucinated

## Monorepo structure

```
seva-agent/
├── frontend/
├── backend/
├── ai-service/
├── database/
├── docs/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Quick start

```bash
cp .env.example .env

docker compose up --build
```

Then open:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- AI service: http://localhost:8000

## First working flow

1. Citizen selects Hindi
2. Enables voice or types request: "Mujhe income certificate banana hai"
3. AI identifies the service and explains the process
4. Citizen confirms and creates an application
5. Checklist is shown for required documents
6. Files are uploaded and validated by the AI service
7. Form autofill is generated and reviewed
8. Explicit consent is required before submission
9. Provider adapter handles the final submit step
10. Tracking and audit trail are updated

## Security and responsible AI

- No fake government verification claims
- No fabricated application numbers
- Explicit consent before sensitive actions
- Configurable rules engine instead of hard-coded assumptions
- Human escalation for ambiguous or failed processes

## Status

The project is intentionally structured as a production-grade scaffold with working API and workflow foundations that can be extended to real provider integrations, PostgreSQL persistence, and operational deployment.
