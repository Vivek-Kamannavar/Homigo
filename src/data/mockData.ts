import { WorkflowCase, PillarDetail } from '../types';

export const PILLARS_DATA: PillarDetail[] = [
  {
    number: '01',
    title: 'Shift: Tool Provider → Service Operator',
    subtitle: 'From Selling Licenses to Fulfilling Regulated Contracts',
    tagline: 'Legacy SaaS sells you software and asks you to do 40 hours of manual labor. Aegis operates as the actual licensed firm that fulfills the service directly.',
    traditionalSaaSVsAegis: {
      traditional: 'Sells seat licenses ($250/mo/user). You still spend 35 hours reconciling receipts, entering ledger line-items, and guessing tax compliance codes yourself.',
      aegis: 'Operates as the fiduciary service provider. Upload raw bank exports and invoices; our autonomous firm produces certified IRS filings with CPA liability backing.'
    },
    keyPillars: [
      {
        title: 'Full Contract Fulfillment',
        desc: 'We are legally on the hook for service deliverables, not just providing an empty dashboard.'
      },
      {
        title: 'Zero Customer Labor',
        desc: 'Customer input is reduced from weeks of spreadsheet gymnastics down to uploading raw data and a 60-second signoff.'
      },
      {
        title: 'Integrated Insurance & Liability',
        desc: 'Every completed tax or audit engagement comes backed with $5M E&O professional liability insurance.'
      }
    ],
    stat: {
      value: '94%',
      label: 'Reduction in customer labor hours'
    }
  },
  {
    number: '02',
    title: 'Autonomous Multi-Agent Execution',
    subtitle: 'Specialized Agent Swarms Executing Complex Workflows',
    tagline: 'A synchronized pipeline of domain-tuned agents: Ingestion parses unstructured data, Calculation models the ledger, and Compliance audits against live statutory rules.',
    traditionalSaaSVsAegis: {
      traditional: 'Single monolith CRUD databases requiring human manual entry and fragile heuristic integrations that break on edge cases.',
      aegis: 'Four autonomous agents with sub-agent validation loops, parallel vectorized OCR, and AST-level statutory rule checks.'
    },
    keyPillars: [
      {
        title: 'Ingestion Agent (Perception)',
        desc: 'Extracts invoices, CSVs, PDF bank statements with 99.98% field extraction accuracy and automatic transaction pairing.'
      },
      {
        title: 'Calculation Engine (Reasoning)',
        desc: 'Runs multi-jurisdiction tax models, amortization curves, and R&D credit Qualified Research Expense (QRE) calculations.'
      },
      {
        title: 'Compliance Guard (Statutory Verifier)',
        desc: 'Cross-checks drafts against 48,000+ pages of the Internal Revenue Code, GAAP regulations, and local state statutes.'
      }
    ],
    stat: {
      value: '2.4s',
      label: 'Average multi-step audit verification'
    }
  },
  {
    number: '03',
    title: 'Human-in-the-Loop for Critical Judgment',
    subtitle: 'Removing Humans from Data Entry, Positioning at High-Value Checkpoints',
    tagline: 'Humans are liberated from mundane spreadsheet data entry and positioned exclusively at high-liability governance and edge-case checkpoints.',
    traditionalSaaSVsAegis: {
      traditional: 'Humans do 95% routine copy-paste data entry and 5% review, leading to fatigue, manual errors, and high hourly rates ($350+/hr).',
      aegis: 'AI handles 98.6% of computation autonomously. Licensed CPAs & Attorneys step in only to adjudicate regulatory gray zones and sign the stamp.'
    },
    keyPillars: [
      {
        title: 'Liability Checkpoints Only',
        desc: 'High-value decisions (e.g., Section 179 bonus depreciation election vs capital expenditure) trigger human partner review.'
      },
      {
        title: 'Full Explainability Tree',
        desc: 'The reviewing CPA receives cited statutory precedents, confidence scores, and pre-computed risk vectors in one view.'
      },
      {
        title: 'Continuous Reinforcement Learning',
        desc: 'Human CPA judgment decisions immediately calibrate future edge-case thresholds across the agent fleet.'
      }
    ],
    stat: {
      value: '100%',
      label: 'Licensed CPA certified sign-off'
    }
  },
  {
    number: '04',
    title: 'Market Disruption & Infinite Scale',
    subtitle: '10x Faster, 80% Lower Cost, Unlocking the Long-Tail SMB Market',
    tagline: 'Traditional professional service firms cannot profitably serve small businesses due to high labor overhead. By driving marginal cost to zero, we serve millions profitably.',
    traditionalSaaSVsAegis: {
      traditional: 'Traditional accounting firms charge $5,000 to $15,000 minimum retainers, rejecting early-stage startups and small businesses.',
      aegis: 'Autonomous unit economics allow flat $149/mo pricing with instant turnaround, servicing the 33M underserved SMBs worldwide.'
    },
    keyPillars: [
      {
        title: 'Zero Marginal Labor Cost',
        desc: 'Agent compute costs pennies per corporate return, allowing 80% price reductions while maintaining 75%+ gross margins.'
      },
      {
        title: 'Sub-Hour SLA Turnaround',
        desc: 'Turn tax preparation and audit engagements from a 3-week waiting game into a 15-minute autonomous pipeline.'
      },
      {
        title: 'Democratic Access to Elite Strategy',
        desc: 'Solo entrepreneurs receive the same advanced tax optimization strategies previously reserved for Fortune 500s.'
      }
    ],
    stat: {
      value: '82%',
      label: 'Cost reduction vs traditional boutique firms'
    }
  }
];

export const WORKFLOW_CASES: WorkflowCase[] = [
  {
    id: 'case-techpulse',
    title: '2024 Corporate Tax (Form 1120-S) & Section 41 R&D Credit',
    clientName: 'TechPulse Robotics Inc.',
    clientType: 'Seed-Stage Hardware & AI Startup (12 employees)',
    contractType: 'Corporate Tax & R&D Credit',
    inputSummary: '1,420 bank transactions, 84 contractor invoices, AWS cloud billing exports, payroll ledger (Gusto), patent filings',
    slaTarget: 'Under 10 minutes (vs 21 days traditional firm)',
    traditionalCost: 6500,
    aegisCost: 399,
    traditionalDays: 21,
    aegisMinutes: 6,
    rawFilesCount: 42,
    fileTypes: ['Gusto_Payroll_2024.csv', 'Mercury_Bank_Export.xlsx', 'AWS_Consolidated_Bill.pdf', 'Lab_Equipment_Leases.pdf'],
    steps: [
      {
        id: 'step-1',
        agentRole: 'ingestion',
        agentName: 'Ingestion Agent (Nova-Ingest)',
        agentIcon: 'FileSpreadsheet',
        status: 'completed',
        title: 'Multi-Modal Data Ingestion & OCR Reconciliation',
        description: 'Parsed 1,420 ledger entries, cross-referenced Mercury bank receipts against Gusto W-2 salaries, extracted 84 PDF invoices with zero syntax errors.',
        executionTimeMs: 1420,
        tokensProcessed: 124500,
        confidenceScore: 99.8,
        findings: [
          'Successfully mapped 100% of debit transactions to chart-of-accounts',
          'Flagged 3 duplicate subscription charges ($240 total refund identified)',
          'Extracted W-2 gross engineering compensation: $842,000'
        ],
        citations: ['GAAP ASC 606 Revenue Recognition', 'Mercury Statement Ref #M-9021'],
        metrics: { 'Transactions Ingested': '1,420', 'Unmatched Items': '0', 'Extraction Accuracy': '99.98%' }
      },
      {
        id: 'step-2',
        agentRole: 'calculation',
        agentName: 'Computation Agent (Cortex-Math)',
        agentIcon: 'Cpu',
        status: 'completed',
        title: 'Algorithmic Financial & Tax Code Computation',
        description: 'Calculated EBITDA, Section 174 Software Amortization over 5-year domestic schedule, qualified $342,000 in QRE (Qualified Research Expenses).',
        executionTimeMs: 2180,
        tokensProcessed: 88400,
        confidenceScore: 99.4,
        findings: [
          'Formulated Section 41 R&D payroll tax credit offset totaling $34,200',
          'Computed accelerated Section 179 depreciation on $85,000 server cluster',
          'Derived net taxable corporate loss: ($142,500) carryforward to 2025'
        ],
        citations: ['IRC § 41 (Credit for Increasing Research Activities)', 'IRC § 174 (Amortization of R&E)'],
        metrics: { 'Total Deductions Computed': '$984,500', 'Identified Tax Credits': '$34,200', 'Calculation Speed': '0.38s' }
      },
      {
        id: 'step-3',
        agentRole: 'compliance',
        agentName: 'Compliance Guard (Lex-Audit)',
        agentIcon: 'ShieldAlert',
        status: 'waiting-hitl',
        title: 'Statutory IRS & State Code Audit Verification',
        description: 'Simulated 140 IRS audit triggers. Detected 1 critical judgment boundary regarding dual-purpose hardware lab lease classification.',
        executionTimeMs: 1850,
        tokensProcessed: 96300,
        confidenceScore: 92.1,
        findings: [
          'Cleared 139 automated compliance checks (State Nexus, 1099-NEC thresholds, FICA caps)',
          'AUDIT TRIGGER: Hardware Lab space lease ($48,000) split between production & research requires human CPA election'
        ],
        citations: ['Treas. Reg. § 1.41-4(c)(6)', 'IRS Notice 2023-63 (Section 174 Guidance)'],
        metrics: { 'Audit Checks Passed': '139 / 140', 'Compliance Score': '99.2%', 'Risk Flag': 'Moderate (HITL Triggered)' },
        hitlRequired: true
      },
      {
        id: 'step-4',
        agentRole: 'synthesis',
        agentName: 'Synthesis & Filing Agent (Aegis-Drafter)',
        agentIcon: 'FileCheck2',
        status: 'idle',
        title: 'IRS Form 1120-S, Form 6765 & Audit Packet Assembly',
        description: 'Stitches final government XML schemas, cryptographic audit trails, and schedules ready for IRS MeF direct e-filing.',
        executionTimeMs: 940,
        tokensProcessed: 45200,
        confidenceScore: 100,
        findings: [
          'Completed IRS Form 1120-S (U.S. Income Tax Return for an S Corporation)',
          'Generated Form 6765 (Credit for Increasing Research Activities)',
          'Generated CPA Legal Opinion Memo with statutory citations attached'
        ],
        citations: ['IRS Modernized e-File (MeF) Specification v2024.4'],
        metrics: { 'Pages Generated': '38', 'IRS XML Validated': 'Yes', 'E-Sign Ready': 'Pending CPA Approval' }
      }
    ],
    hitlCheckpoint: {
      question: 'Elect Section 179 Accelerated Expensing vs. Section 174 5-Year Amortization for $48,000 Hybrid Lab Lease & Server Rig?',
      sectionRef: 'IRC § 179 vs § 174 Treatment of Dual-Use Facilities',
      aiRecommendation: 'Option A: Elect Section 179 Full Write-Off. While Section 174 applies to pure software R&D, this hardware lease qualifies as tangible depreciable research equipment under Rev. Rul. 2021-12.',
      aiConfidence: 94.2,
      riskCategory: 'High Liability',
      options: [
        {
          id: 'opt-a',
          label: 'Option A: Section 179 Full Immediate Expensing (Recommended)',
          description: 'Maximizes immediate deduction by $48,000 today; generates $34,200 immediate payroll tax credit offset against Q1 2025 burn.',
          cpaRecommendation: true
        },
        {
          id: 'opt-b',
          label: 'Option B: 5-Year Straight-Line Amortization',
          description: 'Ultra-conservative stance amortizing $9,600/yr over 5 years. Minimizes any potential audit inquiry risk to 0.01%.'
        }
      ],
      cpaReviewer: {
        name: 'Sarah Jenkins, CPA, MST',
        license: 'CPA Lic #094821 (Delaware / California)',
        jurisdiction: '15 Years Corporate Tax Practice, ex-PwC Director',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        statement: 'As supervising partner, I have reviewed the Cortex-Math logs and hardware lease covenants. Option A is fully substantiated under Treasury Reg 1.41-4. I will certify this election under Aegis Firm License.'
      }
    }
  },
  {
    id: 'case-apex-logistics',
    title: 'Statutory Monthly Bookkeeping & Contractor 1099-NEC Audit',
    clientName: 'Apex Cold-Chain Fleet LLC',
    clientType: 'Logistics Operator (45 Independent Drivers)',
    contractType: 'Statutory Books & Audit',
    inputSummary: 'Fuel card receipts (WEX), driver dispatch settlements, Stripe billing, truck maintenance work orders',
    slaTarget: 'Under 5 minutes (vs 14 days traditional bookkeeper)',
    traditionalCost: 3200,
    aegisCost: 189,
    traditionalDays: 14,
    aegisMinutes: 4,
    rawFilesCount: 89,
    fileTypes: ['WEX_Fleet_Fuel_Q4.csv', 'Driver_Dispatch_Settlements.xlsx', 'QuickBooks_GL_Export.qbo'],
    steps: [
      {
        id: 'step-1',
        agentRole: 'ingestion',
        agentName: 'Ingestion Agent (Nova-Ingest)',
        agentIcon: 'FileSpreadsheet',
        status: 'completed',
        title: 'Logistics Settlement Ledger Reconciliation',
        description: 'Ingested 4,890 fuel charges and mileage logs, matched 100% of driver dispatch settlements against Stripe payouts.',
        executionTimeMs: 1890,
        tokensProcessed: 189000,
        confidenceScore: 99.9,
        findings: [
          '45 Contractor driver payouts matched to penny-level precision',
          'Flagged 2 missing W-9 forms with automatic driver SMS retrieval dispatch'
        ],
        citations: ['IRC § 6041A Returns Regarding Payments of Remuneration'],
        metrics: { 'Settlements Audited': '45', 'Accuracy': '100%' }
      },
      {
        id: 'step-2',
        agentRole: 'calculation',
        agentName: 'Computation Agent (Cortex-Math)',
        agentIcon: 'Cpu',
        status: 'completed',
        title: 'IFTA Fuel Tax & Statutory Depreciation Computation',
        description: 'Computed multi-state IFTA fuel tax liabilities across 14 states, calculated MACRS 5-year depreciation on 12 refrigerated trailers.',
        executionTimeMs: 1650,
        tokensProcessed: 72000,
        confidenceScore: 99.7,
        findings: [
          'Net IFTA state tax credit identified: $4,120 across OH, PA, IN',
          'Reconciled $184,000 in truck overhaul repairs vs capitalizable improvements'
        ],
        citations: ['IFTA Articles of Agreement § R1210', 'IRS Tangible Property Regs § 1.263(a)-3'],
        metrics: { 'States Calculated': '14', 'Tax Savings Found': '$4,120' }
      },
      {
        id: 'step-3',
        agentRole: 'compliance',
        agentName: 'Compliance Guard (Lex-Audit)',
        agentIcon: 'ShieldAlert',
        status: 'waiting-hitl',
        title: 'Worker Classification & Safe Harbor 530 Verification',
        description: 'Assessed IRS 20-factor test and DOL Independent Contractor rule for driver dispatch agreement revisions.',
        executionTimeMs: 1420,
        tokensProcessed: 81400,
        confidenceScore: 91.5,
        findings: [
          'Safe Harbor 530 criteria met across 43 drivers',
          '2 drivers transitioned to lease-purchase agreements requiring Partner legal confirmation'
        ],
        citations: ['Section 530 of Revenue Act of 1978', 'DOL 29 CFR Part 795'],
        metrics: { 'Safe Harbor Compliance': '98.5%', 'Liability Risk': 'Low-Medium' },
        hitlRequired: true
      },
      {
        id: 'step-4',
        agentRole: 'synthesis',
        agentName: 'Synthesis & Filing Agent (Aegis-Drafter)',
        agentIcon: 'FileCheck2',
        status: 'idle',
        title: 'Final 1099-NEC & Monthly Financial Stamped Package',
        description: 'Compiles certified GAAP Balance Sheet, Income Statement, and IRS 1099-NEC electronic submissions.',
        executionTimeMs: 780,
        tokensProcessed: 39000,
        confidenceScore: 100,
        findings: [
          'Ready for 1099-NEC direct filing via IRS FIRE system',
          'Certified GAAP monthly balance sheet ready for credit facility bank covenants'
        ],
        citations: ['GAAP ASC 205 Presentation of Financial Statements'],
        metrics: { 'Deliverables': '3 Complete Reports', 'Bank Covenant Verified': 'Pass' }
      }
    ],
    hitlCheckpoint: {
      question: 'Verify Independent Contractor Classification Defense Memo for 2 Drivers on Lease-Purchase Agreements?',
      sectionRef: 'DOL 29 CFR Part 795 & Section 530 Safe Harbor',
      aiRecommendation: 'Approve Contractor Status: Contract explicitly grants drivers right of refusal, equipment maintenance responsibility, and route autonomy.',
      aiConfidence: 93.8,
      riskCategory: 'High Liability',
      options: [
        {
          id: 'opt-apex-a',
          label: 'Approve 1099-NEC Classification with Aegis Audit Defense Shield',
          description: 'Affirms IC status under Section 530 Safe Harbor with automated contract addendum dispatched to driver.',
          cpaRecommendation: true
        },
        {
          id: 'opt-apex-b',
          label: 'Withhold 1099 and Reclassify to W-2 Employee',
          description: 'Triggers employer payroll taxes (+7.65% FICA) but removes all worker misclassification liability.'
        }
      ],
      cpaReviewer: {
        name: 'David Vance, Esq. & CPA',
        license: 'Bar No. 492019 / CPA Lic #88192',
        jurisdiction: 'Specialist in Transportation Tax & Regulatory Defense',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        statement: 'The equipment lease structure satisfies all 6 DOL economic reality factors. I endorse Option A with our firm defense guarantee.'
      }
    }
  }
];

export const SERVICE_OFFERINGS = [
  {
    id: 'serv-tax',
    title: 'Autonomous Corporate Tax Filing',
    badge: 'Flagship Service',
    description: 'We do not sell you tax software. We file your corporate returns (1120, 1120-S, 1065) with guaranteed statutory compliance and CPA signing authority.',
    turnaround: '15 Minutes',
    sla: '100% On-Time Guarantee',
    startingPrice: '$299',
    traditionalPrice: '$4,500 - $8,000',
    features: [
      'Autonomous ledger ingestion & reconciliation',
      'R&D Payroll Tax Credit (Form 6765) optimization',
      'Multi-state nexus & franchise tax filings',
      'Certified CPA Review & Sign-off included',
      '$5,000,000 Errors & Omissions liability insurance backing'
    ]
  },
  {
    id: 'serv-audit',
    title: 'Autonomous Statutory Financial Audit',
    badge: 'Continuous Compliance',
    description: 'Replace month-end stress with an autonomous agent swarm that continuously verifies transactions, detects discrepancies, and produces GAAP-certified books.',
    turnaround: 'Real-Time / Monthly',
    sla: 'Sub-second reconciliation',
    startingPrice: '$189/mo',
    traditionalPrice: '$2,500/mo',
    features: [
      'Multi-agent receipt & invoice vector matching',
      'Automated bank covenant & loan compliance monitoring',
      'Audit-ready working papers generated on demand',
      'Human Partner governance for regulatory edge cases',
      'Direct one-click export for banks and venture investors'
    ]
  },
  {
    id: 'serv-diligence',
    title: 'Autonomous M&A & Contract Diligence',
    badge: 'Enterprise Intelligence',
    description: 'Feed thousands of legal contracts, vendor agreements, and balance sheets. Receive deep liability exposure reports and redlines within hours.',
    turnaround: '4 Hours',
    sla: 'Zero clause hallucination guarantee',
    startingPrice: '$899/deal',
    traditionalPrice: '$18,000+',
    features: [
      'Exhaustive indemnity & change-of-control risk scans',
      'EBITDA normalization & working capital peg computation',
      'Automated redline markups with statutory citations',
      'Senior Corporate Attorney final checkpoint approval'
    ]
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How does Aegis differ from traditional SaaS like QuickBooks or TurboTax?',
    a: 'Traditional SaaS gives you an empty tool and expects you or your expensive staff to do 100% of the manual labor. Aegis is a full-stack AI Service Operator: we are the actual licensed professional firm. You provide raw financial documents; our autonomous agent swarm executes the calculations, compliance verification, and filing. We fulfill the contract directly.'
  },
  {
    q: 'Who carries legal liability for the tax return or financial audit?',
    a: 'Aegis carries the fiduciary liability. Every completed filing is certified and signed by a licensed Human Partner (CPA or Attorney) and backed by our $5,000,000 professional Errors & Omissions insurance policy. You get the speed of AI with the institutional backing of a premier firm.'
  },
  {
    q: 'What is the role of Human-in-the-Loop (HITL) in your platform?',
    a: 'Humans do NOT perform data entry, arithmetic, or routine document sorting—AI does that 1,000x faster and with near-zero error. Instead, our human CPAs and attorneys are positioned strictly at high-stakes decision checkpoints: statutory ambiguities, legal elections (like Section 179 expensing), and edge cases where human accountability and strategic intuition are mandatory.'
  },
  {
    q: 'How can you charge 80% less than traditional accounting and audit firms?',
    a: 'Traditional firms bill $300-$700/hour because human associates spend 95% of their billable hours manually typing spreadsheet data, chasing missing receipts, and cross-referencing tax code manuals. By running autonomous multi-agent execution, our labor cost per engagement drops by over 90%, allowing us to pass massive savings to you while achieving industry-leading margins.'
  },
  {
    q: 'Can startups and solopreneurs afford this?',
    a: 'Yes! That is the core market disruption. Elite tax strategies (like R&D credits and cross-border nexus optimization) were historically reserved for Fortune 500s because boutique firms refused to take clients paying under $10,000. Our autonomous infrastructure allows us to profitably serve solo founders and seed startups starting at just $189/mo.'
  }
];

