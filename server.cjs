const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'homigo_aegis_db';

app.use(cors());
app.use(express.json());

let client = null;
let db = null;

// Connect to MongoDB
async function connectToMongo() {
  try {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`[MongoDB] Connected successfully to local MongoDB at ${MONGODB_URI}/${DB_NAME}`);

    // Seed initial demo data if collections are empty
    await seedInitialData();
  } catch (err) {
    console.error(`[MongoDB] Connection error to ${MONGODB_URI}:`, err.message);
  }
}

async function seedInitialData() {
  if (!db) return;
  try {
    const contractsCol = db.collection('service_contracts');
    const count = await contractsCol.countDocuments();
    if (count === 0) {
      await contractsCol.insertMany([
        {
          entity_name: 'TechPulse Robotics Inc.',
          service_scope: 'Autonomous Corporate Tax Filing (Form 1120-S)',
          fiscal_period: '2024',
          raw_files: ['Mercury_Bank_2024_Export.csv', 'Gusto_W2_Summary.pdf', 'AWS_Cloud_Ledger.pdf'],
          status: 'completed',
          cpa_reviewer: 'Sarah Jenkins, CPA (Partner #094821)',
          sla_minutes: 6,
          created_at: new Date()
        },
        {
          entity_name: 'Apex Cold-Chain Fleet LLC',
          service_scope: 'Contractor 1099-NEC & Statutory Payroll Audit',
          fiscal_period: '2024-Q4',
          raw_files: ['WEX_Fuel_Cards.csv', 'Driver_Dispatch_Settlements.xlsx'],
          status: 'completed',
          cpa_reviewer: 'David Vance, Esq. & CPA (#88192)',
          sla_minutes: 4,
          created_at: new Date()
        },
        {
          entity_name: 'Zenith BioHealth Corp.',
          service_scope: 'Section 41 R&D Credit Certification',
          fiscal_period: '2024',
          raw_files: ['Lab_Equipment_Leases.pdf', 'Engineering_Git_Commits.csv'],
          status: 'processing',
          cpa_reviewer: 'Sarah Jenkins, CPA (Partner)',
          sla_minutes: 8,
          created_at: new Date()
        }
      ]);
      console.log('[MongoDB] Seeded default service_contracts into MongoDB.');
    }

    const hitlCol = db.collection('hitl_checkpoints');
    const hitlCount = await hitlCol.countDocuments();
    if (hitlCount === 0) {
      await hitlCol.insertMany([
        {
          question: 'Elect Section 179 Accelerated Expensing vs Section 174 5-Year Amortization for $48,000 Hybrid Lab Lease?',
          statutory_ref: 'IRC § 179 vs § 174 (Dual-Use Facilities)',
          decision_elected: 'Option A: Section 179 Full Immediate Expensing ($34,200 payroll tax credit offset)',
          cpa_reviewer: 'Sarah Jenkins, CPA, MST (Delaware #094821)',
          risk_category: 'High Liability',
          ai_confidence: 94.2,
          certified_at: new Date()
        },
        {
          question: 'Independent Contractor Safe Harbor 530 Verification for 45 Transportation Fleet Drivers?',
          statutory_ref: 'DOL 29 CFR Part 795 & Rev. Act 1978 § 530',
          decision_elected: 'Approved 1099-NEC Classification with Aegis Audit Defense Shield Guarantee',
          cpa_reviewer: 'David Vance, Esq. & CPA (Bar #492019)',
          risk_category: 'Statutory Threshold',
          ai_confidence: 93.8,
          certified_at: new Date()
        }
      ]);
    }
  } catch (err) {
    console.warn('[MongoDB] Seeding error:', err.message);
  }
}

// 1. Health check & Diagnostics
app.get('/api/health', async (req, res) => {
  if (!db) {
    try {
      await connectToMongo();
    } catch (_) {}
  }

  if (db) {
    try {
      const pingResult = await db.command({ ping: 1 });
      const collections = await db.listCollections().toArray();
      const contractsCount = await db.collection('service_contracts').countDocuments();
      return res.json({
        status: 'connected',
        uri: MONGODB_URI,
        db_name: DB_NAME,
        ping: pingResult,
        collections: collections.map(c => c.name),
        contracts_count: contractsCount,
        server: 'MongoDB Server on Laptop (127.0.0.1:27017)'
      });
    } catch (err) {
      return res.status(503).json({
        status: 'error',
        message: err.message,
        uri: MONGODB_URI
      });
    }
  }

  res.status(503).json({
    status: 'disconnected',
    uri: MONGODB_URI,
    message: 'Could not reach local MongoDB on 127.0.0.1:27017'
  });
});

// 2. Contracts Collection
app.get('/api/contracts', async (req, res) => {
  try {
    if (!db) await connectToMongo();
    if (!db) return res.status(503).json({ error: 'MongoDB disconnected' });

    const contracts = await db.collection('service_contracts')
      .find({})
      .sort({ created_at: -1 })
      .limit(30)
      .toArray();

    // Map _id to string id
    const mapped = contracts.map(c => ({
      ...c,
      id: c._id.toString()
    }));

    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contracts', async (req, res) => {
  try {
    if (!db) await connectToMongo();
    if (!db) return res.status(503).json({ error: 'MongoDB disconnected' });

    const doc = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.collection('service_contracts').insertOne(doc);
    res.json({
      success: true,
      id: result.insertedId.toString(),
      data: { id: result.insertedId.toString(), ...doc }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. HITL Checkpoints Collection
app.get('/api/hitl', async (req, res) => {
  try {
    if (!db) await connectToMongo();
    if (!db) return res.status(503).json({ error: 'MongoDB disconnected' });

    const checkpoints = await db.collection('hitl_checkpoints')
      .find({})
      .sort({ certified_at: -1 })
      .limit(30)
      .toArray();

    res.json(checkpoints.map(h => ({ ...h, id: h._id.toString() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/hitl', async (req, res) => {
  try {
    if (!db) await connectToMongo();
    if (!db) return res.status(503).json({ error: 'MongoDB disconnected' });

    const doc = {
      ...req.body,
      certified_at: new Date()
    };

    const result = await db.collection('hitl_checkpoints').insertOne(doc);
    res.json({
      success: true,
      id: result.insertedId.toString(),
      data: { id: result.insertedId.toString(), ...doc }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Agent Execution Logs Collection
app.get('/api/logs', async (req, res) => {
  try {
    if (!db) await connectToMongo();
    if (!db) return res.status(503).json({ error: 'MongoDB disconnected' });

    const logs = await db.collection('agent_execution_logs')
      .find({})
      .sort({ created_at: -1 })
      .limit(50)
      .toArray();

    res.json(logs.map(l => ({ ...l, id: l._id.toString() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/logs', async (req, res) => {
  try {
    if (!db) await connectToMongo();
    if (!db) return res.status(503).json({ error: 'MongoDB disconnected' });

    const doc = {
      ...req.body,
      created_at: new Date()
    };

    const result = await db.collection('agent_execution_logs').insertOne(doc);
    res.json({
      success: true,
      id: result.insertedId.toString(),
      data: { id: result.insertedId.toString(), ...doc }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start listening and connect
app.listen(PORT, async () => {
  console.log(`[API Server] Running on http://localhost:${PORT}`);
  await connectToMongo();
});
