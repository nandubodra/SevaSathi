export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-semibold">Service Explorer</h1>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Income Certificate', 'Eligibility + document verification'],
            ['Caste Certificate', 'User identity + category proof'],
            ['Residence Certificate', 'Address and residency evidence'],
            ['Birth Certificate', 'Medical and identity validation'],
            ['Government Schemes', 'Eligibility and subsidy matching'],
            ['Licences', 'Application and fee workflows']
          ].map(([service, description]) => (
            <div key={service} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-xl font-semibold text-white">{service}</h2>
              <p className="mt-2 text-sm text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
