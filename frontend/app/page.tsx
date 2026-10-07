import Link from 'next/link';
import { Mic, MessageSquareText, ShieldCheck, Languages, BellRing, Sparkles } from 'lucide-react';

const services = [
  'Income Certificate',
  'Caste Certificate',
  'Residence Certificate',
  'Birth Certificate',
  'Government Schemes',
  'Licences'
];

const languages = ['Hindi', 'English', 'Bhojpuri', 'Bengali', 'Punjabi'];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">SevaAgent</p>
              <h1 className="text-lg font-semibold">Citizen Service AI</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/services">Services</Link>
            <Link href="/assistant">AI Assistant</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/help">Help</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200">Hindi</button>
            <Link href="/assistant" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-500/20">
              Start now
            </Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-soft">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm text-brand-100">
              <Sparkles className="h-4 w-4" />
              Your AI assistant for government services
            </div>
            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              Simple steps. Trusted guidance. Real citizen service workflows.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-slate-300">
              SevaAgent helps citizens understand eligibility, collect documents, validate files, review form data, and submit applications with explicit consent and auditability.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/assistant" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 font-medium text-white">
                <MessageSquareText className="h-4 w-4" />
                Talk to assistant
              </Link>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 font-medium text-slate-100">
                <Mic className="h-4 w-4" />
                Enable voice
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {languages.map((language) => (
                <span key={language} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-200">
                  {language}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Voice assistant</h3>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                Ready
              </span>
            </div>

            <div className="mb-5 flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 p-6">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-lg shadow-brand-500/30">
                <Mic className="h-8 w-8" />
              </button>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Languages className="h-4 w-4" /> language</span>
                <span className="text-slate-100">Hindi</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-2"><BellRing className="h-4 w-4" /> status</span>
                <span className="text-slate-100">Listening</span>
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-white">Popular citizen services</h3>
            <Link href="/services" className="text-sm text-brand-100">View all</Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <div key={service} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-brand-500/10 px-2 py-1 text-xs text-brand-100">Service {index + 1}</span>
                  <span className="text-xs text-emerald-400">Workflow ready</span>
                </div>
                <h4 className="text-xl font-semibold text-white">{service}</h4>
                <p className="mt-2 text-sm text-slate-300">
                  Eligibility, document guidance, consent, and application tracking are integrated for the service flow.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
