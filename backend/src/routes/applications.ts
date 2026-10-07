import { Router } from 'express';
import { createApplication, getApplication, serviceCatalog } from '../services/agent-orchestrator.js';

export function createApplicationsRouter() {
  const router = Router();

  router.post('/', (req, res) => {
    const { serviceId, userId } = req.body ?? {};

    if (!serviceId || typeof serviceId !== 'string') {
      return res.status(400).json({ message: 'serviceId is required' });
    }

    const service = serviceCatalog.find((item) => item.id === serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const application = createApplication(serviceId, userId ?? 'citizen-demo-user');
    return res.status(201).json({ application, service });
  });

  router.get('/:applicationId', (req, res) => {
    const application = getApplication(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.json({ application, workflow: ['SERVICE_IDENTIFIED', 'ELIGIBILITY_CHECK', 'DOCUMENT_REQUIREMENTS', 'FORM_GENERATION', 'CONSENT', 'SUBMISSION', 'TRACKING'] });
  });

  return router;
}
