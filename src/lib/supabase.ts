import { createClient } from '@supabase/supabase-js';

// Supabase project connection for project: bzdbzazwwybdbtvgdcgg
export const SUPABASE_PROJECT_ID = 'bzdbzazwwybdbtvgdcgg';
export const SUPABASE_DEFAULT_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('supabase_anon_key') : null;

  const url = envUrl && envUrl.trim() !== '' ? envUrl : SUPABASE_DEFAULT_URL;
  const anonKey = (localKey && localKey.trim() !== '') ? localKey : (envKey || '');

  return { url, anonKey };
};

export const isSupabaseConfigured = () => {
  const { anonKey } = getSupabaseConfig();
  return Boolean(anonKey && anonKey.trim().length > 15);
};

export const getSupabaseClient = () => {
  const { url, anonKey } = getSupabaseConfig();
  return createClient(url, anonKey || 'placeholder-anon-key');
};

export const supabase = getSupabaseClient();

export interface ServiceContractRecord {
  id?: string;
  entity_name: string;
  service_scope: string;
  fiscal_period: string;
  raw_files: string[];
  status: 'pending' | 'processing' | 'cpa_review' | 'completed' | 'filed';
  cpa_reviewer?: string;
  sla_minutes?: number;
  created_at?: string;
}

export interface AgentExecutionLogRecord {
  id?: string;
  contract_id?: string;
  case_id?: string;
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

export interface HitlCheckpointRecord {
  id?: string;
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

// Database helper operations
export async function persistServiceContract(contract: Omit<ServiceContractRecord, 'id' | 'created_at'>) {
  const client = getSupabaseClient();
  const configured = isSupabaseConfigured();

  if (!configured) {
    console.warn('[Supabase] VITE_SUPABASE_ANON_KEY is not configured yet. Saving to local simulation store.');
    return { 
      data: { 
        id: `local-ctr-${Math.floor(100000 + Math.random() * 900000)}`, 
        ...contract,
        created_at: new Date().toISOString()
      }, 
      error: null,
      isLocal: true 
    };
  }

  try {
    const { data, error } = await client
      .from('service_contracts')
      .insert([contract])
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Error inserting contract:', error);
      return { 
        data: { 
          id: `fallback-${Date.now()}`, 
          ...contract,
          created_at: new Date().toISOString()
        }, 
        error, 
        isLocal: true 
      };
    }
    return { data, error: null, isLocal: false };
  } catch (err) {
    console.error('[Supabase] Unexpected error:', err);
    return { data: null, error: err, isLocal: true };
  }
}

export async function fetchServiceContracts() {
  if (!isSupabaseConfigured()) {
    return { data: [], error: null, isLocal: true };
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('service_contracts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    return { data, error, isLocal: false };
  } catch (err) {
    return { data: [], error: err, isLocal: true };
  }
}

export async function logAgentExecution(log: AgentExecutionLogRecord) {
  if (!isSupabaseConfigured()) return { data: null, error: null };

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('agent_execution_logs')
      .insert([log])
      .select();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function recordHitlDecision(checkpoint: HitlCheckpointRecord) {
  if (!isSupabaseConfigured()) return { data: null, error: null };

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('hitl_checkpoints')
      .insert([checkpoint])
      .select();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}
