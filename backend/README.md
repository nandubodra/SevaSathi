# SevaAgent backend service

This service provides the orchestration layer for the SevaAgent application. It handles:

- registration and login
- service discovery and workflow state
- consent records and application status
- notifications and audit trail
- retry, escalation, and tracking flows

## Important note

The project is built with a production-oriented architecture, while the default implementation uses a safe in-memory data store for development and demo validation. Real data persistence should be backed by Supabase PostgreSQL and secure RLS rules in production.
