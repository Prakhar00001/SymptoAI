import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SymptoAI — Clinical AI Triage & Medical Assistant',
  description: 'Fast, trustworthy AI symptom analysis and emergency health triage platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}