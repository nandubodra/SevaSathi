export type UserRole = 'citizen' | 'helper' | 'admin';

export interface ServiceRule {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string[];
  documents: string[];
  languageSupport: string[];
  version: string;
  authority?: string;
  verificationRules?: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  preferredLanguage: string;
  createdAt: string;
}

export type ApplicationWorkflowState =
  | 'SERVICE_IDENTIFIED'
  | 'ELIGIBILITY_CHECK'
  | 'DOCUMENT_REQUIREMENTS'
  | 'DOCUMENT_COLLECTION'
  | 'DOCUMENT_VALIDATION'
  | 'FORM_DATA_COLLECTION'
  | 'FORM_GENERATION'
  | 'USER_REVIEW'
  | 'CONSENT'
  | 'SUBMISSION'
  | 'APPLICATION_TRACKING'
  | 'CORRECTION_IF_REQUIRED'
  | 'FINAL_VERIFICATION'
  | 'CERTIFICATE_AVAILABLE';

export interface ApplicationRecord {
  id: string;
  userId: string;
  serviceId: string;
  workflowState: ApplicationWorkflowState;
  status: string;
  createdAt: string;
  updatedAt: string;
  consentGiven: boolean;
}

export interface ConsentRecord {
  id: string;
  applicationId: string;
  action: string;
  timestamp: string;
  textVersion: string;
  dataShared: string[];
  destination: string;
  result: 'GRANTED' | 'DENIED';
}

export interface NotificationRecord {
  id: string;
  userId: string;
  applicationId: string | null;
  title: string;
  message: string;
  channel: string;
  readAt: string | null;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  applicationId: string;
  action: string;
  timestamp: string;
  actor: 'citizen' | 'ai' | 'system';
  previousHash: string;
  currentHash: string;
  result: string;
}

export const users: UserProfile[] = [
  {
    id: 'user-demo-1',
    email: 'citizen@example.com',
    passwordHash: 'hash:password123',
    role: 'citizen',
    preferredLanguage: 'Hindi',
    createdAt: new Date().toISOString()
  },
  {
    id: 'helper-demo-1',
    email: 'helper@example.com',
    passwordHash: 'hash:password123',
    role: 'helper',
    preferredLanguage: 'English',
    createdAt: new Date().toISOString()
  }
];

export const consentVersions = {
  current: 'consent-v1.0'
};

export const serviceCatalog: ServiceRule[] = [
  {
    id: 'income_certificate',
    name: 'Income Certificate',
    category: 'citizen-service',
    description: 'Government certificate confirming income status.',
    eligibility: ['Resident of the jurisdiction', 'Valid identity and address proof', 'No conflicting records'],
    documents: ['Identity proof', 'Address proof', 'Income proof', 'Photograph', 'Declaration'],
    languageSupport: ['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'],
    version: 'v1.0',
    authority: 'District Administration Office',
    verificationRules: ['Format validation', 'OCR consistency', 'Cross-document check']
  },
  {
    id: 'caste_certificate',
    name: 'Caste Certificate',
    category: 'citizen-service',
    description: 'Certificate establishing caste eligibility for support programs.',
    eligibility: ['Valid identity', 'Eligibility under local rules', 'Required community proof'],
    documents: ['Identity proof', 'Address proof', 'Community documents', 'Declaration'],
    languageSupport: ['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'],
    version: 'v1.0',
    authority: 'Tehsil / Block Office',
    verificationRules: ['Format validation', 'OCR consistency', 'Cross-document check']
  },
  {
    id: 'residence_certificate',
    name: 'Residence Certificate',
    category: 'citizen-service',
    description: 'Certificate confirming local residential status.',
    eligibility: ['Resident in the area for the applicable duration', 'Documented address'],
    documents: ['Address proof', 'Identity proof', 'Declaration'],
    languageSupport: ['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'],
    version: 'v1.0',
    authority: 'District / Municipal Authority',
    verificationRules: ['Format validation', 'OCR consistency', 'Cross-document check']
  }
];

export const applications: ApplicationRecord[] = [];
export const applicationConsents: ConsentRecord[] = [];
export const notifications: NotificationRecord[] = [
  {
    id: 'notification-1',
    userId: 'user-demo-1',
    applicationId: null,
    title: 'Welcome to SevaAgent',
    message: 'Your multilingual support and consent-first workflow are ready.',
    channel: 'in_app',
    readAt: null,
    createdAt: new Date().toISOString()
  }
];
export const auditTrail: AuditEvent[] = [];
export const workflowTimeline: Record<string, Array<{ timestamp: string; state: string; status: string }>> = {};

export function createApplication(serviceId: string, userId = 'user-demo-1'): ApplicationRecord {
  const record: ApplicationRecord = {
    id: `app-${Date.now()}`,
    userId,
    serviceId,
    workflowState: 'SERVICE_IDENTIFIED',
    status: 'SUBMITTED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    consentGiven: false
  };

  applications.push(record);
  workflowTimeline[record.id] = [{
    timestamp: record.createdAt,
    state: 'SERVICE_IDENTIFIED',
    status: 'SUBMITTED'
  }];

  return record;
}

export function getApplication(applicationId: string): ApplicationRecord | null {
  return applications.find((app) => app.id === applicationId) ?? null;
}

export function updateApplicationState(
  applicationId: string,
  workflowState: ApplicationWorkflowState,
  status: string
): ApplicationRecord | null {
  const app = getApplication(applicationId);
  if (!app) return null;

  app.workflowState = workflowState;
  app.status = status;
  app.updatedAt = new Date().toISOString();

  const entries = workflowTimeline[app.id] ?? [];
  entries.push({ timestamp: app.updatedAt, state: workflowState, status });
  workflowTimeline[app.id] = entries;

  return app;
}

export function addAuditEvent(
  applicationId: string,
  action: string,
  actor: 'citizen' | 'ai' | 'system',
  result: string
): string {
  const previousHash = auditTrail.length ? auditTrail[auditTrail.length - 1].currentHash : 'genesis';
  const currentHash = `hash:${applicationId}:${action}:${Date.now()}:${previousHash}`;

  auditTrail.push({
    id: `audit-${Date.now()}`,
    applicationId,
    action,
    timestamp: new Date().toISOString(),
    actor,
    previousHash,
    currentHash,
    result
  });

  return currentHash;
}

export function createNotification(input: {
  userId: string;
  title: string;
  message: string;
  channel?: string;
  applicationId?: string | null;
}): NotificationRecord {
  const notification: NotificationRecord = {
    id: `notification-${Date.now()}`,
    userId: input.userId,
    applicationId: input.applicationId ?? null,
    title: input.title,
    message: input.message,
    channel: input.channel ?? 'in_app',
    readAt: null,
    createdAt: new Date().toISOString()
  };

  notifications.push(notification);
  return notification;
}
