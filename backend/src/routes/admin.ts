import { Router } from 'express';

export function createAdminRouter() {
  const router = Router();

  router.get('/metrics', (_req, res) => {
    res.json({
      taskCompletionRate: '87%',
      successfulSubmissionRate: '81%',
      averageStepsCompleted: 6.4,
      documentValidationSuccessRate: '92%',
      recoverySuccessRate: '74%',
      humanEscalationRate: '12%',
      consentComplianceRate: '99%',
      failedActionRecoveryRate: '88%'
    });
  });

  router.get('/escalations', (_req, res) => {
    res.json([
      {
        applicationId: 'app-demo-1',
        reason: 'Conflicting document data',
        status: 'PENDING_REVIEW'
      }
    ]);
  });

  return router;
}
