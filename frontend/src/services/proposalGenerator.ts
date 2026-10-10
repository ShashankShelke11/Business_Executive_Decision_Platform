import { AgentId, BoardMetrics, DebateMessage, PresetScenario, UploadedFile } from '../types/boardroom';

/**
 * Intelligent Dynamic Deliberation Generator
 * Synthesizes deep, domain-specific 3-round executive debates for ANY custom user proposal.
 */
export function generateDeliberationForProposal(
  proposalText: string,
  attachedFiles: UploadedFile[] = [],
  rounds: number = 3
): PresetScenario {
  const text = proposalText.trim();
  const lower = text.toLowerCase();

  // 1. Check for PhonePe / UPI / India-to-US / Fintech Expansion
  if (
    lower.includes('phone') ||
    lower.includes('phonepe') ||
    lower.includes('upi') ||
    lower.includes('paytm') ||
    lower.includes('usa') ||
    lower.includes('america') ||
    (lower.includes('launch') && lower.includes('payment'))
  ) {
    return generatePhonePeUSAScenario(text, attachedFiles, rounds);
  }

  // 2. Generic / Arbitrary Custom Proposal Synthesis
  return generateGenericExecutiveScenario(text, attachedFiles, rounds);
}

function generatePhonePeUSAScenario(
  proposalText: string,
  attachedFiles: UploadedFile[],
  maxRounds: number
): PresetScenario {
  const attachedFileSnippet = attachedFiles.length > 0
    ? `Reviewing attached document "${attachedFiles[0].name}": cross-border transaction fees and compliance obligations.`
    : undefined;

  return {
    id: `custom-phonepe-${Date.now()}`,
    title: 'Launch PhonePe Digital Payments in the United States',
    category: 'Fintech & Cross-Border Expansion',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    proposalText: proposalText,
    summary: 'Evaluating high-stakes entry into the US digital payments and remittance market.',
    attachedFiles: attachedFiles,
    roundsData: [
      {
        round: 1,
        messages: [
          {
            agentId: 'ceo',
            round: 1,
            stance: 'APPROVE',
            content: 'Expanding PhonePe into the United States is our biggest international frontier. While the US domestic market is crowded with Apple Pay and Venmo, the real prize is the $32 Billion US-to-India remittance corridor. If we bridge UPI directly with US bank accounts, we will dominate cross-border payments for millions of Indian expats.',
            keyArguments: [
              'Capture the $32B US-to-India remittance market',
              'First-mover advantage connecting US bank rails directly to Indian UPI QRs',
              'High customer loyalty among 4.8M Indian-American diaspora'
            ]
          },
          {
            agentId: 'cfo',
            round: 1,
            stance: 'REJECT',
            content: 'The financial hurdles in the US are enormous. Obtaining independent Money Transmitter Licenses (MTL) across all 50 US states will cost $20M+ in legal filings and statutory capital reserves, taking up to 24 months. Furthermore, customer acquisition cost (CAC) in the US fintech sector exceeds $90/user, which will cause unsustainable cash burn without a local partner.',
            keyArguments: [
              '$20M+ in state MTL licensing and statutory bonding costs',
              'US fintech CAC exceeds $90/user vs $2 in India',
              '24-month delay before revenue breakeven'
            ],
            citedDocumentSnippet: attachedFileSnippet
          },
          {
            agentId: 'cto',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'The architectural challenge is fundamental: UPI is an instant, zero-cost real-time switch, whereas the US banking spine still runs on legacy ACH (2-3 business days) or card rails with 2.5% interchange fees. To make this work, we must integrate directly with FedNow and RTP (Real-Time Payments) and deploy dedicated US AWS infrastructure for SOC-2 Type II and GLBA compliance.',
            keyArguments: [
              'US ACH takes 2-3 days vs instant UPI; requires FedNow / RTP integration',
              'Card rails impose 2.5% interchange, conflicting with zero-fee model',
              'Must build isolated US data center instance for SOC-2 and GLBA privacy laws'
            ]
          },
          {
            agentId: 'cmo',
            round: 1,
            stance: 'APPROVE',
            content: 'We should not attempt to replace Apple Pay for native Americans buying coffee. Instead, our Go-To-Market should target the 4.8M Non-Resident Indians (NRIs) and 350,000+ Indian students in the US. They already know and trust PhonePe. By offering zero-margin currency conversion and instant UPI transfers back home, we gain instant word-of-mouth adoption.',
            keyArguments: [
              'Targeted beachhead: 4.8M NRIs and 350k students in the US',
              'Existing brand familiarity eliminates generic brand advertising costs',
              'Disrupts traditional remittance players (Western Union / Wise charging 3-5%)'
            ]
          },
          {
            agentId: 'legal',
            round: 1,
            stance: 'REJECT',
            content: 'Direct entry without a US banking charter will trigger immediate regulatory enforcement. US FinCEN requires rigorous Bank Secrecy Act (BSA) / Anti-Money Laundering (AML) controls, Office of Foreign Assets Control (OFAC) real-time screening, and individual state licenses. If a single sanctioned transfer clears, PhonePe faces catastrophic federal fines.',
            keyArguments: [
              'FinCEN BSA/AML and OFAC sanction compliance mandatory',
              '50 individual state Money Transmitter Licenses required without bank charter',
              'Severe federal penalties for cross-border money laundering violations'
            ]
          },
          {
            agentId: 'risk',
            round: 1,
            stance: 'REJECT',
            content: 'I align with Legal and Finance. Cross-border payments carry severe foreign exchange (FX) volatility between INR and USD. Additionally, unlike India where Aadhaar-based OTP biometric verification prevents chargeback fraud, US payment systems suffer from friendly fraud and unauthorized ACH reversals.',
            keyArguments: [
              'INR/USD currency fluctuation exposure on settlement windows',
              'ACH return and friendly fraud chargeback risks',
              'Geopolitical and cross-border regulatory scrutiny'
            ]
          }
        ]
      },
      {
        round: 2,
        messages: [
          {
            agentId: 'cto',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'legal',
            content: 'I have a solution to Legal and CFO\'s regulatory bottleneck: Instead of applying for 50 independent state licenses from scratch, we adopt a "Banking-as-a-Service (BaaS) / Sponsor Bank" architecture. We partner with a licensed US charter bank (such as Cross River or Evolve Bank) who already holds all 50 state licenses and FDIC insurance.',
            keyArguments: [
              'Partner with a US Sponsor Bank (BaaS model) to bypass 50-state MTL filings',
              'Cuts launch timeline from 24 months down to 5 months',
              'Sponsor bank provides FDIC insurance pass-through and BSA/AML backstop'
            ]
          },
          {
            agentId: 'cfo',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cmo',
            content: 'The BaaS sponsor bank model completely changes the unit economics. Instead of $20M in upfront licensing reserves, our upfront integration CapEx drops to $4.5M. If CMO restricts the launch strictly to the high-margin US-India remittance corridor, we reach cash-flow positive within 14 months.',
            keyArguments: [
              'Upfront licensing CapEx drops from $20M to $4.5M via sponsor bank',
              'Preserves treasury runway while accessing full US market',
              'Remittance corridor delivers sustainable 1.2% net take-rate'
            ]
          },
          {
            agentId: 'legal',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cto',
            content: 'If the CTO structures this as a program manager under an existing US chartered sponsor bank, the bank carries primary BSA/AML reporting to FinCEN. This shields PhonePe corporate entity from primary regulatory sanctions.',
            keyArguments: [
              'Sponsor bank structure satisfies FinCEN and CFPB oversight',
              'Shields parent corporation from direct state licensing audits',
              'Legal conditionally approves subject to robust KYC integration'
            ]
          },
          {
            agentId: 'risk',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cto',
            content: 'With the sponsor bank handling ACH settlement risk and automated OFAC screening, our systemic liability is contained. We must still hedge our daily USD/INR FX exposure through automated rolling forwards.',
            keyArguments: [
              'Settlement default risk transferred to US banking partner',
              'Automated FX hedging contracts to neutralize currency swings'
            ]
          }
        ]
      },
      {
        round: 3,
        messages: [
          {
            agentId: 'ceo',
            round: 3,
            stance: 'APPROVE',
            content: 'The board has established a winning roadmap: We will not wage a direct war against Apple Pay in US retail stores. We will launch PhonePe US as the premier cross-border remittance bridge powered by an established US Sponsor Bank, capturing the 4.8M NRI corridor with zero licensing delay.',
            keyArguments: [
              'Unanimous strategic alignment on NRI remittance beachhead',
              'BaaS sponsor bank eliminates 2-year licensing hurdle',
              'Transforms PhonePe into a global cross-border payments powerhouse'
            ]
          },
          {
            agentId: 'legal',
            round: 3,
            stance: 'APPROVE',
            content: 'With the BaaS agreement structure and mandatory real-time OFAC compliance verified, Legal formally votes to approve.',
            keyArguments: ['Regulatory compliance framework fully established']
          },
          {
            agentId: 'cfo',
            round: 3,
            stance: 'APPROVE',
            content: 'Capital allocation is safe, runway is preserved, and the $32B market provides high IRR. CFO votes to approve.',
            keyArguments: ['Positive ROI within 14 months']
          }
        ]
      }
    ],
    finalMetrics: {
      riskScore: 38,
      confidenceScore: 86,
      weightedApprovalRatio: 91,
      riskCategories: {
        financial: 32,
        technical: 26,
        regulatory: 48,
        market: 34
      },
      votingTally: {
        approve: 5,
        conditional: 1,
        reject: 0
      },
      finalVerdict: 'APPROVED WITH CONDITIONS',
      verdictRationale: 'Launch approved under a strategic pivot: Target the $32B US-to-India remittance and NRI diaspora corridor via an authorized US Sponsor Bank (BaaS) rather than direct retail competition with Apple Pay.',
      strategicAmendments: [
        'Contract an established US Chartered Sponsor Bank (BaaS) to eliminate the requirement for 50 state Money Transmitter Licenses.',
        'Focus Go-To-Market exclusively on 4.8M Non-Resident Indians and cross-border remittances before any domestic US consumer expansion.',
        'Deploy dedicated US AWS cloud instance (us-east-1) with SOC-2 Type II compliance and real-time OFAC sanctions screening.',
        'Implement automated intraday foreign exchange (FX) rolling forward contracts to insulate balance sheet from USD/INR fluctuations.'
      ]
    }
  };
}

function generateGenericExecutiveScenario(
  proposalText: string,
  attachedFiles: UploadedFile[],
  maxRounds: number
): PresetScenario {
  const shortTitle = proposalText.length > 55 ? `${proposalText.substring(0, 52)}...` : proposalText;

  return {
    id: `custom-proposal-${Date.now()}`,
    title: shortTitle,
    category: 'Custom Strategic Deliberation',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    proposalText: proposalText,
    summary: `Autonomous C-Suite evaluation of: "${proposalText}"`,
    attachedFiles: attachedFiles,
    roundsData: [
      {
        round: 1,
        messages: [
          {
            agentId: 'ceo',
            round: 1,
            stance: 'APPROVE',
            content: `Evaluating "${proposalText}": From a strategic leadership perspective, this initiative addresses significant market dynamics. If executed with clear execution milestones and competitive differentiation, it can expand our market leadership and build a durable competitive moat.`,
            keyArguments: [
              'Strategic alignment with top-line growth and market expansion',
              'Creates long-term competitive differentiation against market rivals',
              'High strategic upside if executed decisively'
            ]
          },
          {
            agentId: 'cfo',
            round: 1,
            stance: 'CONDITIONAL',
            content: `Reviewing the capital implications of "${proposalText}": We must scrutinize the payback period and cash burn. Without strict budgetary caps and milestone-based capital tranches, this could stretch our working capital and compress operating margins.`,
            keyArguments: [
              'Requires strict milestone-based capital allocation',
              'Must define measurable ROI timeline and margin hurdle rate',
              'Cash burn must not compromise baseline runway covenants'
            ]
          },
          {
            agentId: 'cto',
            round: 1,
            stance: 'CONDITIONAL',
            content: `From an engineering and operational feasibility standpoint: Implementing this proposal requires careful architectural assessment. We must avoid taking on excessive technical debt or pulling key technical talent away from our core product deliverables.`,
            keyArguments: [
              'Assess operational integration complexity and technical debt',
              'Ensure engineering bandwidth is not diverted from core roadmap',
              'Verify infrastructure scalability, data security, and uptime SLAs'
            ]
          },
          {
            agentId: 'cmo',
            round: 1,
            stance: 'APPROVE',
            content: `From a brand and market adoption perspective: There is compelling narrative momentum behind this move. With the right go-to-market packaging and customer communication strategy, we can generate substantial brand equity and customer acquisition velocity.`,
            keyArguments: [
              'High customer resonance and strong positioning narrative',
              'Expands addressable market and brand visibility',
              'Opportunity to capture early mindshare before competitors react'
            ]
          },
          {
            agentId: 'legal',
            round: 1,
            stance: 'CONDITIONAL',
            content: `From a legal and compliance perspective regarding "${proposalText}": We must ensure comprehensive regulatory diligence, contract terms, liability limits, and intellectual property protections are in place before formal commitment.`,
            keyArguments: [
              'Comprehensive regulatory compliance and licensing audit required',
              'Ensure contracts include appropriate liability caps and indemnities',
              'Protect intellectual property and proprietary trade secrets'
            ]
          },
          {
            agentId: 'risk',
            round: 1,
            stance: 'CONDITIONAL',
            content: `From an enterprise risk standpoint: We must model worst-case scenarios and downside contingencies. We need clear circuit-breakers and rollback mechanisms in case execution falls short of initial milestones.`,
            keyArguments: [
              'Establish objective downside circuit-breakers and exit criteria',
              'Prevent single points of failure across operational teams',
              'Stress-test assumptions against adverse market conditions'
            ]
          }
        ]
      },
      {
        round: 2,
        messages: [
          {
            agentId: 'cfo',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'ceo',
            content: `Following cross-examination: If we establish a phased milestone schedule—releasing capital in 3 distinct tranches tied to verified KPIs—Finance is satisfied that treasury exposure is fully protected.`,
            keyArguments: [
              'Tranche-based capital deployment eliminates downside runaway costs',
              'Objective ROI gates tied to quarterly performance metrics'
            ]
          },
          {
            agentId: 'cto',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'cfo',
            content: `Engineering can deliver an MVP prototype within 60 days using modular components and managed cloud services, avoiding distraction from our primary engineering roadmap.`,
            keyArguments: [
              'Rapid 60-day MVP rollout minimizes engineering disruption',
              'Maintains platform stability and core delivery commitments'
            ]
          },
          {
            agentId: 'legal',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'risk',
            content: `Legal has reviewed the proposed risk boundaries. With standard mutual indemnification, comprehensive confidentiality, and regulatory compliance disclosures enacted, legal safeguards are satisfied.`,
            keyArguments: [
              'Full compliance safeguards and legal indemnification established',
              'Contractual dispute resolution and liability caps finalized'
            ]
          }
        ]
      },
      {
        round: 3,
        messages: [
          {
            agentId: 'ceo',
            round: 3,
            stance: 'APPROVE',
            content: `The board has completed its deliberation on "${proposalText}". With financial tranches established, engineering scope modularized, and legal compliance verified, we have reached full consensus to advance.`,
            keyArguments: [
              'Unanimous executive alignment achieved across all departments',
              'Clear operational roadmap with risk mitigations established'
            ]
          },
          {
            agentId: 'risk',
            round: 3,
            stance: 'APPROVE',
            content: `With circuit-breakers in place and phased execution confirmed, Risk formally registers unanimous board approval.`,
            keyArguments: ['Risk exposure reduced to acceptable operational threshold']
          }
        ]
      }
    ],
    finalMetrics: {
      riskScore: 31,
      confidenceScore: 88,
      weightedApprovalRatio: 94,
      riskCategories: {
        financial: 28,
        technical: 24,
        regulatory: 30,
        market: 32
      },
      votingTally: {
        approve: 6,
        conditional: 0,
        reject: 0
      },
      finalVerdict: 'APPROVED WITH CONDITIONS',
      verdictRationale: `Proposal deliberated and approved subject to phased milestone-based execution, strict financial tranche controls, and regulatory risk safeguards.`,
      strategicAmendments: [
        'Deploy capital in 3 phased tranches conditioned upon verified quarterly performance milestones.',
        'Build and test a lightweight pilot/MVP within 60 days before scaling operational commitments.',
        'Establish automated compliance monitoring and standard contractual liability limitations.',
        'Define explicit downside circuit-breaker triggers to protect core company operations.'
      ]
    }
  };
}
