import { Request, Response, Router } from 'express';
import { getApplication, updateApplicationState, workflowTimeline, serviceCatalog, type WorkflowState } from '../services/workflow-engine.js';

export function createStatusRouter() {
  const router = Router();

  router.get('/:applicationId', (req: Request, res: Response) => {
    const app = getApplication(req.params.applicationId);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      applicationId: app.id,
      serviceId: app.serviceId,
      status: app.status,
      workflowState: app.workflowState,
      timeline: workflowTimeline[app.id] ?? [],
      nextAction: 'Document verification and consent review is currently in progress.'
    });
  });

  router.post('/:applicationId/retry', (req: Request, res: Response) => {
    const { nextState = 'APPLICATION_TRACKING' } = req.body ?? {};
    const app = updateApplicationState(req.params.applicationId, nextState as WorkflowState, 'RETRYING');
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.json({
      message: 'Retry scheduled safely using idempotent operation semantics.',
      application: app
    });
  });

  return router;
}
