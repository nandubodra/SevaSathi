from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, List

app = FastAPI(title='SevaAgent AI Service', version='1.0.0')


class IntentRequest(BaseModel):
    message: str
    language: str = 'Hindi'


class OCRRequest(BaseModel):
    fileName: str
    mimeType: str
    text: str | None = None


class ValidationRequest(BaseModel):
    documentType: str
    extractedData: Dict[str, Any]


@app.get('/health')
def health_check() -> Dict[str, str]:
    return {'status': 'ok', 'service': 'sevaagent-ai-service'}


@app.post('/intent')
def detect_intent(request: IntentRequest) -> Dict[str, Any]:
    lowered = request.message.lower()
    service = 'income_certificate' if 'income' in lowered or 'incom' in lowered else 'caste_certificate' if 'caste' in lowered else 'residence_certificate'

    return {
        'intent': {
            'serviceId': service,
            'serviceName': 'Income Certificate' if service == 'income_certificate' else 'Caste Certificate' if service == 'caste_certificate' else 'Residence Certificate',
            'confidence': 0.93,
            'language': request.language,
            'category': 'citizen-service'
        },
        'eligibility': ['Resident of the jurisdiction', 'Valid identity proof', 'Required supporting documents'],
        'documents': ['Identity proof', 'Address proof', 'Income proof', 'Photograph', 'Declaration']
    }


@app.post('/ocr/extract')
def extract_document_fields(request: OCRRequest) -> Dict[str, Any]:
    return {
        'documentType': 'identity_document' if 'id' in request.fileName.lower() else 'income_proof',
        'extractedData': {
            'name': 'Rahul Kumar',
            'dateOfBirth': '12/08/2005',
            'address': 'Village Sampurn, District Patna',
            'documentNumber': 'IN-2025-0042',
            'issuedBy': 'Local Authority'
        },
        'ocrQuality': 0.95,
        'warnings': []
    }


@app.post('/documents/validate')
def validate_document(request: ValidationRequest) -> Dict[str, Any]:
    checks = {
        'formatValidation': 'PASSED',
        'ocrConsistency': 'PASSED',
        'digitalSignature': 'NOT_APPLICABLE',
        'tamperIndicators': 'LOW',
        'qrVerification': 'NOT_APPLICABLE',
        'crossDocumentConsistency': 'PASSED'
    }

    return {
        'result': 'VERIFIED' if all(value in ['PASSED', 'LOW', 'NOT_APPLICABLE'] for value in checks.values()) else 'REVIEW_REQUIRED',
        'verificationScore': {
            'ocrQuality': 95,
            'dataConsistency': 98,
            'qrVerification': 'NOT_APPLICABLE',
            'digitalSignature': 'NOT_APPLICABLE',
            'tamperIndicators': 'Low'
        },
        'checks': checks
    }


@app.post('/voice/transcribe')
def transcribe_voice() -> Dict[str, Any]:
    return {
        'language': 'Hindi',
        'transcript': 'Mujhe income certificate banana hai.',
        'confidence': 0.95
    }


@app.post('/voice/synthesize')
def synthesize_voice() -> Dict[str, Any]:
    return {
        'status': 'ok',
        'audioUrl': 'https://example.invalid/voice-response.mp3',
        'language': 'Hindi'
    }
