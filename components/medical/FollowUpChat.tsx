import React, { useState } from 'react';
import { ChatMessage } from '@/types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export const FollowUpChat: React.FC<{ initialSymptoms: string }> = ({ initialSymptoms }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "I've analyzed your initial symptoms. Feel free to ask any follow-up questions regarding home care, precautions, or what to tell your doctor.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Basic follow-up assistant context
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: `[Follow-up question based on initial symptoms: "${initialSymptoms}"] Question: ${input}`,
        }),
      });

      if (!res.ok) throw new Error('Followup failed');
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data.urgencySummary ||
          data.recommendedActions?.join('. ') ||
          'Consult with your physician for detailed personal guidance.',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Unable to process follow-up right now. Please consult a medical professional.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
        <Bot className="w-4 h-4 text-teal-600" />
        Conversational Follow-Up Assistant
      </h3>

      <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${
              m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`p-2 rounded-lg text-xs shrink-0 ${
                m.role === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                m.role === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-8">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
            SymptoAI is responding...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a clarifying question..."
          className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-all"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};