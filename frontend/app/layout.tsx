import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SevaAgent | Citizen Government Services',
  description: 'AI-powered government service assistant for citizens.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
