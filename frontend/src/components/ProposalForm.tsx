import React, { useRef } from 'react';
import { Upload, FileText, Image, Table, X, Play, Clock, Sparkles, Eraser, Info } from 'lucide-react';
import { UploadedFile } from '../types/boardroom';

interface ProposalFormProps {
  proposalText: string;
  setProposalText: (text: string) => void;
  rounds: number;
  setRounds: (rounds: number) => void;
  files: UploadedFile[];
  onAddFile: (file: UploadedFile) => void;
  onRemoveFile: (fileId: string) => void;
  onConveneBoard: () => void;
  onClearProposal: () => void;
  onLoadExample: (text: string) => void;
  isRunning: boolean;
}

export const ProposalForm: React.FC<ProposalFormProps> = ({
  proposalText,
  setProposalText,
  rounds,
  setRounds,
  files,
  onAddFile,
  onRemoveFile,
  onConveneBoard,
  onClearProposal,
  onLoadExample,
  isRunning
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleIdeas = [
    'I want to launch PhonePe in USA: good or bad idea?',
    'Should we replace all customer support with AI agents?',
    'Should we acquire a competitor for $45M in Europe?',
    'Should we invest $10M into building our own proprietary LLM?'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    let fileType: 'pdf' | 'csv' | 'image' | 'doc' = 'pdf';
    if (uploaded.name.endsWith('.csv') || uploaded.name.endsWith('.xlsx')) fileType = 'csv';
    else if (uploaded.name.match(/\.(png|jpg|jpeg|webp)$/i)) fileType = 'image';
    else if (uploaded.name.endsWith('.docx') || uploaded.name.endsWith('.txt')) fileType = 'doc';

    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: uploaded.name,
      size: uploaded.size,
      type: fileType,
      summary: `Uploaded document ingested for multi-agent examination: ${uploaded.name}`,
      relevantAgents: ['cfo', 'cto', 'legal']
    };

    onAddFile(newFile);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getFileIcon = (type: UploadedFile['type']) => {
    switch (type) {
      case 'csv': return <Table className="w-4 h-4 text-emerald-500" />;
      case 'image': return <Image className="w-4 h-4 text-cyan-500" />;
      default: return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="glass-panel rounded-2xl p-4 lg:p-5 border dark:border-slate-800 border-slate-200/80 shadow-xl transition-colors">
      <div className="flex flex-col gap-3.5">
        {/* Proposal Header & Rounds Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-bold">
              1
            </span>
            <h2 className="text-sm font-semibold dark:text-slate-200 text-slate-800 uppercase tracking-wider">
              Enter Your Strategic Proposal or Question
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Button */}
            {proposalText.trim() && !isRunning && (
              <button
                onClick={onClearProposal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg dark:bg-slate-900 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 text-[11px] font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border dark:border-slate-800 border-slate-200 transition"
                title="Clear current text to type your own question"
              >
                <Eraser className="w-3 h-3" />
                <span>Clear / Blank Slate</span>
              </button>
            )}

            {/* Rounds configuration */}
            <div className="flex items-center gap-2 dark:bg-slate-900/90 bg-slate-100 px-3 py-1 rounded-lg border dark:border-slate-800 border-slate-200 text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Debate Rounds:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRounds(r)}
                    disabled={isRunning}
                    title={
                      r === 1
                        ? '1 Round: Fast initial departmental stance'
                        : r === 2
                        ? '2 Rounds: Initial stance + Cross-examination rebuttals'
                        : '3 Rounds: Deep debate with final compromises & consensus'
                    }
                    className={`px-2.5 py-0.5 rounded text-xs font-semibold transition ${
                      rounds === r
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {r} {r === 1 ? 'Round' : 'Rounds'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Textarea Proposal */}
        <div className="relative">
          <textarea
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            disabled={isRunning}
            rows={3}
            placeholder="Type your strategic decision or question here (e.g. 'I want to launch PhonePe in USA: good or bad idea?' or 'Should we acquire a competitor for $45M?')..."
            className="w-full rounded-xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3.5 text-sm dark:text-slate-100 text-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition shadow-inner"
          />
        </div>

        {/* Sample Idea Quick Chips */}
        <div className="flex flex-wrap items-center gap-1.5 -mt-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Try an idea:
          </span>
          {sampleIdeas.map((idea, idx) => (
            <button
              key={idx}
              onClick={() => onLoadExample(idea)}
              disabled={isRunning}
              className="text-[11px] px-2.5 py-1 rounded-md dark:bg-slate-900 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 dark:border-slate-800 border-slate-200 border dark:text-slate-300 text-slate-700 transition"
            >
              &quot;{idea}&quot;
            </button>
          ))}
        </div>

        {/* Multimodal Upload Zone & Attached Files List */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t dark:border-slate-800/80 border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2">
            {/* Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.csv,.xlsx,.docx,.txt,.png,.jpg,.jpeg"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg dark:bg-slate-800/80 bg-slate-100 hover:dark:bg-slate-700/80 hover:bg-slate-200 border dark:border-slate-700 border-slate-300 text-xs font-medium dark:text-slate-300 text-slate-700 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-blue-500" />
              <span>Attach Pitch Deck / Financials / Image</span>
            </button>

            {/* Uploaded File Chips */}
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs dark:text-slate-300 text-slate-700"
              >
                {getFileIcon(file.type)}
                <span className="max-w-[150px] truncate font-medium text-[11px]">
                  {file.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  ({formatFileSize(file.size)})
                </span>
                {!isRunning && (
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="p-0.5 hover:text-rose-500 text-slate-400 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Convene Board CTA */}
          <button
            onClick={onConveneBoard}
            disabled={isRunning || !proposalText.trim()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Executive Chamber Deliberating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Convene Board Meeting</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
