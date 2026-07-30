import React, { useState } from 'react';
import { QuickSymptomPicker } from './QuickSymptomPicker';
import { UserContext } from '@/types';
import { Mic, MicOff, Sparkles, Loader2 } from 'lucide-react';

interface SymptomFormProps {
  onSubmit: (symptoms: string, userContext: UserContext) => void;
  isLoading: boolean;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [isListening, setIsListening] = useState(false);

  const togglePill = (symptom: string) => {
    setSelectedPills((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedSymptoms = [
      text,
      selectedPills.length > 0 ? `Selected Symptoms: ${selectedPills.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    if (!combinedSymptoms.trim()) return;

    onSubmit(combinedSymptoms, {
      age: age ? parseInt(age, 10) : undefined,
      gender: gender || undefined,
    });
  };

  const setDemoPreset = (presetText: string, pills: string[]) => {
    setText(presetText);
    setSelectedPills(pills);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Demo Presets for Hackathon Testers */}
      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Demos:</span>
        <button
          type="button"
          onClick={() =>
            setDemoPreset(
              'Severe throbbing headache on the right side with sensitivity to light and visual aura for 3 hours.',
              ['Headache']
            )
          }
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
        >
          Migraine with Aura
        </button>
        <button
          type="button"
          onClick={() =>
            setDemoPreset(
              'Crushing chest pressure radiating to left arm, cold sweats, and shortness of breath starting 20 minutes ago.',
              ['Chest tightness', 'Shortness of breath']
            )
          }
          className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors"
        >
          Chest Pain (ER Emergency)
        </button>
      </div>

      {/* Patient Context */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Age (Optional)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 28"
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Biological Sex (Optional)
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:border-teal-500 text-slate-700 dark:text-slate-300"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Quick Pills */}
      <QuickSymptomPicker selectedSymptoms={selectedPills} onToggleSymptom={togglePill} />

      {/* Textarea + Voice */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Describe How You Feel
          </label>
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50'
            }`}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-teal-600" />}
            {isListening ? 'Listening...' : 'Voice Input'}
          </button>
        </div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe onset, duration, pain scale (1-10), triggering factors, and associated sensations..."
          className="w-full p-4 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || (!text.trim() && selectedPills.length === 0)}
        className="w-full py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing Symptoms with SymptoAI Engine...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Run Medical Assessment
          </>
        )}
      </button>
    </form>
  );
};