// MongoDB Client Service for local laptop database (mongodb://127.0.0.1:27017)
export const MONGODB_LOCAL_URI = 'mongodb://127.0.0.1:27017';
export const MONGODB_DB_NAME = 'homigo_aegis_db';

const API_BASE = '/api';

export interface ServiceContractRecord {
  id?: string;
  _id?: string;
  entity_name: string;
  service_scope: string;
  fiscal_period: string;
  raw_files: string[];
  status: 'pending' | 'processing' | 'cpa_review' | 'completed' | 'filed';
  cpa_reviewer?: string;
  sla_minutes?: number;
  created_at?: string;
}

export interface HitlCheckpointRecord {
  id?: string;
  _id?: string;
  contract_id?: string;
  question: string;
  statutory_ref: string;
  decision_elected: string;
  cpa_reviewer: string;
  cpa_license: string;
  risk_category: string;
  ai_confidence: number;
  certified_at?: string;
}

export interface AgentExecutionLogRecord {
  id?: string;
  _id?: string;
  contract_id?: string;
  agent_name: string;
  agent_role: 'ingestion' | 'calculation' | 'compliance' | 'synthesis';
  execution_time_ms: number;
  tokens_processed: number;
  confidence_score: number;
  findings: string[];
  citations?: string[];
  status: string;
  created_at?: string;
}

export interface MongoHealthStatus {
  status: 'connected' | 'disconnected' | 'error';
  uri: string;
  db_name: string;
  collections?: string[];
  contracts_count?: number;
  server?: string;
  message?: string;
}

// 1. Check MongoDB Health
export async function checkMongoHealth(): Promise<MongoHealthStatus> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return {
      status: 'disconnected',
      uri: MONGODB_LOCAL_URI,
      db_name: MONGODB_DB_NAME,
      message: `HTTP ${res.status}: Backend API is starting up.`
    };
  } catch (err: any) {
    return {
      status: 'disconnected',
      uri: MONGODB_LOCAL_URI,
      db_name: MONGODB_DB_NAME,
      message: 'Ensure the local MongoDB API server is running on port 5000.'
    };
  }
}

// 2. Contracts CRUD
export async function persistServiceContractToMongo(contract: Omit<ServiceContractRecord, 'id' | '_id' | 'created_at'>) {
  try {
    const res = await fetch(`${API_BASE}/contracts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract)
    });

    if (res.ok) {
      const result = await res.json();
      return { data: result.data || { id: result.id, ...contract }, error: null, isMongo: true };
    }
    throw new Error(`Server returned ${res.status}`);
  } catch (err: any) {
    console.warn('[MongoDB Client] Fallback to simulated offline document:', err.message);
    return {
      data: {
        id: `local-mongo-${Date.now().toString(16)}`,
        ...contract,
        created_at: new Date().toISOString()
      },
      error: err,
      isMongo: false
    };
  }
}

export async function fetchServiceContractsFromMongo(): Promise<{ data: ServiceContractRecord[]; error: any; isMongo: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/contracts`);
    if (res.ok) {
      const data = await res.json();
      return { data, error: null, isMongo: true };
    }
    throw new Error(`Server returned ${res.status}`);
  } catch (err: any) {
    return { data: [], error: err, isMongo: false };
  }
}

// 3. HITL Checkpoints
export async function recordHitlDecisionToMongo(checkpoint: HitlCheckpointRecord) {
  try {
    const res = await fetch(`${API_BASE}/hitl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkpoint)
    });
    if (res.ok) {
      const result = await res.json();
      return { data: result.data, error: null };
    }
  } catch (err) {
    console.warn('[MongoDB Client] Logging HITL offline fallback:', err);
  }
  return { data: null, error: null };
}

export async function fetchHitlDecisionsFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/hitl`);
    if (res.ok) {
      return await res.json();
    }
  } catch (_) {}
  return [];
}

// 4. Agent Execution Logs
export async function logAgentExecutionToMongo(log: AgentExecutionLogRecord) {
  try {
    const res = await fetch(`${API_BASE}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (_) {}
  return null;
}
