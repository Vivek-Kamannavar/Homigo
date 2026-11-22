-- =========================================================================
-- Aegis Autonomous AI Operating Firm: PostgreSQL Database Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/bzdbzazwwybdbtvgdcgg/sql/new
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: Service Contracts (Core service engagements fulfilled by the firm)
CREATE TABLE IF NOT EXISTS service_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_name TEXT NOT NULL,
    service_scope TEXT NOT NULL,
    fiscal_period TEXT NOT NULL,
    raw_files TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'cpa_review', 'completed', 'filed')),
    cpa_reviewer TEXT,
    sla_minutes INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: Agent Execution Logs (Autonomous multi-agent telemetry stream)
CREATE TABLE IF NOT EXISTS agent_execution_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID REFERENCES service_contracts(id) ON DELETE SET NULL,
    case_id TEXT,
    agent_name TEXT NOT NULL,
    agent_role TEXT NOT NULL CHECK (agent_role IN ('ingestion', 'calculation', 'compliance', 'synthesis')),
    execution_time_ms INTEGER NOT NULL,
    tokens_processed INTEGER NOT NULL,
    confidence_score NUMERIC(5,2) NOT NULL,
    findings JSONB DEFAULT '[]'::jsonb,
    citations JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: Human-in-the-Loop Checkpoints (High-stakes judgment & liability sign-offs)
CREATE TABLE IF NOT EXISTS hitl_checkpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID REFERENCES service_contracts(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    statutory_ref TEXT NOT NULL,
    decision_elected TEXT NOT NULL,
    cpa_reviewer TEXT NOT NULL,
    cpa_license TEXT NOT NULL,
    risk_category TEXT NOT NULL,
    ai_confidence NUMERIC(5,2) NOT NULL,
    certified_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE service_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE hitl_checkpoints ENABLE ROW LEVEL SECURITY;

-- Allow Public/Anon access for demo operations (adjust in production as needed)
CREATE POLICY "Allow public select on service_contracts" 
    ON service_contracts FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert on service_contracts" 
    ON service_contracts FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public select on agent_execution_logs" 
    ON agent_execution_logs FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert on agent_execution_logs" 
    ON agent_execution_logs FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public select on hitl_checkpoints" 
    ON hitl_checkpoints FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert on hitl_checkpoints" 
    ON hitl_checkpoints FOR INSERT 
    WITH CHECK (true);

-- Insert initial sample seed data
INSERT INTO service_contracts (entity_name, service_scope, fiscal_period, raw_files, status, cpa_reviewer, sla_minutes)
VALUES 
    ('TechPulse Robotics Inc.', 'Autonomous Corporate Tax Filing', '2024', ARRAY['Gusto_Payroll.csv', 'Mercury_Statements.pdf'], 'completed', 'Sarah Jenkins, CPA', 6),
    ('Apex Cold-Chain Fleet LLC', 'Contractor 1099-NEC & Payroll Audit', '2024-Q4', ARRAY['Dispatch_Settlements.xlsx', 'WEX_Fuel_Cards.csv'], 'completed', 'David Vance, Esq. & CPA', 4)
ON CONFLICT DO NOTHING;
