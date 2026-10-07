import { Router } from 'express';
import { createApplication, getApplication, updateApplicationState, serviceCatalog } from '../services/workflow-engine.js';

export function createApplicationsRouter() {
  const router = Router();

  router.post('/', (req, res) => {
    const { serviceId, userId = 'user-demo-1' } = req.body ?? {};

    if (!serviceId || typeof serviceId !== 'string') {
      return res.status(400).json({ message: 'serviceId is required' });
    }

    const service = serviceCatalog.find((item) => item.id === serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const application = createApplication(serviceId, userId);
    return res.status(201).json({ application, service });
  });

  router.get('/:applicationId', (req, res) => {
    const application = getApplication(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const service = serviceCatalog.find((entry) => entry.id === application.serviceId);
    return res.json({ application, service, workflow: ['SERVICE_IDENTIFIED', 'ELIGIBILITY_CHECK', 'DOCUMENT_REQUIREMENTS', 'FORM_GENERATION', 'CONSENT', 'SUBMISSION', 'TRACKING'] });
  });

  router.post('/:applicationId/state', (req, res) => {
    const { workflowState, status } = req.body ?? {};
    const updated = updateApplicationState(req.params.applicationId, workflowState, status ?? 'IN_PROGRESS');
    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.json(updated);
  });

  return router;
}
