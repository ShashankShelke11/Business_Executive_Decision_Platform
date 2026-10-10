import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ProposalForm } from './components/ProposalForm';
import { Boardroom3D } from './components/Boardroom3D';
import { DebateFeed } from './components/DebateFeed';
import { HumanIntervention } from './components/HumanIntervention';
import { MetricsPanel } from './components/MetricsPanel';
import { AgentWeightModal } from './components/AgentWeightModal';
import { ExecutiveMemoModal } from './components/ExecutiveMemoModal';
import { INITIAL_AGENTS } from './data/agents';
import { PRESET_SCENARIOS } from './data/presets';
import { SimulationEngine, SimulationState } from './services/simulationEngine';
import { AgentId, PresetScenario, UploadedFile } from './types/boardroom';

export const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Toggle theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initialize simulation engine
  const engine = useMemo(() => new SimulationEngine(INITIAL_AGENTS), []);

  const [simState, setSimState] = useState<SimulationState>({
    currentRound: 1,
    maxRounds: 3,
    activeSpeakerId: null,
    isRunning: false,
    isPaused: false,
    messages: [],
    agents: INITIAL_AGENTS,
    metrics: null,
    statusText: 'Board is seated and ready for proposal'
  });

  // Active scenario and form state
  const [activeScenario, setActiveScenario] = useState<PresetScenario>(PRESET_SCENARIOS[0]);
  const [proposalText, setProposalText] = useState<string>(PRESET_SCENARIOS[0].proposalText);
  const [rounds, setRounds] = useState<number>(3);
  const [attachedFiles, setAttachedFiles] = useState<UploadedFile[]>(PRESET_SCENARIOS[0].attachedFiles);
  const [isCustomProposal, setIsCustomProposal] = useState<boolean>(false);

  // Modals state
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  // Subscribe to engine state changes
  useEffect(() => {
    const unsubscribe = engine.subscribe((newState) => {
      setSimState(newState);

      // Trigger celebration confetti when consensus with approval is reached
      if (newState.metrics && !newState.isRunning && newState.metrics.finalVerdict.includes('APPROVED')) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.75 }
          });
        } catch {
          // Ignore if confetti not supported
        }
      }
    });

    return () => unsubscribe();
  }, [engine]);

  // Handle Scenario Selection
  const handleSelectScenario = (scenario: PresetScenario) => {
    engine.reset(INITIAL_AGENTS);
    setIsCustomProposal(false);
    setActiveScenario(scenario);
    setProposalText(scenario.proposalText);
    setAttachedFiles(scenario.attachedFiles);
  };

  const handleSelectCustom = () => {
    engine.reset(INITIAL_AGENTS);
    setIsCustomProposal(true);
    setProposalText('I want to launch PhonePe in USA: good or bad idea?');
    setAttachedFiles([]);
  };

  // Convene Board (Supports BOTH presets and custom user queries)
  const handleConveneBoard = async () => {
    if (isCustomProposal || proposalText.trim() !== activeScenario.proposalText.trim()) {
      // Dynamically synthesize tailored deliberation for ANY user question
      const generated = await engine.runCustomProposal(proposalText, attachedFiles, rounds);
      setActiveScenario(generated);
      setIsCustomProposal(true);
    } else {
      // Run pre-packaged scenario
      engine.runScenario(activeScenario, rounds);
    }
  };

  // Clear Proposal
  const handleClearProposal = () => {
    engine.reset(INITIAL_AGENTS);
    setIsCustomProposal(true);
    setProposalText('');
    setAttachedFiles([]);
  };

  // Load Example Idea
  const handleLoadExample = (text: string) => {
    engine.reset(INITIAL_AGENTS);
    setIsCustomProposal(true);
    setProposalText(text);
    setAttachedFiles([]);
  };

  // Add / Remove Files
  const handleAddFile = (file: UploadedFile) => {
    setAttachedFiles((prev) => [...prev, file]);
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Human intervention directive
  const handleInjectDirective = (directive: string) => {
    engine.injectHumanDirective(directive);
  };

  // Update Agent Weights
  const handleUpdateWeight = (id: AgentId, weight: number) => {
    engine.updateAgentWeight(id, weight);
  };

  const handleResetWeights = () => {
    INITIAL_AGENTS.forEach((ag) => engine.updateAgentWeight(ag.id, ag.defaultWeight));
  };

  const handleReset = () => {
    engine.reset(INITIAL_AGENTS);
  };

  return (
    <div className="min-h-screen dark:bg-[#07090E] bg-slate-100 dark:text-slate-100 text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar Header */}
      <Header
        statusText={simState.statusText}
        isRunning={simState.isRunning}
        hasMetrics={!!simState.metrics}
        scenarios={PRESET_SCENARIOS}
        activeScenarioId={activeScenario.id}
        isCustomProposal={isCustomProposal}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onSelectScenario={handleSelectScenario}
        onSelectCustom={handleSelectCustom}
        onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
        onOpenMemoModal={() => setIsMemoModalOpen(true)}
        onReset={handleReset}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Step 1: Proposal Form & Multimodal File Ingestion */}
        <ProposalForm
          proposalText={proposalText}
          setProposalText={(t) => {
            setProposalText(t);
            if (t.trim() !== activeScenario.proposalText.trim()) {
              setIsCustomProposal(true);
            }
          }}
          rounds={rounds}
          setRounds={(r) => {
            setRounds(r);
            engine.setMaxRounds(r);
          }}
          files={attachedFiles}
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
          onConveneBoard={handleConveneBoard}
          onClearProposal={handleClearProposal}
          onLoadExample={handleLoadExample}
          isRunning={simState.isRunning}
        />

        {/* Step 2: Main Grid: 3D Boardroom (Left) & Live Debate Feed (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 3D Boardroom Visualization + Human Intervention */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex-1 min-h-[440px]">
              <Boardroom3D
                agents={simState.agents}
                activeSpeakerId={simState.activeSpeakerId}
              />
            </div>

            {/* Human in the loop Intervention Bar */}
            <HumanIntervention
              onInjectDirective={handleInjectDirective}
              isMeetingActive={simState.isRunning || simState.messages.length > 0}
            />
          </div>

          {/* Right Column: Live Transcript / Conversation Stream */}
          <div className="lg:col-span-5 h-[580px]">
            <DebateFeed
              messages={simState.messages}
              agents={simState.agents}
              activeSpeakerId={simState.activeSpeakerId}
              isRunning={simState.isRunning}
            />
          </div>
        </div>

        {/* Step 3: Consensus Analytics & Strategic Amendments */}
        <MetricsPanel
          metrics={simState.metrics}
          agents={simState.agents}
          onOpenMemoModal={() => setIsMemoModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t dark:border-slate-900 border-slate-200 dark:bg-[#06080D] bg-white py-4 text-center text-xs dark:text-slate-500 text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Boardmind AI • Autonomous Multi-Agent Executive Decision Platform</span>
          <span>BTech Final Year Capstone Project Review 2 Demo</span>
        </div>
      </footer>

      {/* Modals */}
      <AgentWeightModal
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
        agents={simState.agents}
        onUpdateWeight={handleUpdateWeight}
        onResetWeights={handleResetWeights}
      />

      <ExecutiveMemoModal
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        metrics={simState.metrics}
        agents={simState.agents}
        scenario={activeScenario}
        proposalText={proposalText}
      />
    </div>
  );
};

export default App;
