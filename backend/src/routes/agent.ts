import { Request, Response, Router } from 'express';
import { serviceCatalog, createApplication, getApplication, updateApplicationState } from '../services/agent-orchestrator.js';

export function createAgentRouter() {
  const router = Router();

  router.post('/message', async (req: Request, res: Response) => {
    const { message, language = 'Hindi' } = req.body ?? {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Message is required' });
    }

    const service = serviceCatalog.find((item) =>
      message.toLowerCase().includes(item.name.toLowerCase().split(' ')[0].toLowerCase())
        || message.toLowerCase().includes(item.name.toLowerCase().replace(' certificate', '').trim())
    ) ?? serviceCatalog[0];

    const application = createApplication(service.id);

    const payload = {
      language,
      intent: { serviceId: service.id, serviceName: service.name, category: service.category },
      eligibility: service.eligibility,
      documents: service.documents,
      workflowState: application.workflowState,
      applicationId: application.id,
      explanation: `SevaAgent understood your request for ${service.name}. Before proceeding, review the eligibility requirements and required documents.`
    };

    return res.status(200).json(payload);
  });

  router.post('/voice', async (req: Request, res: Response) => {
    const { transcript, language = 'Hindi' } = req.body ?? {};

    if (!transcript || typeof transcript !== 'string') {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    res.json({
      language,
      transcript,
      recognizedIntent: 'income_certificate',
      response: 'I have understood your request. I will guide you through the Income Certificate workflow step by step.'
    });
  });

  router.get('/sessions/:applicationId', (req: Request, res: Response) => {
    const application = getApplication(req.params.applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ application, status: 'ACTIVE' });
  });

  router.post('/applications/:applicationId/next', (req: Request, res: Response) => {
    const { workflowState, status } = req.body ?? {};
    const updated = updateApplicationState(req.params.applicationId, workflowState, status);

    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(updated);
  });

  return router;
}
