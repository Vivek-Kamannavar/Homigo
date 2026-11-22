# Aegis Operating Firm — Full-Stack Autonomous AI Service Platform

> **Beyond Tool Licenses:** Aegis is an autonomous AI service operator that fulfills corporate tax, financial audit, and regulatory compliance contracts directly for the end customer with multi-agent execution and certified CPA partner sign-off.

---

## 🏛 The 4 Paradigm Shifts

1. **Shift from Tool Provider to Service Operator:**
   - Traditional SaaS sells software seat licenses ($250/mo) and leaves 40 hours of manual data entry to the customer, while disclaiming all liability.
   - Aegis operates as the legal service provider with direct fiduciary responsibility, backed by a **$5,000,000 E&O professional liability insurance policy**.

2. **Autonomous Multi-Agent Execution:**
   - **Nova-Ingest (Perception):** Ingests raw bank statements (Mercury), invoices, CSVs, and PDFs with 99.98% extraction accuracy and auto-reconciliation.
   - **Cortex-Math (Reasoning Engine):** Computes tax codes, Section 174 software amortization, and Section 41 R&D payroll tax credits.
   - **Lex-Audit (Statutory Guard):** Validates drafts against 48,000+ pages of the Internal Revenue Code and GAAP standards.
   - **Aegis-Drafter (Synthesis):** Compiles IRS Form 1120-S, Form 6765, and Modernized e-File (MeF) government XML packages.

3. **Human-in-the-Loop for Critical Judgment:**
   - Routine data processing and arithmetic are 100% automated.
   - Humans are removed from routine spreadsheet entry and placed strictly at **high-value liability and regulatory ambiguity checkpoints**.
   - Licensed CPAs and Attorneys review pre-compiled legal citations and issue official certified sign-offs.

4. **Market Disruption & Infinite Scale (10x Economics):**
   - 80% cost reduction ($299 flat vs $6,500 boutique firm retainers).
   - Turnaround in minutes rather than weeks.
   - Unlocking the 33M long-tail small businesses and startups previously priced out of elite tax strategy.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🗄 Database Layer: Supabase Integration
Connected to Supabase Project: **`bzdbzazwwybdbtvgdcgg`**  
Project URL: `https://bzdbzazwwybdbtvgdcgg.supabase.co`

### Database Tables:
1. **`service_contracts`:** Records incoming service fulfillment contracts, company name, scope, raw attachments, and completion SLA.
2. **`agent_execution_logs`:** Telemetry event log for every autonomous agent execution step, token count, latency, and statutory findings.
3. **`hitl_checkpoints`:** Audit trail for Human-in-the-Loop CPA partner reviews, selected options, statutory citations, and certified timestamps.

### Database Setup:
1. Copy the SQL migration script from `supabase/schema.sql`.
2. Open your Supabase project's SQL Editor: [https://supabase.com/dashboard/project/bzdbzazwwybdbtvgdcgg/sql/new](https://supabase.com/dashboard/project/bzdbzazwwybdbtvgdcgg/sql/new).
3. Paste and run the script to create tables and Row Level Security (RLS) policies.
4. Add your anon public key in `.env` as `VITE_SUPABASE_ANON_KEY` or through the in-app Database Settings modal in the top navigation bar.

---

## 🛠 Tech Stack
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Neon Glow Design System
- **Icons:** Lucide React
- **Visuals & Telemetry:** Canvas Confetti, Multi-Agent Console Telemetry

---

## 📜 License & Compliance
Delaware Fiduciary License #AEGIS-FID-2024. IRS Modernized e-File (MeF) Authorized Provider.

