import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert } from 'lucide-react';

interface EmergencyAlertProps {
  reason?: string;
}

export const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ reason }) => {
  return (
    <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-rose-600 text-white rounded-xl shadow-md shrink-0">
          <AlertTriangle className="w-7 h-7 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-rose-950 dark:text-rose-100">
              Immediate Medical Attention Required
            </h3>
            <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wide bg-rose-200 text-rose-900 rounded">
              CRITICAL
            </span>
          </div>
          <p className="mt-2 text-sm text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
            {reason || 'Your reported symptoms indicate a potential high-risk emergency.'}
          </p>

          <div className="mt-5 p-4 bg-white/80 dark:bg-rose-900/30 rounded-xl border border-rose-200 dark:border-rose-800">
            <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Recommended Immediate Actions:
            </p>
            <ul className="text-xs text-rose-900 dark:text-rose-200 space-y-1.5 list-disc list-inside">
              <li>Call emergency services (911 in US/Canada, 112 in Europe, 102/108 in India).</li>
              <li>Do NOT drive yourself to the hospital if experiencing chest pain, weakness, or fainting.</li>
              <li>Have someone stay with you until emergency response arrives.</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="tel:911"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              Call Emergency Services Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};