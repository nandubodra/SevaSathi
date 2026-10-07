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

dotenv.config();

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'sevaagent-backend' });
});

app.use('/api/agent', createAgentRouter());
app.use('/api/services', createServicesRouter());
app.use('/api/applications', createApplicationsRouter());
app.use('/api/documents', createDocumentsRouter());
app.use('/api/admin', createAdminRouter());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});
