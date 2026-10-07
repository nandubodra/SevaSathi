import { Request, Response, Router } from 'express';
import { notifications, serviceCatalog, users } from '../services/workflow-engine.js';

export function createNotificationsRouter() {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    const userId = (req.headers['x-user-id'] as string) ?? 'user-demo-1';
    const items = notifications.filter((n) => n.userId === userId);
    res.json(items);
  });

  router.post('/', (req: Request, res: Response) => {
    const { userId = 'user-demo-1', title, message, channel = 'in_app', applicationId } = req.body ?? {};

    if (!title || !message) {
      return res.status(400).json({ message: 'title and message are required' });
    }

    const notification = {
      id: `notification-${Date.now()}`,
      userId,
      applicationId: applicationId ?? null,
      title,
      message,
      channel,
      readAt: null,
      createdAt: new Date().toISOString()
    };

    notifications.push(notification);
    return res.status(201).json(notification);
  });

  router.get('/services', (_req, res) => {
    res.json(serviceCatalog);
  });

  router.get('/users', (_req, res) => {
    res.json(users);
  });

  return router;
}
