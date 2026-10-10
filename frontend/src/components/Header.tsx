import React from 'react';
import { ShieldCheck, Sliders, FileText, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';
import { PresetScenario } from '../types/boardroom';

interface HeaderProps {
  statusText: string;
  isRunning: boolean;
  hasMetrics: boolean;
  scenarios: PresetScenario[];
  activeScenarioId: string;
  isCustomProposal: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectScenario: (scenario: PresetScenario) => void;
  onSelectCustom: () => void;
  onOpenWeightsModal: () => void;
  onOpenMemoModal: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  statusText,
  isRunning,
  hasMetrics,
  scenarios,
  activeScenarioId,
  isCustomProposal,
  theme,
  onToggleTheme,
  onSelectScenario,
  onSelectCustom,
  onOpenWeightsModal,
  onOpenMemoModal,
  onReset
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b dark:border-slate-800/80 border-slate-200/80 dark:bg-[#07090E]/90 bg-white/90 backdrop-blur-xl px-4 lg:px-8 py-3.5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
            <ShieldCheck className="w-6 h-6 text-white stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Boardmind <span className="text-blue-500">AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400">
                v2.4 Enterprise
              </span>
            </div>
            <p className="text-xs dark:text-slate-400 text-slate-500 font-medium">
              Autonomous Multi-Agent Executive Decision Platform
            </p>
          </div>
        </div>

        {/* Live Status Pill & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg dark:bg-slate-900/90 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-medium dark:text-slate-300 text-slate-700">
            <span
              className={`w-2 h-2 rounded-full ${
                isRunning
                  ? 'bg-amber-400 animate-pulse'
                  : hasMetrics
                  ? 'bg-emerald-400'
                  : 'bg-blue-400'
              }`}
            />
            <span className="max-w-[200px] truncate">{statusText}</span>
          </div>

          {/* Quick Scenario Preset Dropdown */}
          <div className="flex items-center gap-1.5 dark:bg-slate-900/60 bg-slate-100 p-1 rounded-lg border dark:border-slate-800 border-slate-200">
            <span className="text-[11px] font-medium dark:text-slate-400 text-slate-500 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Presets:
            </span>
            <select
              value={isCustomProposal ? 'custom' : activeScenarioId}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  onSelectCustom();
                } else {
                  const found = scenarios.find((s) => s.id === e.target.value);
                  if (found) onSelectScenario(found);
                }
              }}
              disabled={isRunning}
              className="dark:bg-slate-800/90 bg-white text-xs dark:text-slate-200 text-slate-700 rounded-md px-2.5 py-1 border dark:border-slate-700/60 border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer disabled:opacity-50 font-medium shadow-sm"
            >
              <option value="custom">✍️ Custom User Proposal</option>
              {scenarios.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.title}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 p-2 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium dark:text-amber-400 text-indigo-600 border dark:border-slate-800 border-slate-200 transition shadow-sm"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Agent Weights Modal Button */}
          <button
            onClick={onOpenWeightsModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium dark:text-slate-300 text-slate-700 border dark:border-slate-800 border-slate-200 transition"
            title="Adjust Executive Voting Weights"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Agent Weights</span>
          </button>

          {/* Official Board Resolution / Memo Button */}
          {hasMetrics && (
            <button
              onClick={onOpenMemoModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/30 transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Resolution Memo</span>
            </button>
          )}

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg dark:bg-slate-900 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 dark:text-slate-400 text-slate-600 border dark:border-slate-800 border-slate-200 transition"
            title="Reset Board Chamber"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
