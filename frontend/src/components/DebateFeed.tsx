import React, { useState } from 'react';
import { MessageSquare, CheckCircle, XCircle, AlertCircle, Quote, FileSearch, ArrowRight } from 'lucide-react';
import { Agent, AgentId, DebateMessage } from '../types/boardroom';

interface DebateFeedProps {
  messages: DebateMessage[];
  agents: Agent[];
  activeSpeakerId: AgentId | null;
  isRunning: boolean;
}

export const DebateFeed: React.FC<DebateFeedProps> = ({
  messages,
  agents,
  activeSpeakerId,
  isRunning
}) => {
  const [selectedRoundTab, setSelectedRoundTab] = useState<number | 'all'>('all');

  const filteredMessages = selectedRoundTab === 'all'
    ? messages
    : messages.filter((m) => m.round === selectedRoundTab);

  const getAgent = (agentId: AgentId | 'human'): Agent | null => {
    if (agentId === 'human') return null;
    return agents.find((a) => a.id === agentId) || null;
  };

  const getStanceBadge = (stance: DebateMessage['stance']) => {
    switch (stance) {
      case 'APPROVE':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            APPROVE
          </span>
        );
      case 'REJECT':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
            <XCircle className="w-3 h-3 text-rose-500" />
            REJECT
          </span>
        );
      case 'CONDITIONAL':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-3 h-3 text-amber-500" />
            CONDITIONAL
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium dark:bg-slate-800 bg-slate-200 dark:text-slate-400 text-slate-600">
            DIRECTIVE
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full dark:bg-[#0D111A]/90 bg-white rounded-2xl border dark:border-slate-800/80 border-slate-200 shadow-xl overflow-hidden transition-colors">
      {/* Header with Round Filter Tabs */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-slate-50">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-semibold dark:text-slate-200 text-slate-800 uppercase tracking-wider">
            Live Deliberation Transcript
          </h3>
          <span className="text-[11px] dark:text-slate-400 text-slate-500 font-mono">
            ({messages.length} interventions)
          </span>
        </div>

        {/* Round Filter Tabs */}
        <div className="flex items-center gap-1 dark:bg-slate-950/80 bg-slate-200/80 p-0.5 rounded-lg border dark:border-slate-800 border-slate-300 text-[11px]">
          <button
            onClick={() => setSelectedRoundTab('all')}
            title="View entire chronological debate"
            className={`px-2 py-0.5 rounded-md font-medium transition ${
              selectedRoundTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900'
            }`}
          >
            All
          </button>
          {[1, 2, 3].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedRoundTab(tab)}
              title={
                tab === 1
                  ? 'Filter: Round 1 (Initial Perspectives)'
                  : tab === 2
                  ? 'Filter: Round 2 (Cross-Examinations & Rebuttals)'
                  : 'Filter: Round 3 (Compromises & Final Consensus)'
              }
              className={`px-2 py-0.5 rounded-md font-medium transition ${
                selectedRoundTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900'
              }`}
            >
              R{tab}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[520px]">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
            <Quote className="w-8 h-8 stroke-1 text-slate-400 dark:text-slate-600 mb-2" />
            <p className="text-xs font-medium dark:text-slate-400 text-slate-600">No active debate records yet.</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Enter any proposal or question and click &quot;Convene Board Meeting&quot;.
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const agent = getAgent(msg.agentId);
            const isHuman = msg.agentId === 'human';
            const isSpeakingNow = msg.agentId === activeSpeakerId;

            return (
              <div
                key={msg.id}
                className={`relative rounded-xl p-3.5 border transition-all ${
                  isSpeakingNow
                    ? 'dark:bg-blue-950/20 bg-blue-50/80 dark:border-blue-500/50 border-blue-400 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30'
                    : isHuman
                    ? 'dark:bg-indigo-950/20 bg-indigo-50/80 dark:border-indigo-500/40 border-indigo-300'
                    : 'dark:bg-slate-900/60 bg-slate-50/80 dark:border-slate-800 border-slate-200/90 hover:dark:border-slate-700/80 hover:border-slate-300'
                }`}
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar */}
                    {isHuman ? (
                      <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-400/30">
                        YOU
                      </div>
                    ) : agent ? (
                      <div className="relative">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-7 h-7 rounded-full object-cover border-2"
                          style={{ borderColor: agent.color }}
                        />
                        {isSpeakingNow && (
                          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                          </span>
                        )}
                      </div>
                    ) : null}

                    {/* Agent Name & Dept */}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold dark:text-slate-100 text-slate-800">
                          {isHuman ? 'Human Board Chairman (You)' : agent?.name}
                        </span>
                        {!isHuman && agent && (
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.2 rounded"
                            style={{ backgroundColor: agent.accentBg, color: agent.color }}
                          >
                            {agent.shortTitle}
                          </span>
                        )}
                        {msg.targetedAgentId && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-500">
                            <ArrowRight className="w-2.5 h-2.5" />
                            Addressing @{msg.targetedAgentId.toUpperCase()}
                          </span>
                        )}
                      </div>
                      {!isHuman && agent && (
                        <p className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">
                          {agent.department}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stance Badge & Round */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      R{msg.round} • {msg.timestamp}
                    </span>
                    {getStanceBadge(msg.stance)}
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-xs dark:text-slate-200 text-slate-700 leading-relaxed pl-9">
                  {msg.content}
                </p>

                {/* Document Citation Snippet */}
                {msg.citedDocumentSnippet && (
                  <div className="mt-2.5 ml-9 flex items-start gap-2 p-2 rounded-lg dark:bg-blue-950/30 bg-blue-50 dark:border-blue-500/20 border-blue-200 text-[11px] dark:text-blue-300 text-blue-700">
                    <FileSearch className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="italic font-mono">{msg.citedDocumentSnippet}</span>
                  </div>
                )}

                {/* Key Argument Badges */}
                {msg.keyArguments && msg.keyArguments.length > 0 && (
                  <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5">
                    {msg.keyArguments.map((arg, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded dark:bg-slate-800/80 bg-slate-100 border dark:border-slate-700/60 border-slate-200 text-[10px] dark:text-slate-300 text-slate-700 font-medium"
                      >
                        • {arg}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
