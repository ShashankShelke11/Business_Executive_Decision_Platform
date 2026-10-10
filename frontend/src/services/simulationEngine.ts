import { Agent, AgentId, BoardMetrics, DebateMessage, PresetScenario, UploadedFile, VoteType } from '../types/boardroom';
import { generateDeliberationForProposal } from './proposalGenerator';

export interface SimulationState {
  currentRound: number;
  maxRounds: number;
  activeSpeakerId: AgentId | null;
  isRunning: boolean;
  isPaused: boolean;
  messages: DebateMessage[];
  agents: Agent[];
  metrics: BoardMetrics | null;
  statusText: string;
}

export type StateListener = (state: SimulationState) => void;

export class SimulationEngine {
  private state: SimulationState;
  private listeners: Set<StateListener> = new Set();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private abortController: AbortController | null = null;

  constructor(initialAgents: Agent[]) {
    this.state = {
      currentRound: 1,
      maxRounds: 3,
      activeSpeakerId: null,
      isRunning: false,
      isPaused: false,
      messages: [],
      agents: [...initialAgents],
      metrics: null,
      statusText: 'Board is seated and ready for proposal'
    };
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public setMaxRounds(rounds: number) {
    this.state.maxRounds = rounds;
    this.notify();
  }

  public updateAgentWeight(agentId: AgentId, weight: number) {
    this.state.agents = this.state.agents.map((agent) =>
      agent.id === agentId ? { ...agent, currentWeight: weight } : agent
    );
    // Recalculate metrics if session exists
    if (this.state.metrics) {
      this.recalculateWeightedMetrics();
    }
    this.notify();
  }

  public reset(initialAgents: Agent[]) {
    this.stop();
    this.state = {
      currentRound: 1,
      maxRounds: this.state.maxRounds,
      activeSpeakerId: null,
      isRunning: false,
      isPaused: false,
      messages: [],
      agents: initialAgents.map((a) => ({ ...a, currentVote: 'PENDING', isSpeaking: false })),
      metrics: null,
      statusText: 'Board is seated and ready for proposal'
    };
    this.notify();
  }

  public stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.state.isRunning = false;
    this.state.activeSpeakerId = null;
    this.state.agents = this.state.agents.map((a) => ({ ...a, isSpeaking: false }));
    this.notify();
  }

  public async runCustomProposal(proposalText: string, files: UploadedFile[] = [], maxRounds: number = 3): Promise<PresetScenario> {
    const generatedScenario = generateDeliberationForProposal(proposalText, files, maxRounds);
    await this.runScenario(generatedScenario, maxRounds);
    return generatedScenario;
  }

  public async runScenario(scenario: PresetScenario, maxRounds: number = 3) {
    this.stop();
    this.state.isRunning = true;
    this.state.maxRounds = maxRounds;
    this.state.messages = [];
    this.state.currentRound = 1;
    this.state.metrics = null;
    this.abortController = new AbortController();

    // Iterate through requested rounds (up to maxRounds or scenario.roundsData.length)
    const totalRoundsToRun = Math.min(maxRounds, scenario.roundsData.length);

    for (let rIdx = 0; rIdx < totalRoundsToRun; rIdx++) {
      const roundObj = scenario.roundsData[rIdx];
      this.state.currentRound = roundObj.round;
      this.state.statusText = `Deliberating Round ${roundObj.round} of ${totalRoundsToRun}`;
      this.notify();

      for (const msgData of roundObj.messages) {
        if (!this.state.isRunning) return;

        // Set active speaking agent
        const speakingAgentId = msgData.agentId as AgentId;
        this.state.activeSpeakerId = speakingAgentId;
        this.state.agents = this.state.agents.map((a) => ({
          ...a,
          isSpeaking: a.id === speakingAgentId,
          currentVote: (msgData.stance === 'NEUTRAL' ? a.currentVote : msgData.stance) as VoteType
        }));
        this.state.statusText = `${this.getAgentTitle(speakingAgentId)} has the floor...`;
        this.notify();

        // Simulate speaking duration
        await this.delay(2200);
        if (!this.state.isRunning) return;

        // Push message to feed
        const newMsg: DebateMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          agentId: speakingAgentId,
          round: roundObj.round,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          content: msgData.content,
          stance: msgData.stance,
          keyArguments: msgData.keyArguments,
          citedDocumentSnippet: msgData.citedDocumentSnippet,
          targetedAgentId: msgData.targetedAgentId
        };

        this.state.messages = [...this.state.messages, newMsg];
        this.notify();

        // Brief transition pause
        await this.delay(800);
      }
    }

    // End of debate: finalize consensus and score metrics
    this.state.activeSpeakerId = null;
    this.state.agents = this.state.agents.map((a) => ({ ...a, isSpeaking: false }));
    this.state.isRunning = false;
    this.state.metrics = scenario.finalMetrics;
    this.state.statusText = 'Consensus reached. Final Board Resolution ready.';
    this.recalculateWeightedMetrics();
    this.notify();
  }

  public injectHumanDirective(text: string) {
    if (!text.trim()) return;

    // Add human message to feed
    const humanMsg: DebateMessage = {
      id: `msg-human-${Date.now()}`,
      agentId: 'human',
      round: this.state.currentRound,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text,
      stance: 'NEUTRAL',
      keyArguments: ['Direct Chairman Constraint / Executive Guidance']
    };

    this.state.messages = [...this.state.messages, humanMsg];
    this.notify();

    // Trigger reactive response from CEO acknowledging the chairman's instruction
    setTimeout(() => {
      if (!this.state.isRunning && !this.state.metrics) return;
      
      const ceoMsg: DebateMessage = {
        id: `msg-ceo-ack-${Date.now()}`,
        agentId: 'ceo',
        round: this.state.currentRound,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Acknowledging Chairman's directive: "${text}". All members will align risk calculations and execution boundaries accordingly.`,
        stance: 'APPROVE',
        keyArguments: ['Chairman directive acknowledged and incorporated into board records']
      };
      
      this.state.messages = [...this.state.messages, ceoMsg];
      this.notify();
    }, 1200);
  }

  private recalculateWeightedMetrics() {
    if (!this.state.metrics) return;

    // Sum weighted votes
    let totalWeight = 0;
    let weightedScore = 0;
    let approves = 0;
    let rejects = 0;
    let conditionals = 0;

    this.state.agents.forEach((agent) => {
      const weight = agent.currentWeight || 1.0;
      totalWeight += weight;

      if (agent.currentVote === 'APPROVE') {
        approves++;
        weightedScore += 1.0 * weight;
      } else if (agent.currentVote === 'CONDITIONAL') {
        conditionals++;
        weightedScore += 0.5 * weight;
      } else if (agent.currentVote === 'REJECT') {
        rejects++;
        weightedScore += 0 * weight;
      }
    });

    const ratio = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 75;

    this.state.metrics = {
      ...this.state.metrics,
      weightedApprovalRatio: ratio,
      votingTally: {
        approve: approves,
        reject: rejects,
        conditional: conditionals
      }
    };
  }

  private getAgentTitle(agentId: AgentId): string {
    const ag = this.state.agents.find((a) => a.id === agentId);
    return ag ? `${ag.name} (${ag.shortTitle})` : agentId.toUpperCase();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
