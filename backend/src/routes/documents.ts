import { Router } from 'express';

export function createDocumentsRouter() {
  const router = Router();

  router.post('/:applicationId/upload', (req, res) => {
    const { fileName, mimeType, size } = req.body ?? {};

    if (!fileName || !mimeType) {
      return res.status(400).json({ message: 'fileName and mimeType are required' });
    }

    const supported = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!supported.includes(mimeType)) {
      return res.status(400).json({ message: 'Unsupported document type' });
    }

    if (typeof size === 'number' && size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File exceeds 5MB limit' });
    }

    return res.status(201).json({
      documentId: `doc-${Date.now()}`,
      fileName,
      mimeType,
      status: 'UPLOADED',
      validation: 'PENDING'
    });
  });

  router.post('/:documentId/validate', (req, res) => {
    const { extractedData } = req.body ?? {};

    res.json({
      documentId: req.params.documentId,
      result: 'VERIFIED',
      extractedData: extractedData ?? {
        name: 'Rahul Kumar',
        dateOfBirth: '12/08/2005',
        address: 'Village Sampurn, District Patna',
        documentNumber: 'IN-2025-0042'
      },
      checks: {
        formatValidation: 'PASSED',
        ocrQuality: '95%',
        consistency: '98%',
        tamperIndicators: 'LOW'
      }
    });
  });

  return router;
}
