import { Agent } from '../types/boardroom';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'ceo',
    name: 'Alexandra Vance',
    role: 'Chief Executive Officer',
    shortTitle: 'CEO',
    department: 'Executive Strategy & Vision',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    color: '#3B82F6', // Blue
    accentBg: 'rgba(59, 130, 246, 0.15)',
    focusAreas: ['Enterprise Value', 'Long-term Moat', 'Market Dominance', 'Company Culture'],
    defaultWeight: 1.3,
    currentWeight: 1.3,
    currentVote: 'PENDING',
    isSpeaking: false,
    tablePosition: [0, 0, -2.8],
    rotationY: 0
  },
  {
    id: 'cfo',
    name: 'Marcus Sterling',
    role: 'Chief Financial Officer',
    shortTitle: 'CFO',
    department: 'Finance & Capital Allocation',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    color: '#10B981', // Emerald
    accentBg: 'rgba(16, 185, 129, 0.15)',
    focusAreas: ['Cash Runway', 'Gross Margins', 'IRR / ROI', 'Debt Covenants'],
    defaultWeight: 1.4,
    currentWeight: 1.4,
    currentVote: 'PENDING',
    isSpeaking: false,
    tablePosition: [-2.4, 0, -1.0],
    rotationY: Math.PI / 2
  },
  {
    id: 'cto',
    name: 'Dr. Evelyn Chen',
    role: 'Chief Technology Officer',
    shortTitle: 'CTO',
    department: 'Engineering & R&D',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    color: '#06B6D4', // Cyan
    accentBg: 'rgba(6, 182, 212, 0.15)',
    focusAreas: ['System Scalability', 'Tech Debt', 'Infrastructure CapEx', 'Data Security'],
    defaultWeight: 1.3,
    currentWeight: 1.3,
    currentVote: 'PENDING',
    isSpeaking: false,
    tablePosition: [2.4, 0, -1.0],
    rotationY: -Math.PI / 2
  },
  {
    id: 'cmo',
    name: 'Devon Wright',
    role: 'Chief Marketing Officer',
    shortTitle: 'CMO',
    department: 'Brand & Growth Strategy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    color: '#F59E0B', // Amber
    accentBg: 'rgba(245, 158, 11, 0.15)',
    focusAreas: ['Market Share', 'Customer Acquisition Cost (CAC)', 'Brand Equity', 'Go-To-Market'],
    defaultWeight: 1.1,
    currentWeight: 1.1,
    currentVote: 'PENDING',
    isSpeaking: false,
    tablePosition: [2.4, 0, 1.2],
    rotationY: -Math.PI / 2
  },
  {
    id: 'legal',
    name: 'Eleanor Roosevelt-Shaw',
    role: 'Chief Legal Officer',
    shortTitle: 'CLO',
    department: 'Legal & Regulatory Compliance',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    color: '#8B5CF6', // Purple
    accentBg: 'rgba(139, 92, 246, 0.15)',
    focusAreas: ['Regulatory Compliance (GDPR/HIPAA)', 'Intellectual Property', 'Antitrust Liability', 'Contract Law'],
    defaultWeight: 1.4,
    currentWeight: 1.4,
    currentVote: 'PENDING',
    isSpeaking: false,
    tablePosition: [-2.4, 0, 1.2],
    rotationY: Math.PI / 2
  },
  {
    id: 'risk',
    name: 'Vikram Sethi',
    role: 'Chief Risk Officer',
    shortTitle: 'CRO',
    department: 'Enterprise Risk & Governance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    color: '#EF4444', // Red
    accentBg: 'rgba(239, 68, 68, 0.15)',
    focusAreas: ['Black Swan Exposure', 'Operational Redundancy', 'Systemic Volatility', 'Downside Protection'],
    defaultWeight: 1.3,
    currentWeight: 1.3,
    currentVote: 'PENDING',
    isSpeaking: false,
    tablePosition: [0, 0, 2.8],
    rotationY: Math.PI
  }
];
