import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  Firestore 
} from 'firebase/firestore';

export const FIREBASE_PROJECT_ID = 'saas-f91ec';

export interface FirebaseConfigOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const getFirebaseConfig = (): FirebaseConfigOptions => {
  const localApiKey = typeof window !== 'undefined' ? localStorage.getItem('firebase_api_key') : null;
  const localAppId = typeof window !== 'undefined' ? localStorage.getItem('firebase_app_id') : null;
  const localSenderId = typeof window !== 'undefined' ? localStorage.getItem('firebase_sender_id') : null;

  const apiKey = (localApiKey && localApiKey.trim() !== '') ? localApiKey : (import.meta.env.VITE_FIREBASE_API_KEY || '');
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${FIREBASE_PROJECT_ID}.firebaseapp.com`;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || FIREBASE_PROJECT_ID;
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${FIREBASE_PROJECT_ID}.firebasestorage.app`;
  const messagingSenderId = (localSenderId && localSenderId.trim() !== '') ? localSenderId : (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '');
  const appId = (localAppId && localAppId.trim() !== '') ? localAppId : (import.meta.env.VITE_FIREBASE_APP_ID || '');

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };
};

export const isFirebaseConfigured = (): boolean => {
  const config = getFirebaseConfig();
  // Valid if API key has been provided or configured
  return Boolean(config.apiKey && config.apiKey.trim().length > 10);
};

let dbInstance: Firestore | null = null;

export const getDb = (): Firestore | null => {
  try {
    const config = getFirebaseConfig();
    if (!config.apiKey) return null;

    const app = getApps().length === 0 ? initializeApp(config) : getApp();
    if (!dbInstance) {
      dbInstance = getFirestore(app);
    }
    return dbInstance;
  } catch (err) {
    console.warn('[Firebase] Error initializing app:', err);
    return null;
  }
};

export interface ServiceContractRecord {
  id?: string;
  entity_name: string;
  service_scope: string;
  fiscal_period: string;
  raw_files: string[];
  status: 'pending' | 'processing' | 'cpa_review' | 'completed' | 'filed';
  cpa_reviewer?: string;
  sla_minutes?: number;
  created_at?: any;
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
  created_at?: any;
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
  certified_at?: any;
}

// Persist contract to Cloud Firestore
export async function persistServiceContractToFirestore(contract: Omit<ServiceContractRecord, 'id' | 'created_at'>) {
  const db = getDb();

  if (!db || !isFirebaseConfigured()) {
    console.warn('[Firebase] Running in local offline simulator mode (API key not yet set).');
    return {
      data: {
        id: `local-fb-${Math.floor(100000 + Math.random() * 900000)}`,
        ...contract,
        created_at: new Date().toISOString()
      },
      error: null,
      isLocal: true
    };
  }

  try {
    const contractsCol = collection(db, 'service_contracts');
    const docRef = await addDoc(contractsCol, {
      ...contract,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    return {
      data: {
        id: docRef.id,
        ...contract,
        created_at: new Date().toISOString()
      },
      error: null,
      isLocal: false
    };
  } catch (err: any) {
    console.error('[Firebase] Firestore insertion error:', err);
    return {
      data: {
        id: `fallback-fb-${Date.now()}`,
        ...contract,
        created_at: new Date().toISOString()
      },
      error: err,
      isLocal: true
    };
  }
}

// Fetch contracts from Cloud Firestore
export async function fetchServiceContractsFromFirestore() {
  const db = getDb();
  if (!db || !isFirebaseConfigured()) {
    return { data: [], error: null, isLocal: true };
  }

  try {
    const contractsCol = collection(db, 'service_contracts');
    const q = query(contractsCol, orderBy('created_at', 'desc'), limit(15));
    const snapshot = await getDocs(q);

    const contracts: ServiceContractRecord[] = [];
    snapshot.forEach((doc) => {
      contracts.push({ id: doc.id, ...(doc.data() as any) });
    });

    return { data: contracts, error: null, isLocal: false };
  } catch (err: any) {
    console.error('[Firebase] Error fetching documents:', err);
    return { data: [], error: err, isLocal: true };
  }
}

// Log agent telemetry step to Cloud Firestore
export async function logAgentExecutionToFirestore(log: AgentExecutionLogRecord) {
  const db = getDb();
  if (!db || !isFirebaseConfigured()) return { data: null, error: null };

  try {
    const logsCol = collection(db, 'agent_execution_logs');
    const docRef = await addDoc(logsCol, {
      ...log,
      created_at: serverTimestamp()
    });
    return { data: { id: docRef.id, ...log }, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

// Record Human-in-the-Loop decision to Cloud Firestore
export async function recordHitlDecisionToFirestore(checkpoint: HitlCheckpointRecord) {
  const db = getDb();
  if (!db || !isFirebaseConfigured()) return { data: null, error: null };

  try {
    const hitlCol = collection(db, 'hitl_checkpoints');
    const docRef = await addDoc(hitlCol, {
      ...checkpoint,
      certified_at: serverTimestamp()
    });
    return { data: { id: docRef.id, ...checkpoint }, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

