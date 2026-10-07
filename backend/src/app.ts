import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createAgentRouter } from './routes/agent.js';
import { createServicesRouter } from './routes/services.js';
import { createApplicationsRouter } from './routes/applications.js';
import { createDocumentsRouter } from './routes/documents.js';
import { createAdminRouter } from './routes/admin.js';
import { createAuthRouter } from './routes/auth.js';
import { createNotificationsRouter } from './routes/notifications.js';
import { createConsentRouter } from './routes/consents.js';
import { createWorkflowRouter } from './routes/workflow.js';
import { createStatusRouter } from './routes/status.js';
import { createAuditRouter } from './routes/audit.js';

dotenv.config();

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'sevaagent-backend' });
});

app.use('/api/auth', createAuthRouter());
app.use('/api/agent', createAgentRouter());
app.use('/api/services', createServicesRouter());
app.use('/api/applications', createApplicationsRouter());
app.use('/api/documents', createDocumentsRouter());
app.use('/api/admin', createAdminRouter());
app.use('/api/notifications', createNotificationsRouter());
app.use('/api/consents', createConsentRouter());
app.use('/api/workflow', createWorkflowRouter());
app.use('/api/status', createStatusRouter());
app.use('/api/audit', createAuditRouter());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});
