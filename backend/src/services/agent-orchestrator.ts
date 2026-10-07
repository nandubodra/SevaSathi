import { createApplication, getApplication, updateApplicationState, workflowTimeline, serviceCatalog, type ApplicationWorkflowState } from '../services/workflow-engine.js';

export type CitizenAction = 'VOICE' | 'TEXT' | 'DOCUMENT' | 'REVIEW' | 'CONSENT' | 'SUBMIT';

export interface AgentIntentResult {
  serviceId: string;
  serviceName: string;
  category: string;
  confidence: number;
  language: string;
  explanation: string;
}

export function inferIntentFromMessage(message: string, language = 'Hindi'): AgentIntentResult {
  const normalized = message.toLowerCase();

  let serviceId = 'income_certificate';
  let serviceName = 'Income Certificate';

  if (normalized.includes('caste') || normalized.includes('jati')) {
    serviceId = 'caste_certificate';
    serviceName = 'Caste Certificate';
  } else if (normalized.includes('residence') || normalized.includes('domicile') || normalized.includes('address')) {
    serviceId = 'residence_certificate';
    serviceName = 'Residence Certificate';
  }

  const service = serviceCatalog.find((entry) => entry.id === serviceId) ?? serviceCatalog[0];

  return {
    serviceId: service.id,
    serviceName: service.name,
    category: service.category,
    confidence: 0.93,
    language,
    explanation: `SevaAgent identified ${service.name} as the likely service. It will guide you through eligibility, required documents, verification, and submission.`
  };
}

export function continueWorkflow(applicationId: string, nextState: ApplicationWorkflowState, status: string) {
  const updated = updateApplicationState(applicationId, nextState, status);
  if (!updated) {
    return null;
  }

  return {
    application: updated,
    timeline: workflowTimeline[updated.id] ?? []
  };
}

export function createApplicationRecord(serviceId: string, userId = 'user-demo-1') {
  return createApplication(serviceId, userId);
}
