import Link from 'next/link';

const consentItems = [
  { title: 'Submit application to selected authority', destination: 'State Service Portal', status: 'Pending' },
  { title: 'Share verification data with human support', destination: 'SevaAgent Help Desk', status: 'Approved' }
];

export default function ConsentPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Consent center</p>
        <h1 className="mt-2 text-3xl font-semibold">Explicit consent required</h1>

        <div className="mt-6 space-y-4">
          {consentItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-2 text-sm text-slate-300">Destination: {item.destination}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-400">Status: {item.status}</span>
                <div className="flex gap-3">
                  <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100">Cancel</button>
                  <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white">Give consent</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-slate-300">
          This action sends your information and selected documents to the official destination only after explicit approval.
        </div>

        <div className="mt-8">
          <Link href="/assistant" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white">Return to application</Link>
        </div>
      </div>
    </main>
  );
}
