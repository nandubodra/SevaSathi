import { Request, Response, Router } from 'express';
import { createApplication, getApplication, updateApplicationState, workflowTimeline, serviceCatalog, type WorkflowState } from '../services/workflow-engine.js';

export function createWorkflowRouter() {
  const router = Router();

  router.post('/start', (req: Request, res: Response) => {
    const { serviceId, userId = 'user-demo-1' } = req.body ?? {};
    const service = serviceCatalog.find((entry) => entry.id === serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const app = createApplication(serviceId, userId);
    return res.status(201).json({ application: app, service });
  });

  router.get('/:applicationId', (req: Request, res: Response) => {
    const app = getApplication(req.params.applicationId);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ application: app, timeline: workflowTimeline[app.id] ?? [] });
  });

  router.post('/:applicationId/advance', (req: Request, res: Response) => {
    const { state, status } = req.body ?? {};
    const app = updateApplicationState(req.params.applicationId, state as WorkflowState, status ?? 'IN_PROGRESS');
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const entries = workflowTimeline[app.id] ?? [];
    entries.push({
      timestamp: new Date().toISOString(),
      state,
      status
    });
    workflowTimeline[app.id] = entries;

    return res.json({ application: app, timeline: entries });
  });

  return router;
}
