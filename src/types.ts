export type AgentRole = 'ingestion' | 'calculation' | 'compliance' | 'synthesis';

export interface AgentStep {
  id: string;
  agentRole: AgentRole;
  agentName: string;
  agentIcon: string;
  status: 'idle' | 'running' | 'completed' | 'flagged' | 'waiting-hitl';
  title: string;
  description: string;
  executionTimeMs: number;
  tokensProcessed: number;
  confidenceScore: number;
  findings: string[];
  citations?: string[];
  metrics?: Record<string, string | number>;
  hitlRequired?: boolean;
}

export interface WorkflowCase {
  id: string;
  title: string;
  clientType: string;
  clientName: string;
  contractType: 'Corporate Tax & R&D Credit' | 'Statutory Books & Audit' | 'Cross-Border M&A Diligence' | 'Annual 1099/W2 Payroll Reconciliation';
  inputSummary: string;
  slaTarget: string;
  traditionalCost: number;
  aegisCost: number;
  traditionalDays: number;
  aegisMinutes: number;
  rawFilesCount: number;
  fileTypes: string[];
  steps: AgentStep[];
  hitlCheckpoint: {
    question: string;
    sectionRef: string;
    aiRecommendation: string;
    aiConfidence: number;
    riskCategory: 'High Liability' | 'Regulatory Ambiguity' | 'Statutory Threshold';
    options: {
      id: string;
      label: string;
      description: string;
      cpaRecommendation?: boolean;
    }[];
    cpaReviewer: {
      name: string;
      license: string;
      jurisdiction: string;
      avatar: string;
      statement: string;
    };
  };
}

export interface PillarDetail {
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  traditionalSaaSVsAegis: {
    traditional: string;
    aegis: string;
  };
  keyPillars: {
    title: string;
    desc: string;
  }[];
  stat: {
    value: string;
    label: string;
  };
}

