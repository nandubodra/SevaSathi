import Link from 'next/link';

const notifications = [
  'Your documents were validated successfully.',
  'Consent required before final submission.',
  'A correction request has been detected for your birth certificate.'
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Notifications</p>
            <h1 className="text-3xl font-semibold">Important alerts</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100">Back to dashboard</Link>
        </div>

        <div className="space-y-4">
          {notifications.map((message, idx) => (
            <div key={message} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                <span className="text-sm text-slate-400">{idx === 0 ? 'Info' : idx === 1 ? 'Consent' : 'Action required'}</span>
              </div>
              <p className="text-slate-200">{message}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
