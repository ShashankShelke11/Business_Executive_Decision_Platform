import React from 'react';
import { ShieldAlert, TrendingUp, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Award, Compass } from 'lucide-react';
import { Agent, BoardMetrics } from '../types/boardroom';

interface MetricsPanelProps {
  metrics: BoardMetrics | null;
  agents: Agent[];
  onOpenMemoModal: () => void;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  metrics,
  agents,
  onOpenMemoModal
}) => {
  if (!metrics) {
    return (
      <div className="glass-panel rounded-2xl p-6 border dark:border-slate-800 border-slate-200 text-center flex flex-col items-center justify-center min-h-[300px] transition-colors">
        <Compass className="w-10 h-10 text-slate-400 dark:text-slate-600 stroke-1 mb-3 animate-spin" style={{ animationDuration: '12s' }} />
        <h4 className="text-sm font-semibold dark:text-slate-300 text-slate-700">Consensus Engine Standing By</h4>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mt-1">
          Initiate a board meeting to generate the real-time Risk Matrix, Confidence Index, and Strategic Amendments.
        </p>
      </div>
    );
  }

  const getVerdictStyles = () => {
    switch (metrics.finalVerdict) {
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        };
      case 'APPROVED WITH CONDITIONS':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
        };
      case 'REJECTED':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
          icon: <XCircle className="w-5 h-5 text-rose-500" />
        };
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
          icon: <Compass className="w-5 h-5 text-blue-500" />
        };
    }
  };

  const verdict = getVerdictStyles();

  return (
    <div className="glass-panel rounded-2xl p-4 lg:p-5 border dark:border-slate-800 border-slate-200/80 shadow-xl space-y-4 transition-colors">
      {/* Top Banner: Verdict & Rationale */}
      <div className={`rounded-xl p-3.5 border ${verdict.bg} transition-all`}>
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            {verdict.icon}
            <span className="text-xs font-mono font-bold tracking-wider">
              OFFICIAL BOARD RESOLUTION
            </span>
          </div>
          <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full dark:bg-slate-950/40 bg-white/70 shadow-sm">
            {metrics.finalVerdict}
          </span>
        </div>
        <p className="text-xs dark:text-slate-200 text-slate-800 mt-1.5 leading-relaxed font-medium">
          {metrics.verdictRationale}
        </p>
      </div>

      {/* Quantitative Gauges (Risk + Confidence + Weighted Score) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Risk Score */}
        <div className="dark:bg-slate-900/80 bg-slate-50 rounded-xl p-3 border dark:border-slate-800 border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" /> Risk Index
            </span>
            <span className="font-mono text-rose-500 font-bold">
              {metrics.riskScore}%
            </span>
          </div>
          <div className="my-2 h-2 rounded-full dark:bg-slate-800 bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                metrics.riskScore > 50
                  ? 'bg-rose-500'
                  : metrics.riskScore > 30
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${metrics.riskScore}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {metrics.riskScore > 50 ? 'High Downside Exposure' : 'Within Tolerable Limits'}
          </span>
        </div>

        {/* Board Confidence Score */}
        <div className="dark:bg-slate-900/80 bg-slate-50 rounded-xl p-3 border dark:border-slate-800 border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-500" /> Confidence
            </span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
              {metrics.confidenceScore}%
            </span>
          </div>
          <div className="my-2 h-2 rounded-full dark:bg-slate-800 bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
              style={{ width: `${metrics.confidenceScore}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            Sentiment convergence score
          </span>
        </div>

        {/* Weighted Approval Ratio */}
        <div className="dark:bg-slate-900/80 bg-slate-50 rounded-xl p-3 border dark:border-slate-800 border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-indigo-500" /> Weighted Tally
            </span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              {metrics.weightedApprovalRatio}%
            </span>
          </div>
          <div className="my-2 h-2 rounded-full dark:bg-slate-800 bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${metrics.weightedApprovalRatio}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            Adjusted by C-Suite weight coefficients
          </span>
        </div>
      </div>

      {/* Individual Agent Vote Cards */}
      <div className="dark:bg-slate-900/60 bg-slate-50/80 rounded-xl p-3.5 border dark:border-slate-800 border-slate-200">
        <h5 className="text-[11px] font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-2.5">
          Executive Voting Roll Call
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {agents.map((ag) => (
            <div
              key={ag.id}
              className="flex flex-col items-center text-center p-2 rounded-lg dark:bg-slate-950/60 bg-white border dark:border-slate-800 border-slate-200 shadow-sm"
            >
              <div className="relative mb-1">
                <img
                  src={ag.avatar}
                  alt={ag.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span
                  className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1 rounded-full dark:bg-slate-900 bg-slate-100"
                  style={{ color: ag.color }}
                >
                  {ag.shortTitle}
                </span>
              </div>
              <span className="text-[10px] font-medium dark:text-slate-300 text-slate-800 truncate w-full">
                {ag.name}
              </span>
              <span
                className={`text-[9px] font-bold mt-1 px-1.5 py-0.2 rounded-full ${
                  ag.currentVote === 'APPROVE'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : ag.currentVote === 'REJECT'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    : ag.currentVote === 'CONDITIONAL'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'dark:bg-slate-800 bg-slate-200 dark:text-slate-400 text-slate-600'
                }`}
              >
                {ag.currentVote}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Amendments (What to change to improve decision) */}
      <div className="dark:bg-slate-900/80 bg-slate-50 rounded-xl p-3.5 border dark:border-slate-800 border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            <h5 className="text-xs font-semibold dark:text-slate-200 text-slate-800 uppercase tracking-wider">
              Required Amendments To Maximize Success
            </h5>
          </div>
          <button
            onClick={onOpenMemoModal}
            className="text-[11px] text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2"
          >
            Export Memo
          </button>
        </div>
        <div className="space-y-1.5">
          {metrics.strategicAmendments.map((amendment, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2 rounded-lg dark:bg-slate-950/40 bg-white border dark:border-slate-800/80 border-slate-200 text-xs dark:text-slate-300 text-slate-700 shadow-sm"
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/10 text-blue-500 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{amendment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
