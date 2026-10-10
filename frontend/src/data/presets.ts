import { PresetScenario } from '../types/boardroom';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'medical-ai',
    title: 'Deploy Autonomous B2B Diagnostic Medical AI',
    category: 'Healthcare & Regulatory AI',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    proposalText: 'Proposal to commercialize "MedMind Alpha": an autonomous radiologic diagnostic AI agent designed for hospital emergency departments, priced at $12,000/month per hospital deployment.',
    summary: 'High-margin enterprise AI play with substantial regulatory liability and malpractice risk.',
    attachedFiles: [
      {
        id: 'file-med-1',
        name: 'FDA_510k_ClassII_Regulatory_Dossier.pdf',
        size: 3420000,
        type: 'pdf',
        summary: 'Class II FDA clearance pathway requiring certified radiologist-in-the-loop validation.',
        relevantAgents: ['legal', 'risk']
      },
      {
        id: 'file-med-2',
        name: 'Clinical_Trial_Sensitivity_ROC_Curve.png',
        size: 1450000,
        type: 'image',
        summary: 'ROC curve showing 98.4% sensitivity on pulmonary embolism detection across 12,000 scans.',
        relevantAgents: ['cto', 'ceo']
      }
    ],
    roundsData: [
      {
        round: 1,
        messages: [
          {
            agentId: 'ceo',
            round: 1,
            stance: 'APPROVE',
            content: 'This represents a transformative market opportunity. B2B clinical diagnostic software is a $14B TAM. If we establish clinical dominance early, we secure recurring hospital contracts with over 85% gross margins.',
            keyArguments: ['$14B TAM with high switching costs', 'First-mover advantage in autonomous hospital workflow', 'High LTV enterprise contracts']
          },
          {
            agentId: 'cfo',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'The economics look attractive on paper with $12k MRR per hospital. However, our medical malpractice insurance underwriter is quoting a $1.8M annual premium spike, and sales cycles in enterprise healthcare average 14 months.',
            keyArguments: ['Long enterprise hospital sales cycle (12-16 mo)', '$1.8M malpractice insurance premium', 'Requires 18 months runway buffer'],
            citedDocumentSnippet: 'Citing Financial Annex B: Hospital procurement cycles will delay cash-flow breakeven by 9 months.'
          },
          {
            agentId: 'cto',
            round: 1,
            stance: 'APPROVE',
            content: 'The machine learning architecture is verified. As demonstrated in our attached ROC curve, sensitivity on pulmonary embolism detection is 98.4%, outpacing the human radiologist average of 95.1%. Latency is under 380ms on TensorRT.',
            keyArguments: ['98.4% model sensitivity surpasses human average (95.1%)', 'Sub-400ms inference on hospital edge servers', 'HIPAA-compliant on-prem inference containers'],
            citedDocumentSnippet: 'According to Clinical_Trial_Sensitivity_ROC_Curve.png, false negative rate is down to 1.6% across 12,000 CT scans.'
          },
          {
            agentId: 'cmo',
            round: 1,
            stance: 'APPROVE',
            content: 'Every major health system CIO is looking for generative and diagnostic AI case studies. Positioned as an "AI Co-pilot for Overburdened Radiologists", this will generate enormous industry press and zero-cost inbound pipeline.',
            keyArguments: ['Overworked radiologist burnout narrative resonates', 'Massive earned PR in medical journals and conferences', 'High inbound organic pipeline']
          },
          {
            agentId: 'legal',
            round: 1,
            stance: 'REJECT',
            content: 'Unacceptable legal exposure under current positioning. The FDA 510(k) summary explicitly prohibits marketing this as fully autonomous diagnostic without a certified radiologist sign-off. If an algorithm misdiagnoses an aneurysm, the liability falls directly upon our corporation.',
            keyArguments: ['FDA 510(k) prohibits fully autonomous diagnosis without clinician sign-off', 'Direct corporate liability in malpractice litigation', 'Class II regulatory audit penalties'],
            citedDocumentSnippet: 'Per FDA_510k_ClassII_Regulatory_Dossier.pdf Section 4: Software must strictly operate as "Decision Support System", not autonomous replacement.'
          },
          {
            agentId: 'risk',
            round: 1,
            stance: 'REJECT',
            content: 'I align with Legal. A single publicized false-negative resulting in patient mortality would destroy the company brand overnight and provoke immediate congressional or regulatory inquiries.',
            keyArguments: ['Existential brand risk from a single misdiagnosis', 'Uncapped catastrophic liability exposure', 'High algorithmic drift in non-standard hospital scanners']
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
            content: 'I take Legal and Risk\'s objections seriously. We can re-architect the API gateway to mandate a "Human-in-the-Loop" cryptographic signature: the AI produces the pre-drafted diagnosis, but cannot commit to the hospital EHR until the attending radiologist verifies it.',
            keyArguments: ['Enforce mandatory cryptographic radiologist sign-off', 'Reclassify product as Clinician Assist Tool', 'Reduces FDA approval hurdle from PMA to Class II 510(k)']
          },
          {
            agentId: 'legal',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cto',
            content: 'If the CTO can guarantee the software physically cannot output an autonomous final report without certified radiologist approval, our product shifts into "Clinical Decision Support" (CDS), shielding us from primary liability.',
            keyArguments: ['CDS reclassification shifts legal liability back to attending physician', 'Standard hospital EULA indemnification applies', 'Complies with FDA draft guidance on CDS systems']
          },
          {
            agentId: 'cfo',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'cmo',
            content: 'Reclassifying as a radiologist co-pilot drops our malpractice insurance quote from $1.8M down to $320k annually. Furthermore, CMO\'s inbound lead data confirms hospitals buy "efficiency assistants" faster than "autonomous replacements".',
            keyArguments: ['Insurance premium drops by 82% ($320k/yr)', 'Accelerates hospital procurement committee approval', 'Gross margin stabilizes at 81%']
          },
          {
            agentId: 'risk',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cto',
            content: 'I will soften my veto to Conditional Approval, provided we implement continuous drift monitoring on scanner image quality and cap our maximum contractual liability at 12 months of SaaS fees.',
            keyArguments: ['Contractual liability cap of 12 months SaaS fees', 'Automated drift monitoring for hospital edge scanners', 'Quarterly third-party clinical audit']
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
            content: 'The board has converged on an optimal strategy. We will not launch as an autonomous replacement, but as "MedMind Clinician Co-Pilot", combining high tech-led growth with bulletproof legal risk management.',
            keyArguments: ['Unanimous alignment on Clinician-in-the-loop', 'Speed to market accelerated by 6 months', 'Retains $12k/mo enterprise pricing tier']
          },
          {
            agentId: 'legal',
            round: 3,
            stance: 'APPROVE',
            content: 'With mandatory clinician sign-off and liability caps enacted in the Master Services Agreement, Legal formally votes to approve.',
            keyArguments: ['MSA indemnification safeguards intact', 'FDA Class II compliance path confirmed']
          },
          {
            agentId: 'risk',
            round: 3,
            stance: 'APPROVE',
            content: 'With audit logs and drift detectors confirmed by engineering, Risk formally moves to Approve with Conditions.',
            keyArguments: ['Risk down to manageable operational levels', 'Insurance coverage confirmed']
          }
        ]
      }
    ],
    finalMetrics: {
      riskScore: 34,
      confidenceScore: 89,
      weightedApprovalRatio: 94,
      riskCategories: {
        financial: 22,
        technical: 18,
        regulatory: 52,
        market: 28
      },
      votingTally: {
        approve: 5,
        conditional: 1,
        reject: 0
      },
      finalVerdict: 'APPROVED WITH CONDITIONS',
      verdictRationale: 'Proposal approved following architectural compromise to rebrand from "Autonomous Diagnostic AI" to "Certified Radiologist-in-the-Loop Decision Support".',
      strategicAmendments: [
        'Mandate cryptographic radiologist sign-off in UI before report is committed to hospital EHR.',
        'Include standard contractual liability cap limiting damages to 12 months of paid software fees.',
        'Deploy automated camera/scanner drift detection to alert hospital IT when image calibration degrades.',
        'Procure tailored $5M cyber-medical software errors & omissions policy at negotiated $320k premium.'
      ]
    }
  },
  {
    id: 'acquire-fintech',
    title: 'Acquire Berlin-based FinTech Challenger "Kredito" for $45M',
    category: 'M&A & Global Expansion',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    proposalText: 'Acquire 100% of Berlin-based digital lending fintech Kredito for $45M ($30M cash + $15M equity earnout) to instantly capture EU banking passporting and 420,000 active European borrowers.',
    summary: 'Aggressive European market entry with substantial cash depletion and German regulatory oversight.',
    attachedFiles: [
      {
        id: 'file-fin-1',
        name: 'Kredito_Q3_Financial_Model_Due_Diligence.csv',
        size: 920000,
        type: 'csv',
        summary: 'Unit economics: €18.4M annual recurring revenue, 14.2% default rate in Southern Europe portfolio.',
        relevantAgents: ['cfo', 'risk']
      },
      {
        id: 'file-fin-2',
        name: 'BaFin_Licensing_Assessment_Report.pdf',
        size: 2100000,
        type: 'pdf',
        summary: 'Analysis of German BaFin banking license transferability and capital adequacy buffer requirements.',
        relevantAgents: ['legal', 'cfo']
      }
    ],
    roundsData: [
      {
        round: 1,
        messages: [
          {
            agentId: 'ceo',
            round: 1,
            stance: 'APPROVE',
            content: 'Acquiring Kredito saves us 3 years of organic expansion into Germany and France. We obtain 420k verified customers and an instant European passporting license.',
            keyArguments: ['Immediate EU scale & 420k users', 'Cuts 36 months off European organic expansion', 'Strengthens valuation multiple']
          },
          {
            agentId: 'cfo',
            round: 1,
            stance: 'REJECT',
            content: 'This acquisition requires $30M in hard cash, which burns 68% of our liquid treasury. Looking at their attached Q3 financials, Kredito\'s Southern Europe lending portfolio has a 14.2% default rate, far above our 4.5% tolerance threshold.',
            keyArguments: ['Drains 68% of cash reserves ($30M cash outlay)', 'High 14.2% portfolio default rate in Southern Europe', 'Compromises our 24-month runway guarantee'],
            citedDocumentSnippet: 'Citing Kredito_Q3_Financial_Model_Due_Diligence.csv: Net loan loss provisions jumped €3.2M last quarter alone.'
          },
          {
            agentId: 'cto',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'Their core banking ledger runs on legacy Java monolith hosted in Frankfurt colocation. Migrating their customer accounts to our modern cloud event-driven stack will cost $4.2M and require 9 months of engineering effort.',
            keyArguments: ['Legacy Java infrastructure requires $4.2M migration', 'Technical debt in legacy ledger systems', 'Frankfurt data sovereignty compliance required']
          },
          {
            agentId: 'cmo',
            round: 1,
            stance: 'APPROVE',
            content: 'Kredito has one of the highest Net Promoter Scores (NPS 74) among German millennials. Blending their brand into our ecosystem instantly gives us 40% market awareness across the DACH region.',
            keyArguments: ['NPS 74 in German millennial cohort', 'Instant 40% brand awareness across DACH region', 'Cross-sell potential of our core product']
          },
          {
            agentId: 'legal',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'BaFin approval for change of control is not automatic. The BaFin assessment notes that foreign acquiring entities must maintain a €10M statutory capital reserve in a German depository.',
            keyArguments: ['German BaFin change of control approval required (4-6 mo)', 'Mandatory €10M locked statutory reserve', 'EU GDPR cross-border data transfer hurdles'],
            citedDocumentSnippet: 'Per BaFin_Licensing_Assessment_Report.pdf: Article 24 requires €10M locked liquid reserve during regulatory review.'
          },
          {
            agentId: 'risk',
            round: 1,
            stance: 'REJECT',
            content: 'The macro credit cycle in Europe is deteriorating. Carrying a subprime consumer loan book while simultaneously tying up cash reserves creates systemic liquidity risk.',
            keyArguments: ['Macro European consumer credit contraction', 'Unhedged FX exposure (EUR vs USD)', 'Dual integration and regulatory scrutiny']
          }
        ]
      },
      {
        round: 2,
        messages: [
          {
            agentId: 'cfo',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'ceo',
            content: 'If we restructure the deal: instead of $30M cash upfront, we offer $12M cash, $18M in convertible preferred stock, and carve out / sell off their non-performing Southern Europe loan book before closing, I can support this.',
            keyArguments: ['Reduce cash outlay from $30M to $12M', 'Replace debt with $18M convertible preferred stock', 'Carve out and sell off non-performing loan portfolio prior to closing']
          },
          {
            agentId: 'ceo',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'cfo',
            content: 'Agreed. The Kredito founders are eager for equity upside in our US entity. Restructuring to $12M cash protects our runway while achieving our European growth objective.',
            keyArguments: ['Protects US cash runway', 'Founder equity alignment', 'Retains German customer acquisition']
          },
          {
            agentId: 'risk',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cfo',
            content: 'Carving out the Southern Europe loan book eliminates our primary downside credit exposure. With the cash outlay capped at $12M, Risk switches stance to Conditional Approval.',
            keyArguments: ['Eliminates high-default loan portfolio', 'Maintains adequate liquidity reserves']
          }
        ]
      },
      {
        round: 3,
        messages: [
          {
            agentId: 'cfo',
            round: 3,
            stance: 'APPROVE',
            content: 'With the restructured financing terms ($12M cash / $18M stock) and bad loan carve-out, the CFO formally votes to approve.',
            keyArguments: ['Runway preserved at 21 months', 'Accretive deal structure within 14 months']
          },
          {
            agentId: 'legal',
            round: 3,
            stance: 'APPROVE',
            content: 'BaFin engagement can begin under an escrow structure. Legal votes to approve with standard M&A reps and warranties.',
            keyArguments: ['Escrow structure satisfies BaFin Article 24']
          }
        ]
      }
    ],
    finalMetrics: {
      riskScore: 41,
      confidenceScore: 84,
      weightedApprovalRatio: 88,
      riskCategories: {
        financial: 45,
        technical: 38,
        regulatory: 48,
        market: 32
      },
      votingTally: {
        approve: 5,
        conditional: 1,
        reject: 0
      },
      finalVerdict: 'APPROVED WITH CONDITIONS',
      verdictRationale: 'M&A transaction approved under a restructured term sheet: $12M cash upfront + $18M equity, accompanied by mandatory carve-out of non-performing Southern European loan assets.',
      strategicAmendments: [
        'Renegotiate cash purchase price from $30M down to $12M cash plus $18M convertible stock.',
        'Condition closing on seller liquidating or spinning out the 14.2% default Southern Europe loan portfolio.',
        'Deposit €10M into Frankfurt escrow to satisfy BaFin change-of-control capital adequacy rules.',
        'Ringfence legacy Java banking ledger and execute phased 9-month migration with dedicated $4.2M budget.'
      ]
    }
  },
  {
    id: 'return-to-office',
    title: 'Mandate 100% Return-to-Office (RTO) Effective Q3',
    category: 'Workforce & Corporate Governance',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    proposalText: 'Executive order mandating all 850 distributed employees return to physical headquarters 5 days a week starting in Q3, terminating fully remote work contracts.',
    summary: 'High cultural friction policy attempting to increase creative density at the cost of senior talent attrition.',
    attachedFiles: [
      {
        id: 'file-rto-1',
        name: 'Global_Engineering_Talent_Sentiment_Survey.pdf',
        size: 1100000,
        type: 'pdf',
        summary: 'Survey: 54% of senior staff engineers will consider competing remote offers if 5-day RTO is mandated.',
        relevantAgents: ['cto', 'risk']
      }
    ],
    roundsData: [
      {
        round: 1,
        messages: [
          {
            agentId: 'ceo',
            round: 1,
            stance: 'APPROVE',
            content: 'Spontaneous hallway collaboration and high-intensity cultural density cannot be replicated over Zoom. To build category-defining technology, we need our top leaders and teams in the room together.',
            keyArguments: ['In-person creative density and speed of execution', 'Mentorship for junior engineers', 'Reinforces high-accountability corporate culture']
          },
          {
            agentId: 'cto',
            round: 1,
            stance: 'REJECT',
            content: 'This will cause an immediate brain drain of our top technical contributors. As detailed in the attached engineering sentiment survey, 54% of our senior staff engineers were hired remotely and will resign if forced to relocate to San Francisco.',
            keyArguments: ['54% senior engineering resignation threat', 'Replacement cost is $180k per engineer + 6 mo ramp', 'Derails Q3/Q4 product roadmap deliverables'],
            citedDocumentSnippet: 'Citing Global_Engineering_Talent_Sentiment_Survey.pdf: 68% of Staff and Principal engineers cite remote flexibility as primary retention factor.'
          },
          {
            agentId: 'cfo',
            round: 1,
            stance: 'REJECT',
            content: 'Our current HQ lease only has capacity for 380 desks. Bringing 850 employees back requires leasing an additional 45,000 sq ft in downtown commercial real estate, costing $3.8M annually in rent and facilities.',
            keyArguments: ['HQ capacity capped at 380 desks vs 850 staff', '$3.8M annual commercial lease expansion required', 'Relocation compensation packages will cost $2.1M']
          },
          {
            agentId: 'cmo',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'A clumsy RTO mandate will generate negative PR on LinkedIn and Glassdoor, branding us as an outdated employer. However, having our creative and marketing teams in-studio has demonstrated higher campaign velocity.',
            keyArguments: ['Employer brand hit on Glassdoor & social media', 'Marketing benefits from creative physical sync', 'Needs nuanced internal comms strategy']
          },
          {
            agentId: 'legal',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'Over 200 employees have explicit "Remote Work Location" clauses in their employment contracts. Unilateral termination or forced relocation exposes the company to constructive dismissal claims in California, New York, and the UK.',
            keyArguments: ['Constructive dismissal lawsuits from remote employment contracts', 'State-by-state WARN Act notification triggers', 'Severance liabilities could exceed $1.4M']
          },
          {
            agentId: 'risk',
            round: 1,
            stance: 'REJECT',
            content: 'High attrition in mission-critical infrastructure teams during our core platform rollout represents an existential operational risk. We cannot afford cascading departures.',
            keyArguments: ['Single point of failure: loss of key repository maintainers', 'Operational instability during Q4 release']
          }
        ]
      },
      {
        round: 2,
        messages: [
          {
            agentId: 'ceo',
            round: 2,
            stance: 'CONDITIONAL',
            targetedAgentId: 'cto',
            content: 'I hear the board\'s clear warnings regarding real estate CapEx and engineering attrition. What if we adopt a "3-Day Structured Hybrid (Tue-Wed-Thu)" policy for local employees, while grandfathering in pre-approved remote senior technical staff?',
            keyArguments: ['Compromise on 3-day hybrid (Tue/Wed/Thu)', 'Grandfather existing remote senior engineers', 'Avoids commercial real estate expansion via hot-desking']
          },
          {
            agentId: 'cto',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'ceo',
            content: 'Grandfathering remote staff engineers and offering hot-desking hybrid for local teams completely changes the equation. Engineering attrition risk drops from 54% to under 8%. I can enthusiastically support this.',
            keyArguments: ['Protects core technical talent', 'Attrition risk drops below 8%', 'Preserves product roadmap timeline']
          },
          {
            agentId: 'cfo',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'ceo',
            content: 'With a 3-day hybrid model, we implement smart hot-desking within our existing 380-desk HQ, avoiding the $3.8M real estate expansion entirely. CFO votes to approve.',
            keyArguments: ['Zero additional commercial lease expenditure', 'Hot-desking fits within current 380-desk HQ envelope']
          }
        ]
      },
      {
        round: 3,
        messages: [
          {
            agentId: 'risk',
            round: 3,
            stance: 'APPROVE',
            content: 'With engineering talent protected and legal risks minimized, Risk moves from Reject to Approve.',
            keyArguments: ['Operational continuity ensured', 'Balanced compromise']
          },
          {
            agentId: 'legal',
            round: 3,
            stance: 'APPROVE',
            content: 'Grandfathered remote contracts eliminate constructive dismissal exposure. Legal votes to approve.',
            keyArguments: ['Zero employment contract breach exposure']
          }
        ]
      }
    ],
    finalMetrics: {
      riskScore: 28,
      confidenceScore: 92,
      weightedApprovalRatio: 96,
      riskCategories: {
        financial: 18,
        technical: 22,
        regulatory: 24,
        market: 40
      },
      votingTally: {
        approve: 6,
        conditional: 0,
        reject: 0
      },
      finalVerdict: 'APPROVED WITH CONDITIONS',
      verdictRationale: 'Full 5-day RTO mandate rejected; replaced with unanimous board compromise: "3-Day Anchor Hybrid" with grandfathered remote protection for senior technical specialists.',
      strategicAmendments: [
        'Pivot from 5-day mandatory RTO to 3-day anchor hybrid (Tue-Thu) for employees within 30 miles of HQ.',
        'Grandfather existing remote employment contracts for Staff+ engineers and distributed key contributors.',
        'Implement dynamic desk booking software to fit all hybrid staff within existing HQ, saving $3.8M in lease CapEx.',
        'Provide $500/month commuter and childcare stipends to offset return-to-office friction for local employees.'
      ]
    }
  },
  {
    id: 'cloud-to-onprem',
    title: 'Migrate Cloud Infrastructure from AWS to Open-Source On-Prem',
    category: 'Infrastructure & Financial Optimization',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    proposalText: 'Repatriate core microservices and data pipelines from AWS to leased colocation data centers using Kubernetes on bare metal, aiming to eliminate $3.2M/year in cloud hosting invoices.',
    summary: 'Infrastructure repatriation pitch promising massive cloud bill savings against large upfront CapEx and staffing costs.',
    attachedFiles: [
      {
        id: 'file-cloud-1',
        name: 'AWS_vs_Colocation_5Year_TCO_Model.csv',
        size: 850000,
        type: 'csv',
        summary: '5-year TCO shows $4.1M net savings, but requires $2.8M upfront server procurement in Year 1.',
        relevantAgents: ['cfo', 'cto']
      }
    ],
    roundsData: [
      {
        round: 1,
        messages: [
          {
            agentId: 'cfo',
            round: 1,
            stance: 'APPROVE',
            content: 'Our AWS invoices currently consume $265,000 every month ($3.2M annually). Repatriating to colocation hardware amortizes server hardware over 5 years and will expand our gross margins by 11 percentage points.',
            keyArguments: ['$3.2M annual AWS invoice elimination', '11% gross margin expansion', '5-year net savings of $4.1M'],
            citedDocumentSnippet: 'Citing AWS_vs_Colocation_5Year_TCO_Model.csv: Hardware amortization yields 44% lower cost per compute unit over 60 months.'
          },
          {
            agentId: 'cto',
            round: 1,
            stance: 'REJECT',
            content: 'The CFO is looking at hardware costs while ignoring operational overhead. Moving to bare metal means our engineers lose managed RDS, DynamoDB, S3 durability, and automated multi-region failover. We will need to hire at least 6 dedicated Site Reliability Engineers at $1.5M/year.',
            keyArguments: ['Loss of AWS managed services (RDS, S3, IAM)', 'Must hire 6 dedicated SREs ($1.5M/yr personnel overhead)', 'Migration will take 14 months and freeze new feature development']
          },
          {
            agentId: 'risk',
            round: 1,
            stance: 'REJECT',
            content: 'Colocation hardware introduces catastrophic single-point-of-failure vulnerabilities. A fiber cut or power transformer failure at our colocation provider could take down our SaaS for 24+ hours, violating customer SLAs.',
            keyArguments: ['Loss of multi-availability zone redundancy', 'SLA breach penalties could exceed $800k/incident', 'DDoS mitigation is significantly weaker on-prem']
          },
          {
            agentId: 'ceo',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'I want the gross margin improvement to boost our enterprise valuation, but I refuse to let product velocity drop to zero while we manage physical cables in a server rack.',
            keyArguments: ['Wants gross margin gains for investor multiples', 'Refuses to accept roadmap freeze']
          },
          {
            agentId: 'legal',
            round: 1,
            stance: 'CONDITIONAL',
            content: 'Our Enterprise SLAs guarantee 99.99% uptime. If we self-host, we carry full contractual liability for downtime without AWS service-credit backstops.',
            keyArguments: ['99.99% SLA commitment in enterprise MSAs', 'Loss of third-party SOC-2 Type II inheriting certifications']
          },
          {
            agentId: 'cmo',
            round: 1,
            stance: 'NEUTRAL',
            content: 'Customers don\'t care whether we run on AWS or bare metal, as long as the application is fast and does not go down.',
            keyArguments: ['Zero customer-facing marketing upside', 'Negative sentiment if outage occurs']
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
            targetedAgentId: 'cfo',
            content: 'A complete exit from AWS is suicidal. However, we can adopt a "Hybrid Strategy": keep mission-critical databases and web APIs on AWS, but migrate our heavy GPU training clusters and batch analytics jobs (which account for 65% of the AWS bill) to dedicated bare metal.',
            keyArguments: ['Hybrid compromise: Repatriate GPU/batch jobs only (65% of bill)', 'Keep stateful databases and web ingress on AWS', 'Reduces SRE hiring requirement from 6 down to 2 engineers']
          },
          {
            agentId: 'cfo',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'cto',
            content: 'The hybrid plan still captures $2.1M of annual cost reduction while slashing upfront server CapEx in half. I enthusiastically endorse the CTO\'s hybrid model.',
            keyArguments: ['Captures $2.1M annual cost reduction', 'Slashes upfront hardware CapEx by 50%', 'Achieves gross margin target without SLA risk']
          },
          {
            agentId: 'risk',
            round: 2,
            stance: 'APPROVE',
            targetedAgentId: 'cto',
            content: 'Because databases and customer-facing APIs remain on AWS multi-AZ, our 99.99% SLA guarantee remains intact. Batch job downtime does not breach contracts. Risk moves to Approve.',
            keyArguments: ['Customer SLAs remain protected on AWS multi-AZ', 'Batch workloads can tolerate temporary colocation hiccups']
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
            content: 'The hybrid approach represents the best of both worlds: $2.1M in annualized savings without risking product reliability. Proposal approved.',
            keyArguments: ['Optimal balance of margin expansion and reliability', 'Feature velocity preserved']
          }
        ]
      }
    ],
    finalMetrics: {
      riskScore: 31,
      confidenceScore: 90,
      weightedApprovalRatio: 92,
      riskCategories: {
        financial: 20,
        technical: 34,
        regulatory: 18,
        market: 15
      },
      votingTally: {
        approve: 5,
        conditional: 1,
        reject: 0
      },
      finalVerdict: 'APPROVED WITH CONDITIONS',
      verdictRationale: 'Total cloud repatriation rejected. Approved revised "Targeted Hybrid Repatriation" targeting compute-heavy GPU & batch analytics workloads while preserving AWS for core databases.',
      strategicAmendments: [
        'Maintain all core databases (Postgres/RDS) and web gateway services on AWS multi-region infrastructure.',
        'Repatriate only heavy GPU training pipelines and batch analytics workloads to leased Equinix colocation.',
        'Sign an AWS Savings Plan 3-year commitment for remaining baseline services to capture additional 28% discount.',
        'Hire 2 dedicated infrastructure engineers with bare-metal Kubernetes experience rather than an entire 6-person team.'
      ]
    }
  }
];
