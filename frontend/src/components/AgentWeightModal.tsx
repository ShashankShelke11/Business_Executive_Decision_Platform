import React from 'react';
import { X, Sliders, Info, RotateCcw } from 'lucide-react';
import { Agent, AgentId } from '../types/boardroom';

interface AgentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  onUpdateWeight: (id: AgentId, weight: number) => void;
  onResetWeights: () => void;
}

export const AgentWeightModal: React.FC<AgentWeightModalProps> = ({
  isOpen,
  onClose,
  agents,
  onUpdateWeight,
  onResetWeights
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl dark:bg-[#0D111A] bg-white border dark:border-slate-800 border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-slate-800 border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold dark:text-slate-100 text-slate-800">
                Executive Voting Weights & Influence Coefficients
              </h3>
              <p className="text-xs dark:text-slate-400 text-slate-500">
                Adjust the mathematical vote multiplier for each board member
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg dark:text-slate-400 text-slate-500 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formula Explainer */}
        <div className="my-4 p-3 rounded-xl dark:bg-blue-950/20 bg-blue-50 border dark:border-blue-500/20 border-blue-200 text-xs dark:text-blue-300 text-blue-800 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-0.5">Weighted Consensus Formula:</p>
            <p className="dark:text-slate-300 text-slate-700 text-[11px] font-mono">
              Score = Σ(Weight_i × Vote_i) / Σ(Weight_i)
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-[11px] mt-1">
              Higher weights give an executive decisive veto or approval leverage over specific company strategies (e.g., elevating the CFO during capital crises).
            </p>
          </div>
        </div>

        {/* Agent Weight Sliders */}
        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-3 rounded-xl dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-[180px]">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-9 h-9 rounded-full object-cover border-2"
                  style={{ borderColor: agent.color }}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold dark:text-slate-100 text-slate-800">{agent.name}</span>
                    <span
                      className="text-[10px] font-semibold px-1 rounded"
                      style={{ backgroundColor: agent.accentBg, color: agent.color }}
                    >
                      {agent.shortTitle}
                    </span>
                  </div>
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 block truncate max-w-[140px]">
                    {agent.department}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="flex-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={agent.currentWeight}
                  onChange={(e) => onUpdateWeight(agent.id, parseFloat(e.target.value))}
                  className="w-full accent-blue-500 dark:bg-slate-800 bg-slate-200 h-1.5 rounded-lg cursor-pointer"
                />
                <span className="w-12 text-right font-mono text-xs font-bold text-blue-500">
                  {agent.currentWeight.toFixed(1)}x
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between">
          <button
            onClick={onResetWeights}
            className="flex items-center gap-1.5 text-xs dark:text-slate-400 text-slate-500 hover:dark:text-slate-200 hover:text-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
          >
            Apply Weight Configurations
          </button>
        </div>
      </div>
    </div>
  );
};
