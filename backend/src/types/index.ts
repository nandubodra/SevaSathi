export type UserRole = 'citizen' | 'helper' | 'admin';

export type ServiceStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'DOCUMENT_VERIFICATION' | 'CORRECTION_REQUIRED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

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
