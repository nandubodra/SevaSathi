# SevaAgent AI Service

This FastAPI service handles intent detection, OCR, document validation, and verification grading. It does not claim to authenticate government documents without trusted verification sources.

## Endpoints

- `GET /health`
- `POST /intent`
- `POST /ocr/extract`
- `POST /documents/validate`
- `POST /voice/transcribe`
- `POST /voice/synthesize`

## Security note

The service remains a modular verification layer. It may validate structure, OCR consistency, digital signature presence, tamper indicators, and cross-document consistency, but it never claims official government authenticity without a configured trusted source.
