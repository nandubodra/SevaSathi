import { Request, Response, Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { users, type UserRole } from '../services/workflow-engine.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['citizen', 'helper', 'admin']).default('citizen'),
  preferredLanguage: z.string().default('Hindi')
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export function createAuthRouter() {
  const router = Router();

  router.post('/register', (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid registration payload', issues: parsed.error.issues });
    }

    const { email, password, role, preferredLanguage } = parsed.data;
    const existing = users.find((user) => user.email === email);
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = {
      id: `user-${Date.now()}`,
      email,
      passwordHash: `hash:${password}`,
      role: role as UserRole,
      preferredLanguage,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });

    return res.status(201).json({
      user: { id: user.id, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage },
      token,
      message: 'Registration successful'
    });
  });

  router.post('/login', (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid login payload', issues: parsed.error.issues });
    }

    const { email, password } = parsed.data;
    const user = users.find((entry) => entry.email === email && entry.passwordHash === `hash:${password}`);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });

    return res.json({
      user: { id: user.id, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage },
      token,
      message: 'Login successful'
    });
  });

  return router;
}
