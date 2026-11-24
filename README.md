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

---

## 🌐 The 8 Dedicated Platform Webpages

The application is architected into 8 distinct full-page experiences using `react-router-dom`:

1. **`/` — Overview & Executive Platform Portal**: Complete paradigm breakdown, high-level architecture directory, and instant service contract launcher.
2. **`/pillars` — The 4 Foundational Pillars**: In-depth analysis of Tool Provider vs Service Operator, Multi-Agent Swarms, High-Value HITL, and Market Disruption with comparative matrix.
3. **`/simulator` — Live Multi-Agent Swarm Cockpit**: Real-time 4-agent execution telemetry (Nova-Ingest, Cortex-Math, Lex-Audit, Aegis-Drafter), token counters, and live statutory audit logs.
4. **`/hitl` — Human-in-the-Loop Decision Station**: Dedicated partner review station for high-liability edge cases (IRC § 179 vs § 174, Wayfair multi-state nexus, M&A change of control).
5. **`/economics` — 10x Disruption & ROI Calculator**: Interactive financial sliders (team size & transaction volume) comparing Traditional Big 4 vs DIY SaaS vs Aegis Operator.
6. **`/services` — Regulated Service Catalog**: Contract specifications for Corporate Tax (1120-S), GAAP Monthly Audit, 1099 Safe Harbor, and R&D Credit Certification.
7. **`/database` — Cloud Firestore Database Portal**: Live collection explorer for Firebase Project `saas-f91ec` with document viewer, test ping, and console links.
8. **`/assurance` — Customer Stories, Fiduciary Assurance & FAQ**: Real startup case studies (YC W23, Logistics fleets), Circular 230 legal notices, and $5M E&O policy disclosures.

---

## 🗄 Database Layer: Firebase Cloud Firestore
Connected to Firebase Project: **`saas-f91ec`**  
Console URL: [https://console.firebase.google.com/project/saas-f91ec/overview](https://console.firebase.google.com/project/saas-f91ec/overview)  
Firestore Database: [https://console.firebase.google.com/project/saas-f91ec/firestore](https://console.firebase.google.com/project/saas-f91ec/firestore)

### Firestore Collections:
1. **`service_contracts`:** Records incoming service fulfillment contracts, company name, scope, raw attachments, assigned CPA reviewer, and completion SLA.
2. **`agent_execution_logs`:** Telemetry event log for every autonomous agent execution step, token count, latency, and statutory findings.
3. **`hitl_checkpoints`:** Audit trail for Human-in-the-Loop CPA partner reviews, selected options, statutory citations, and certified timestamps.

### Database Setup:
1. Open your Firebase project: [https://console.firebase.google.com/project/saas-f91ec/firestore](https://console.firebase.google.com/project/saas-f91ec/firestore).
2. Create your Cloud Firestore database (in test mode or production mode).
3. Find your **Web API Key** from Project Settings: [https://console.firebase.google.com/project/saas-f91ec/settings/general](https://console.firebase.google.com/project/saas-f91ec/settings/general).
4. Add your API key into `.env` as `VITE_FIREBASE_API_KEY` or paste it in the in-app Database Settings panel in the navigation bar.

---

## 🛠 Tech Stack
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Neon Glow Design System
- **Icons:** Lucide React
- **Visuals & Telemetry:** Canvas Confetti, Multi-Agent Console Telemetry

---

## 📜 License & Compliance
Delaware Fiduciary License #AEGIS-FID-2024. IRS Modernized e-File (MeF) Authorized Provider.

