import { v4 as uuid } from 'uuid';

export type WorkflowState =
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

export interface ServiceRule {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string[];
  documents: string[];
  languageSupport: string[];
  version: string;
}

export const serviceCatalog: ServiceRule[] = [
  {
    id: 'income_certificate',
    name: 'Income Certificate',
    category: 'citizen-service',
    description: 'Government-issued certificate confirming family or individual income status.',
    eligibility: ['Resident of the jurisdiction', 'Applicant is above the legal age threshold for the service', 'No fraudulent/inconsistent record'],
    documents: ['Identity proof', 'Address proof', 'Income proof', 'Photo', 'Declaration'],
    languageSupport: ['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'],
    version: 'v1.0'
  },
  {
    id: 'caste_certificate',
    name: 'Caste Certificate',
    category: 'citizen-service',
    description: 'Certificate establishing caste/community status for eligible citizens.',
    eligibility: ['Valid identity', 'Relevant local eligibility rule', 'Documented family background'],
    documents: ['Identity proof', 'Address proof', 'Birth certificate', 'Community documents', 'Declaration'],
    languageSupport: ['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'],
    version: 'v1.0'
  }
];

export interface ApplicationRecord {
  id: string;
  userId: string;
  serviceId: string;
  workflowState: WorkflowState;
  status: string;
  createdAt: string;
  updatedAt: string;
  consentGiven: boolean;
}

const applications: ApplicationRecord[] = [];

export function createApplication(serviceId: string, userId = 'citizen-demo-user') {
  const record: ApplicationRecord = {
    id: uuid(),
    userId,
    serviceId,
    workflowState: 'SERVICE_IDENTIFIED',
    status: 'SUBMITTED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    consentGiven: false
  };

  applications.push(record);
  return record;
}

export function getApplication(applicationId: string) {
  return applications.find((record) => record.id === applicationId);
}

export function updateApplicationState(applicationId: string, workflowState: WorkflowState, status: string) {
  const app = getApplication(applicationId);

  if (!app) return null;

  app.workflowState = workflowState;
  app.status = status;
  app.updatedAt = new Date().toISOString();
  return app;
}
