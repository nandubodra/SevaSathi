import { Button } from '@/components/ui/button';

export default function AssistantPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI assistant</p>
            <h1 className="text-2xl font-semibold">Income Certificate Flow</h1>
          </div>
          <Button>Voice enabled</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-100">Progress: 4/7</span>
              <span className="text-sm text-slate-300">Hindi • Voice on</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200">
                <p className="font-medium text-white">Citizen</p>
                <p className="mt-2">Mujhe income certificate banana hai.</p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-medium">SevaAgent</p>
                <p className="mt-2">Aapke liye Income Certificate ka process shuru kiya ja raha hai. Eligibility, required documents, aur signature requirements bata rahe hain.</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="mb-3 font-semibold text-white">Required documents</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Identity proof</li>
                <li>• Address proof</li>
                <li>• Income-related proof</li>
                <li>• Applicant photograph</li>
                <li>• Declaration and self-attestation</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Workflow</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>✓ Service identified</li>
                <li>✓ Documents required explained</li>
                <li>✓ Eligibility reviewed</li>
                <li>→ Review application</li>
                <li>○ Consent</li>
                <li>○ Submission</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Voice controls</h3>
              <div className="flex gap-3">
                <button className="flex-1 rounded-full bg-brand-500 px-4 py-3 text-sm font-medium text-white">Mic</button>
                <button className="flex-1 rounded-full border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200">Stop</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
