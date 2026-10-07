import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile & language</p>
        <h1 className="mt-2 text-3xl font-semibold">Preferences</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-2 text-sm text-slate-400">Language</p>
            <div className="flex gap-2 text-sm">
              {['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'].map((lang) => (
                <span key={lang} className="rounded-full border border-slate-700 px-2 py-1 text-slate-200">{lang}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-2 text-sm text-slate-400">Voice</p>
            <div className="flex gap-2 text-sm">
              <button className="rounded-full bg-brand-500 px-3 py-2 text-white">Enabled</button>
              <button className="rounded-full border border-slate-700 px-3 py-2 text-slate-100">Text fallback</button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/dashboard" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white">Save preferences</Link>
        </div>
      </div>
    </main>
  );
}
