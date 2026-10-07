import { Request, Response, Router } from 'express';
import { auditTrail, getApplication, serviceCatalog } from '../services/workflow-engine.js';

export function createAuditRouter() {
  const router = Router();

  router.get('/:applicationId', (req: Request, res: Response) => {
    const app = getApplication(req.params.applicationId);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const events = auditTrail.filter((event) => event.applicationId === app.id);
    res.json({
      application: app,
      service: serviceCatalog.find((s) => s.id === app.serviceId),
      events
    });
  });

  return router;
}
