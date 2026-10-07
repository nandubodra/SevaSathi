export default function HelpPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="mb-4 text-3xl font-semibold">Human Help</h1>
        <p className="mb-6 text-slate-300">
          Escalate when the AI cannot safely resolve a document conflict, unclear legal rule, verification failure, repeated API failure, or contested application outcome.
        </p>
        <button className="rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white">Request assistance</button>
      </div>
    </main>
  );
}
