import { Router } from 'express';
import { serviceCatalog } from '../services/agent-orchestrator.js';

export function createServicesRouter() {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json(serviceCatalog);
  });

  router.get('/:id', (req, res) => {
    const service = serviceCatalog.find((item) => item.id === req.params.id);

    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.json(service);
  });

  return router;
}
