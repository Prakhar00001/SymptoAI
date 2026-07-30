import React from 'react';
import { Plus, Check } from 'lucide-react';

const COMMON_SYMPTOMS = [
  'Headache',
  'Fever',
  'Shortness of breath',
  'Chest tightness',
  'Cough',
  'Sore throat',
  'Fatigue',
  'Nausea',
  'Dizziness',
  'Abdominal pain',
  'Joint pain',
  'Loss of taste/smell',
];

interface QuickSymptomPickerProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string) => void;
}

export const QuickSymptomPicker: React.FC<QuickSymptomPickerProps> = ({
  selectedSymptoms,
  onToggleSymptom,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
        Quick-Select Common Symptoms
      </label>
      <div className="flex flex-wrap gap-2">
        {COMMON_SYMPTOMS.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom);
          return (
            <button
              key={symptom}
              type="button"
              onClick={() => onToggleSymptom(symptom)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:bg-teal-50/50'
              }`}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-slate-400" />
              )}
              {symptom}
            </button>
          );
        })}
      </div>
    </div>
  );
};