'use client';

import React, { useState } from 'react';
import { SymptomForm } from '@/components/medical/SymptomForm';
import { ResultCard } from '@/components/medical/ResultCard';
import { EmergencyAlert } from '@/components/medical/EmergencyAlert';
import { FollowUpChat } from '@/components/medical/FollowUpChat';
import { AnalysisResponse, UserContext } from '@/types';
import { HeartPulse, ShieldCheck, Activity } from 'lucide-react';

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSymptoms, setLastSymptoms] = useState('');

  const handleAnalyze = async (symptoms: string, userContext: UserContext) => {
    setLoading(true);
    setError(null);
    setLastSymptoms(symptoms);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, userContext }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze symptoms.');
      }

      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200 pb-16">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-600 text-white rounded-xl shadow-sm">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                Sympto<span className="text-teal-600">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/60">
                Medical Triage
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Private & Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            AI Symptom Assessment & Clinical Guidance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Describe your symptoms naturally or pick common indicators for rapid, empathetic triage evaluation.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <SymptomForm onSubmit={handleAnalyze} isLoading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Dynamic Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {analysis.isEmergency ? (
              <EmergencyAlert reason={analysis.emergencyReason} />
            ) : (
              <ResultCard data={analysis} />
            )}

            {/* Follow Up Chat Component */}
            <FollowUpChat initialSymptoms={lastSymptoms} />
          </div>
        )}
      </main>
    </div>
  );
}