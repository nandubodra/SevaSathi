import { Request, Response, Router } from 'express';
import { applications, getApplication, updateApplicationState, addAuditEvent, serviceCatalog } from '../services/workflow-engine.js';

export function createAuditRouter() {
  const router = Router();

  router.get('/:applicationId', (req: Request, res: Response) => {
    const app = getApplication(req.params.applicationId);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const trail = [] as any[];
    const { auditTrail: flow } = await import('../services/workflow-engine.js');
    const events = flow.filter((event) => event.applicationId === app.id);
    res.json({ application: app, service: serviceCatalog.find((s) => s.id === app.serviceId), events });
  });

  return router;
}
