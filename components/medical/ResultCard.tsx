import React from 'react';
import { AnalysisResponse, SeverityLevel, PossibleCondition } from '@/types';
import {
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

const severityConfig: Record<
  SeverityLevel,
  { label: string; badgeBg: string; textBg: string }
> = {
  low: {
    label: 'Low Severity',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200',
    textBg: 'border-l-emerald-500',
  },
  moderate: {
    label: 'Moderate Severity',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200',
    textBg: 'border-l-amber-500',
  },
  high: {
    label: 'High Urgency',
    badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-200',
    textBg: 'border-l-orange-500',
  },
  critical: {
    label: 'Critical Emergency',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200',
    textBg: 'border-l-rose-500',
  },
};

export const ResultCard: React.FC<{ data: AnalysisResponse }> = ({ data }) => {
  const config = severityConfig[data.severity] || severityConfig.low;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Triage Overview */}
      <div
        className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 ${config.textBg}`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${config.badgeBg}`}>
            {config.label}
          </span>
          <span className="text-xs text-slate-400 font-medium">SymptoAI Triage Engine</span>
        </div>
        <p className="mt-3 text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
          {data.urgencySummary}
        </p>
      </div>

      {/* Possible Conditions */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal-600" />
          Possible Conditions & Differential Analysis
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.possibleConditions.map((condition: PossibleCondition, idx: number) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  {condition.name}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                  {condition.probability} Match
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {condition.explanation}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs">
                <span className="text-slate-500">Recommended Care:</span>
                <span className="font-medium text-teal-700 dark:text-teal-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  {condition.recommendedSpecialist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900">
        <h4 className="font-semibold text-teal-950 dark:text-teal-200 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          Recommended Next Steps
        </h4>
        <ul className="mt-3 space-y-2">
          {data.recommendedActions.map((action: string, idx: number) => (
            <li key={idx} className="text-xs text-teal-900 dark:text-teal-300 flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Red Flag Indicators */}
      {data.whenToSeeDoctor && data.whenToSeeDoctor.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900">
          <h4 className="font-semibold text-amber-950 dark:text-amber-200 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Seek Immediate Evaluation If You Notice:
          </h4>
          <ul className="mt-3 space-y-2">
            {data.whenToSeeDoctor.map((warning: string, idx: number) => (
              <li key={idx} className="text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>{data.disclaimer}</p>
      </div>
    </div>
  );
};