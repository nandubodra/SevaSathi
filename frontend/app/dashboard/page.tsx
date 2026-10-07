export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-semibold">Citizen Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['Active applications', '03'],
            ['Completed', '08'],
            ['Missing docs', '02'],
            ['Notifications', '05']
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
