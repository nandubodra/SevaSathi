import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export type ServiceSummary = {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string[];
  documents: string[];
  languageSupport: string[];
  version: string;
};

export async function fetchServices(): Promise<ServiceSummary[]> {
  const response = await fetch(`${API_BASE_URL}/api/services`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }

  return response.json();
}

export async function createApplication(serviceId: string, userId = 'user-demo-1') {
  const response = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serviceId, userId })
  });

  if (!response.ok) {
    throw new Error('Failed to create application');
  }

  return response.json();
}

export async function sendAgentMessage(message: string, language = 'Hindi') {
  const response = await fetch(`${API_BASE_URL}/api/agent/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language })
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}

export function useServices() {
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((err) => setError(err instanceof Error ? err.message : 'Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}
