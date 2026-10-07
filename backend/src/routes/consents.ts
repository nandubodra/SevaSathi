import { Request, Response, Router } from 'express';
import { applicationConsents, consentVersions, getApplication } from '../services/workflow-engine.js';

export function createConsentRouter() {
  const router = Router();

  router.post('/:applicationId', (req: Request, res: Response) => {
    const { applicationId } = req.params;
    const app = getApplication(applicationId);

    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const { action, destination, dataShared = [], granted } = req.body ?? {};
    if (!action || !destination) {
      return res.status(400).json({ message: 'action and destination are required' });
    }

    const record = {
      id: `consent-${Date.now()}`,
      applicationId,
      action,
      timestamp: new Date().toISOString(),
      textVersion: consentVersions.current,
      dataShared: Array.isArray(dataShared) ? dataShared : [String(dataShared)],
      destination,
      result: granted ? 'GRANTED' : 'DENIED'
    };

    applicationConsents.push(record);
    app.consentGiven = Boolean(granted);

    return res.status(201).json(record);
  });

  router.get('/:applicationId/history', (req: Request, res: Response) => {
    const records = applicationConsents.filter((entry) => entry.applicationId === req.params.applicationId);
    res.json(records);
  });

  return router;
}
