export type AgentId = 'ceo' | 'cfo' | 'cto' | 'cmo' | 'legal' | 'risk';

export type VoteType = 'APPROVE' | 'REJECT' | 'CONDITIONAL' | 'PENDING';

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  shortTitle: string;
  department: string;
  avatar: string;
  color: string;
  accentBg: string;
  focusAreas: string[];
  defaultWeight: number;
  currentWeight: number;
  currentVote: VoteType;
  isSpeaking: boolean;
  tablePosition: [number, number, number]; // [x, y, z] for 3D coordinates
  rotationY: number; // facing angle
}

export interface DebateMessage {
  id: string;
  agentId: AgentId | 'human';
  round: number;
  timestamp: string;
  content: string;
  stance: 'APPROVE' | 'REJECT' | 'CONDITIONAL' | 'NEUTRAL';
  keyArguments: string[];
  citedDocumentSnippet?: string;
  targetedAgentId?: AgentId;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: 'pdf' | 'csv' | 'image' | 'doc';
  previewUrl?: string;
  summary: string;
  relevantAgents: AgentId[];
}

export interface RiskBreakdown {
  financial: number;
  technical: number;
  regulatory: number;
  market: number;
}

export interface BoardMetrics {
  riskScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  weightedApprovalRatio: number; // 0 - 100
  riskCategories: RiskBreakdown;
  votingTally: {
    approve: number;
    reject: number;
    conditional: number;
  };
  finalVerdict: 'APPROVED' | 'APPROVED WITH CONDITIONS' | 'REJECTED' | 'DELIBERATING';
  verdictRationale: string;
  strategicAmendments: string[];
}

export interface PresetScenario {
  id: string;
  title: string;
  category: string;
  badgeColor: string;
  proposalText: string;
  attachedFiles: UploadedFile[];
  summary: string;
  roundsData: {
    round: number;
    messages: Omit<DebateMessage, 'id' | 'timestamp'>[];
  }[];
  finalMetrics: BoardMetrics;
}
