import React, { useState, useEffect } from 'react';
import { WORKFLOW_CASES } from '../data/mockData';
import { WorkflowCase, AgentStep } from '../types';
import {
  Cpu,
  FileSpreadsheet,
  ShieldAlert,
  FileCheck2,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  ExternalLink,
  ChevronDown,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveAgentSimulatorProps {
  onTriggerHitlView: (workflow: WorkflowCase) => void;
}

export const LiveAgentSimulator: React.FC<LiveAgentSimulatorProps> = ({ onTriggerHitlView }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(WORKFLOW_CASES[0].id);
  const currentCase = WORKFLOW_CASES.find((c) => c.id === selectedCaseId) || WORKFLOW_CASES[0];

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [stepStatuses, setStepStatuses] = useState<Record<string, AgentStep['status']>>({
    'step-1': 'idle',
    'step-2': 'idle',
    'step-3': 'idle',
    'step-4': 'idle'
  });
  const [hitlApproved, setHitlApproved] = useState<boolean>(false);
  const [selectedDecision, setSelectedDecision] = useState<string>('opt-a');
  const [showConsoleLogs, setShowConsoleLogs] = useState<boolean>(true);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [executionMetrics, setExecutionMetrics] = useState({
    totalTokens: 0,
    elapsedMs: 0,
    complianceScore: 100
  });

  // Reset state when switching case
  useEffect(() => {
    resetSimulation();
  }, [selectedCaseId]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    setLogMessages((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 40)]);
  };

  const resetSimulation = () => {
    setIsExecuting(false);
    setActiveStepIndex(0);
    setHitlApproved(false);
    setStepStatuses({
      'step-1': 'idle',
      'step-2': 'idle',
      'step-3': 'idle',
      'step-4': 'idle'
    });
    setLogMessages([
      `[INIT] Autonomous multi-agent pipeline configured for: ${currentCase.clientName}`,
      `[INIT] Service contract: ${currentCase.contractType} ($${currentCase.aegisCost} vs $${currentCase.traditionalCost} trad. firm)`,
      `[READY] Waiting for trigger command...`
    ]);
    setExecutionMetrics({
      totalTokens: 0,
      elapsedMs: 0,
      complianceScore: 100
    });
  };

  const runSimulation = () => {
    setIsExecuting(true);
    setHitlApproved(false);
    setActiveStepIndex(0);
    setStepStatuses({
      'step-1': 'running',
      'step-2': 'idle',
      'step-3': 'idle',
      'step-4': 'idle'
    });
    addLog(`START: Ingestion Agent (Nova-Ingest) mounting ${currentCase.rawFilesCount} raw files...`);

    // Step 1: Ingestion
    setTimeout(() => {
      setStepStatuses((prev) => ({ ...prev, 'step-1': 'completed', 'step-2': 'running' }));
      setActiveStepIndex(1);
      setExecutionMetrics((prev) => ({
        ...prev,
        totalTokens: 124500,
        elapsedMs: 1420
      }));
      addLog(`✓ Nova-Ingest extracted 1,420 transactions. Zero reconciliation variance.`);
      addLog(`START: Computation Agent (Cortex-Math) compiling Section 174 & IRC 41 models...`);

      // Step 2: Computation
      setTimeout(() => {
        setStepStatuses((prev) => ({ ...prev, 'step-2': 'completed', 'step-3': 'running' }));
        setActiveStepIndex(2);
        setExecutionMetrics((prev) => ({
          ...prev,
          totalTokens: 212900,
          elapsedMs: 3600
        }));
        addLog(`✓ Cortex-Math derived $34,200 payroll tax credit offset.`);
        addLog(`START: Compliance Guard (Lex-Audit) scanning 48,000 pages of IRS code...`);

        // Step 3: Compliance & HITL Trigger
        setTimeout(() => {
          setStepStatuses((prev) => ({ ...prev, 'step-3': 'waiting-hitl' }));
          setIsExecuting(false);
          setExecutionMetrics((prev) => ({
            ...prev,
            totalTokens: 309200,
            elapsedMs: 5450,
            complianceScore: 99.2
          }));
          addLog(`⚠️ HITL TRIGGER: High-liability judgment required on Section 179 expensing.`);
          addLog(`PAUSED: Routing to licensed CPA Partner Sarah Jenkins for certified election.`);
        }, 2200);

      }, 2000);

    }, 1800);
  };

  const handleApproveHitl = (optionId: string) => {
    setSelectedDecision(optionId);
    setHitlApproved(true);
    setIsExecuting(true);
    addLog(`CPA SIGN-OFF: Partner Sarah Jenkins (CPA Lic #094821) certified ${optionId === 'opt-a' ? 'Option A (Section 179 Full Expensing)' : 'Option B'}.`);
    addLog(`START: Synthesis & Filing Agent (Aegis-Drafter) assembling IRS 1120-S package...`);

    setStepStatuses((prev) => ({
      ...prev,
      'step-3': 'completed',
      'step-4': 'running'
    }));
    setActiveStepIndex(3);

    // Step 4: Synthesis & Complete
    setTimeout(() => {
      setStepStatuses((prev) => ({ ...prev, 'step-4': 'completed' }));
      setIsExecuting(false);
      setExecutionMetrics((prev) => ({
        ...prev,
        totalTokens: 354400,
        elapsedMs: 6390
      }));
      addLog(`✓ Form 1120-S & Form 6765 verified against IRS MeF schema.`);
      addLog(`🏆 FILING COMPLETED: Stamped with $5M E&O liability guarantee. Delivered in 6.4 minutes.`);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  const getStepIcon = (role: string) => {
    switch (role) {
      case 'ingestion':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'calculation':
        return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'compliance':
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'synthesis':
        return <FileCheck2 className="w-5 h-5 text-cyan-400" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="live-simulator" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background grid line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE INTERACTIVE AGENT ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Autonomous Multi-Agent Execution in Action
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base">
              Select a real business scenario, execute the 4-agent swarm pipeline, observe autonomous data ingestion and statutory auditing, and experience the Human-in-the-Loop CPA checkpoint.
            </p>
          </div>

          {/* Workflow Selector */}
          <div className="flex items-center gap-3 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            {WORKFLOW_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedCaseId === c.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.clientName}
              </button>
            ))}
          </div>
        </div>

        {/* Contract Brief Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Contract Deliverable:
                </span>
                <span className="text-sm font-bold text-white">{currentCase.title}</span>
              </div>
              <div className="text-xs text-slate-400 flex flex-wrap gap-4 mt-2">
                <span><strong>Client Profile:</strong> {currentCase.clientType}</span>
                <span><strong>Raw Ingestion:</strong> {currentCase.inputSummary}</span>
              </div>
            </div>

            {/* Price & Turnaround Disruption Box */}
            <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 line-through">
                  Traditional: ${currentCase.traditionalCost} ({currentCase.traditionalDays} days)
                </div>
                <div className="text-sm font-mono font-bold text-emerald-400">
                  Aegis Firm: ${currentCase.aegisCost} ({currentCase.aegisMinutes} min)
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <button
                onClick={runSimulation}
                disabled={isExecuting}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-lg ${
                  isExecuting
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 hover:from-emerald-300 hover:to-teal-300 shadow-emerald-500/20 active:scale-95'
                }`}
              >
                {isExecuting ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-slate-400" />
                    <span>Executing Swarm...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Run Autonomous Pipeline</span>
                  </>
                )}
              </button>
              <button
                onClick={resetSimulation}
                title="Reset simulation"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline Visual Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {currentCase.steps.map((step, idx) => {
            const status = stepStatuses[step.id];
            const isWaitingHitl = status === 'waiting-hitl';
            const isCompleted = status === 'completed';
            const isRunning = status === 'running';

            return (
              <div
                key={step.id}
                className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
                  isWaitingHitl
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : isRunning
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : isCompleted
                    ? 'bg-slate-900/90 border-slate-700/80'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-70'
                }`}
              >
                {/* Header of card */}
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {getStepIcon(step.agentRole)}
                  </div>
                  <div>
                    {isWaitingHitl && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        HITL REVIEW
                      </span>
                    )}
                    {isRunning && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <Activity className="w-3 h-3 animate-spin" />
                        PROCESSING
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        VERIFIED
                      </span>
                    )}
                    {status === 'idle' && (
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        QUEUED
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold tracking-wider">
                  Agent 0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">{step.agentName}</h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {step.description}
                </p>

                {/* Metrics Pill */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Conf: <strong className="text-slate-200">{step.confidenceScore}%</strong></span>
                  <span>{step.executionTimeMs}ms</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Human-in-the-Loop High-Liability Checkpoint Modal / Banner if triggered */}
        {stepStatuses['step-3'] === 'waiting-hitl' && !hitlApproved && (
          <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border-2 border-amber-500/60 shadow-2xl relative animate-fadeIn">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-amber-500 text-slate-950 rounded uppercase">
                    Pillar 3: Human-in-the-Loop Decision Station
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    Statutory Ambiguity Flagged
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {currentCase.hitlCheckpoint.question}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Statutory Reference: {currentCase.hitlCheckpoint.sectionRef}
                </p>

                {/* AI Reasoning */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Statutory Analysis (Confidence: {currentCase.hitlCheckpoint.aiConfidence}%):</span>
                  </div>
                  <p>{currentCase.hitlCheckpoint.aiRecommendation}</p>
                </div>

                {/* The 2 High-Stakes Options */}
                <div className="mt-4 space-y-3">
                  {currentCase.hitlCheckpoint.options.map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedDecision(opt.id)}
                      className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedDecision === opt.id
                          ? 'bg-slate-800/90 border-emerald-400 shadow-md ring-1 ring-emerald-400/30'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hitl-opt"
                            checked={selectedDecision === opt.id}
                            onChange={() => setSelectedDecision(opt.id)}
                            className="text-emerald-500 focus:ring-emerald-400"
                          />
                          <span className="text-xs font-bold text-white">{opt.label}</span>
                        </div>
                        {opt.cpaRecommendation && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            CPA Endorsed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 pl-5">{opt.description}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Licensed CPA Reviewer Card & Sign-Off Trigger */}
              <div className="w-full lg:w-80 shrink-0 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Assigned Supervising Partner</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={currentCase.hitlCheckpoint.cpaReviewer.avatar}
                      alt={currentCase.hitlCheckpoint.cpaReviewer.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {currentCase.hitlCheckpoint.cpaReviewer.name}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono">
                        {currentCase.hitlCheckpoint.cpaReviewer.license}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 italic bg-slate-900/80 p-3 rounded-lg border border-slate-800 leading-relaxed mb-4">
                    "{currentCase.hitlCheckpoint.cpaReviewer.statement}"
                  </p>
                </div>

                <button
                  onClick={() => handleApproveHitl(selectedDecision)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 hover:from-amber-300 hover:to-emerald-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>Certify & Sign as CPA Partner</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* When Done: Certified Government Deliverable Card */}
        {stepStatuses['step-4'] === 'completed' && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 shadow-xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      Contract Fulfilled by Aegis Operating Firm
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      IRS E-Filed & Stamped
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    Form 1120-S & Form 6765 ($34,200 Tax Credit) Successfully Signed & Stamped
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Supervising Partner: Sarah Jenkins, CPA | E&O Policy #AEGIS-5M-2024 | Completed in 6.4 minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Downloaded Certified IRS Return & CPA Opinion Memo packet.')}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Signed IRS Packet</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Console Execution Stream & Token Throughput */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-slate-300">
                MULTI-AGENT TELEMETRY & AUDIT STREAM
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Tokens: <strong className="text-emerald-400">{executionMetrics.totalTokens.toLocaleString()}</strong></span>
              <span>Latency: <strong className="text-slate-200">{executionMetrics.elapsedMs}ms</strong></span>
              <span>Compliance: <strong className="text-emerald-400">{executionMetrics.complianceScore}%</strong></span>
              <button
                onClick={() => setShowConsoleLogs(!showConsoleLogs)}
                className="text-slate-400 hover:text-white"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showConsoleLogs ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showConsoleLogs && (
            <div className="p-4 font-mono text-xs text-slate-300 bg-slate-950/90 max-h-56 overflow-y-auto space-y-1.5">
              {logMessages.map((log, i) => {
                const isWarn = log.includes('⚠️') || log.includes('TRIGGER');
                const isSuccess = log.includes('✓') || log.includes('COMPLETED') || log.includes('CPA');
                return (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      isWarn ? 'text-amber-300 font-semibold' : isSuccess ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

