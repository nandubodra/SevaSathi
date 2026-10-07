import Link from 'next/link';

const activity = [
  ['10:31', 'Service selected', 'AI'],
  ['10:32', 'Document uploaded', 'Citizen'],
  ['10:33', 'OCR extraction completed', 'AI'],
  ['10:35', 'Consent requested', 'AI'],
  ['10:36', 'Application submitted', 'Citizen']
];

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Audit history</p>
            <h1 className="text-3xl font-semibold">Application timeline</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100">Back</Link>
        </div>

        <div className="space-y-4">
          {activity.map(([time, action, actor]) => (
            <div key={`${time}-${action}`} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="w-20 text-sm text-slate-400">{time}</div>
              <div className="flex-1 text-slate-200">{action}</div>
              <div className="text-sm text-brand-100">{actor}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
