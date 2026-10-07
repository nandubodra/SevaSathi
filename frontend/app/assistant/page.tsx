"use client";

import { useEffect, useState } from 'react';
import { fetchServices, sendAgentMessage } from '@/lib/api-client';

export default function AssistantPage() {
  const [message, setMessage] = useState('Mujhe income certificate banana hai.');
  const [language, setLanguage] = useState('Hindi');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices().then(setServices).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await sendAgentMessage(message, language);
      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI assistant</p>
            <h1 className="text-2xl font-semibold">Income Certificate Flow</h1>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
          >
            <option>Hindi</option>
            <option>English</option>
            <option>Bhojpuri</option>
            <option>Bengali</option>
            <option>Punjabi</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-100">Progress: 4/7</span>
              <span className="text-sm text-slate-300">{language} • Voice on</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200">
                <p className="font-medium text-white">Citizen</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-100"
                />
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-medium">SevaAgent</p>
                <p className="mt-2">
                  {response?.explanation ?? 'Aapke liye Income Certificate ka process shuru kiya ja raha hai. Eligibility, required documents, aur signature requirements bata rahe hain.'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={handleSubmit} className="rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-60" disabled={loading}>
                {loading ? 'Processing...' : 'Send request'}
              </button>
              <button className="rounded-full border border-slate-700 bg-slate-950 px-5 py-3 text-sm text-slate-200">Voice</button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="mb-3 font-semibold text-white">Required documents</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {(response?.documents ?? ['Identity proof', 'Address proof', 'Income proof', 'Photograph', 'Declaration']).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Workflow</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>✓ Service identified</li>
                <li>✓ Documents required explained</li>
                <li>✓ Eligibility reviewed</li>
                <li>→ Review application</li>
                <li>○ Consent</li>
                <li>○ Submission</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Available services</h3>
              <div className="space-y-2 text-sm text-slate-200">
                {services.map((service) => (
                  <div key={service.id} className="rounded-xl border border-slate-700 bg-slate-950 p-2">
                    {service.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
