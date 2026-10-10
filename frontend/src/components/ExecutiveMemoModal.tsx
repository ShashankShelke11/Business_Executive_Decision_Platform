import React from 'react';
import { X, Printer, ShieldCheck, FileText } from 'lucide-react';
import { Agent, BoardMetrics, PresetScenario } from '../types/boardroom';

interface ExecutiveMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: BoardMetrics | null;
  agents: Agent[];
  scenario: PresetScenario | null;
  proposalText: string;
}

export const ExecutiveMemoModal: React.FC<ExecutiveMemoModalProps> = ({
  isOpen,
  onClose,
  metrics,
  agents,
  scenario,
  proposalText
}) => {
  if (!isOpen || !metrics) return null;

  const handlePrint = () => {
    window.print();
  };

  const resolutionNumber = `BM-RES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 dark:bg-slate-900 bg-white border dark:border-slate-700/80 border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 dark:text-slate-100 text-slate-900 print:bg-white print:text-black print:border-none print:shadow-none print:p-0 transition-colors">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-slate-800 border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold dark:text-slate-200 text-slate-800 uppercase tracking-wider">
              Official Executive Resolution Memorandum
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg dark:text-slate-400 text-slate-500 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-slate-800 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document Content */}
        <div className="pt-6 space-y-6">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 dark:border-slate-800 border-slate-200 print:border-black">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600 print:text-black" />
                <h1 className="text-2xl font-black tracking-tight dark:text-slate-100 text-slate-900 print:text-black">
                  BOARDMIND ENTERPRISE GOVERNANCE
                </h1>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-500 print:text-gray-600 uppercase tracking-widest mt-0.5 font-medium">
                Multi-Agent Autonomous Executive Decision Record
              </p>
            </div>
            <div className="text-right text-xs">
              <p className="font-mono font-bold text-blue-500 print:text-black">{resolutionNumber}</p>
              <p className="dark:text-slate-400 text-slate-500 print:text-gray-600">{currentDate}</p>
            </div>
          </div>

          {/* Proposal Section */}
          <div>
            <h4 className="text-xs font-bold dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-1 print:text-black">
              I. Deliberated Proposal
            </h4>
            <div className="p-3.5 rounded-xl dark:bg-slate-950/70 bg-slate-50 border dark:border-slate-800 border-slate-200 print:bg-gray-100 print:border-gray-300 text-sm font-medium leading-relaxed">
              &quot;{proposalText || scenario?.proposalText}&quot;
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-4 rounded-xl border border-blue-500/30 dark:bg-blue-950/20 bg-blue-50 print:border-black print:bg-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold dark:text-slate-400 text-slate-600 print:text-black uppercase">
                Official Determination
              </span>
              <h2 className="text-xl font-black text-blue-600 dark:text-blue-400 print:text-black mt-0.5">
                {metrics.finalVerdict}
              </h2>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <span className="text-[10px] dark:text-slate-400 text-slate-600 print:text-black uppercase block">Confidence</span>
                <span className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400 print:text-black">
                  {metrics.confidenceScore}%
                </span>
              </div>
              <div>
                <span className="text-[10px] dark:text-slate-400 text-slate-600 print:text-black uppercase block">Risk Index</span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 print:text-black">
                  {metrics.riskScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Roll Call Votes */}
          <div>
            <h4 className="text-xs font-bold dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-2 print:text-black">
              II. Roll Call & Weighted Votes
            </h4>
            <table className="w-full text-xs border dark:border-slate-800 border-slate-200 print:border-black">
              <thead className="dark:bg-slate-950 bg-slate-100 dark:text-slate-400 text-slate-600 print:bg-gray-200 print:text-black">
                <tr>
                  <th className="p-2 text-left">Executive</th>
                  <th className="p-2 text-left">Department</th>
                  <th className="p-2 text-center">Weight</th>
                  <th className="p-2 text-right">Recorded Vote</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800 divide-slate-200 print:divide-black">
                {agents.map((ag) => (
                  <tr key={ag.id} className="hover:dark:bg-slate-950/30 hover:bg-slate-50">
                    <td className="p-2 font-medium">
                      {ag.name} ({ag.shortTitle})
                    </td>
                    <td className="p-2 dark:text-slate-400 text-slate-500 print:text-black">{ag.department}</td>
                    <td className="p-2 text-center font-mono">{ag.currentWeight}x</td>
                    <td className="p-2 text-right font-bold">
                      <span
                        className={
                          ag.currentVote === 'APPROVE'
                            ? 'text-emerald-500 print:text-black'
                            : ag.currentVote === 'REJECT'
                            ? 'text-rose-500 print:text-black'
                            : 'text-amber-500 print:text-black'
                        }
                      >
                        {ag.currentVote}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mandatory Amendments */}
          <div>
            <h4 className="text-xs font-bold dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-2 print:text-black">
              III. Enacted Directives & Execution Conditions
            </h4>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs dark:text-slate-300 text-slate-700 print:text-black">
              {metrics.strategicAmendments.map((am, idx) => (
                <li key={idx} className="leading-relaxed">
                  {am}
                </li>
              ))}
            </ol>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t dark:border-slate-800 border-slate-200 print:border-black grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="border-b dark:border-slate-600 border-slate-400 print:border-black pb-1 mb-1 text-sm italic text-blue-500 print:text-black font-serif">
                Human Board Chair
              </div>
              <p className="font-bold">Board Chairperson (Presiding Officer)</p>
              <p className="text-[10px] dark:text-slate-500 text-slate-400 print:text-gray-600">Executive Committee</p>
            </div>
            <div>
              <div className="border-b dark:border-slate-600 border-slate-400 print:border-black pb-1 mb-1 text-sm italic text-blue-500 print:text-black font-serif">
                Eleanor Roosevelt-Shaw
              </div>
              <p className="font-bold">Eleanor Roosevelt-Shaw (CLO)</p>
              <p className="text-[10px] dark:text-slate-500 text-slate-400 print:text-gray-600">Chief Legal Counsel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
