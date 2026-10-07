import Link from 'next/link';

const docs = [
  { name: 'Identity Proof', status: 'Verified', required: true },
  { name: 'Address Proof', status: 'Verified', required: true },
  { name: 'Income Proof', status: 'Uploaded', required: true },
  { name: 'Photograph', status: 'Pending', required: true },
  { name: 'Declaration', status: 'Pending', required: true }
];

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Document center</p>
            <h1 className="text-3xl font-semibold">Income Certificate documents</h1>
          </div>
          <Link href="/assistant" className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100">Upload file</Link>
        </div>

        <div className="grid gap-4">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div>
                <p className="text-lg font-medium text-white">{doc.name}</p>
                <p className="text-sm text-slate-400">{doc.required ? 'Required' : 'Optional'}</p>
              </div>
              <span className={doc.status === 'Verified' ? 'rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300' : 'rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300'}>{doc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
