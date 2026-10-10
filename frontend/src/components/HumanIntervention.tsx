import React, { useState } from 'react';
import { Send, UserCheck, Sparkles } from 'lucide-react';

interface HumanInterventionProps {
  onInjectDirective: (directive: string) => void;
  isMeetingActive: boolean;
}

export const HumanIntervention: React.FC<HumanInterventionProps> = ({
  onInjectDirective,
  isMeetingActive
}) => {
  const [directive, setDirective] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directive.trim()) return;
    onInjectDirective(directive);
    setDirective('');
  };

  const quickPrompts = [
    'Cap overall capital expenditure at $20M maximum.',
    'Mandate strict GDPR and HIPAA compliance audit before rollout.',
    'What is our downside exit plan if adoption misses Q1 targets?'
  ];

  return (
    <div className="glass-panel rounded-2xl p-3.5 border dark:border-slate-800 border-slate-200 shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-indigo-500" />
          <h3 className="text-xs font-semibold dark:text-slate-200 text-slate-800 uppercase tracking-wider">
            Chairman Intervention (Live Human-in-the-Loop)
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          Inject real-time executive constraints into the debate
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={directive}
          onChange={(e) => setDirective(e.target.value)}
          placeholder="Speak to the board: e.g. 'Assume budget is capped at $15M and require sponsor bank sign-off'..."
          className="flex-1 dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-slate-200 rounded-xl px-3.5 py-2 text-xs dark:text-slate-100 text-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={!directive.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Inject Directive</span>
        </button>
      </form>

      {/* Quick Prompt Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" /> Quick guidance:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setDirective(qp)}
            className="text-[10px] px-2 py-0.5 rounded-md dark:bg-slate-900 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 dark:text-slate-400 text-slate-600 transition"
          >
            &quot;{qp}&quot;
          </button>
        ))}
      </div>
    </div>
  );
};
