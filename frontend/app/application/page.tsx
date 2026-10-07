import Link from 'next/link';

const applications = [
  { id: 'APP-2025-1001', service: 'Income Certificate', status: 'Under document verification', progress: '72%' },
  { id: 'APP-2025-1002', service: 'Residence Certificate', status: 'Form review', progress: '88%' },
  { id: 'APP-2025-1003', service: 'Birth Certificate', status: 'Awaiting consent', progress: '41%' }
];

export default function ApplicationWorkspacePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Application workspace</p>
            <h1 className="text-3xl font-semibold">My applications</h1>
          </div>
          <Link href="/assistant" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white">Open assistant</Link>
        </div>

        <div className="grid gap-5">
          {applications.map((app) => (
            <div key={app.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-400">{app.id}</p>
                  <h2 className="text-xl font-semibold text-white">{app.service}</h2>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">{app.status}</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-brand-500" style={{ width: app.progress }} />
              </div>
              <div className="mt-4 text-sm text-slate-300">Progress: {app.progress}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
