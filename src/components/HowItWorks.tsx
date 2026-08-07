"use client";

import { useState } from "react";
import { FileCode2, Cpu, CheckCircle2, Sparkles, Rocket } from "lucide-react";

const workflowSteps = [
  {
    num: "01",
    phase: "PLAN & ARCHITECT",
    title: "Requirements to Action Plan",
    icon: FileCode2,
    description: "Analyzes requirements (PRD/FRD) and generates structured implementation plans before code execution.",
    points: ["PRD Requirements Parsing", "Multi-Agent Task Assignment", "Architectural Constraint Check"],
    badge: "Requirements & Planning",
    bgClass: "bg-white text-black border-black/20",
    pillClass: "bg-black/5 text-neutral-700 font-bold",
    phaseClass: "text-neutral-500",
    titleClass: "text-black",
    descClass: "text-neutral-600",
    borderClass: "border-black/10",
    checkClass: "text-black",
    pointClass: "text-black",
  },
  {
    num: "02",
    phase: "BUILD & VERIFY",
    title: "Code, Test & Debug",
    icon: Cpu,
    description: "Specialized AI agents work together in your environment — writing code, running unit tests & debugging in real time.",
    points: ["Multi-LLM Architecture", "Automated Unit & E2E Testing", "Real-Time Error Log Diagnostics"],
    badge: "Coding & Debugging",
    bgClass: "bg-[#121212] text-white border-white/10",
    pillClass: "bg-white/10 text-neutral-300 font-bold",
    phaseClass: "text-neutral-400",
    titleClass: "text-white",
    descClass: "text-neutral-300",
    borderClass: "border-white/10",
    checkClass: "text-white",
    pointClass: "text-neutral-200",
  },
  {
    num: "03",
    phase: "COMPLETE & HANDOVER",
    title: "Work Completion & Handover",
    icon: Rocket,
    description: "Finalizes documentation, code verification, and project handover — delivering fully completed and tested software.",
    points: ["Complete Handover Documentation", "100% Test Pass Verification", "Clean Git Commit & PR Handover"],
    badge: "Work Completion",
    bgClass: "bg-[#1a0029] text-white border-[#59008C]",
    pillClass: "bg-[#59008C] text-white border border-[#59008C] font-bold",
    phaseClass: "text-purple-300",
    titleClass: "text-[#f3e8ff]",
    descClass: "text-purple-200/90",
    borderClass: "border-[#59008C]/50",
    checkClass: "text-[#59008C]",
    pointClass: "text-[#f3e8ff]",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-10 md:py-14 bg-white text-black border-y border-black/10 grid-bg">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-black text-white font-mono font-bold text-[10px] uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3 text-[#59008C]" />
              HOW DOTX WORKS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tighter uppercase leading-none font-mono">
              3-Phase Autonomous Workflow
            </h2>
          </div>
          <p className="text-neutral-600 font-mono text-xs font-bold max-w-md sm:text-right">
            From requirements analysis to shipped code & verified deliverables.
          </p>
        </div>

        {/* Compact 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-4 font-mono">
          {workflowSteps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-5 border-2 transition-all cursor-pointer flex flex-col justify-between brutal-shadow hover:scale-[1.01] ${step.bgClass} ${
                  isActive ? "ring-2 ring-black ring-offset-2" : "opacity-95 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black px-2 py-0.5 ${step.pillClass}`}>
                      {step.num}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${step.phaseClass}`}>
                      {step.phase}
                    </span>
                  </div>
                  <h3 className={`text-base font-black uppercase tracking-tight mb-2 ${step.titleClass}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-medium mb-4 ${step.descClass}`}>
                    {step.description}
                  </p>
                </div>

                <div className={`space-y-1.5 pt-3 border-t ${step.borderClass}`}>
                  {step.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] font-bold">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${step.checkClass}`} />
                      <span className={`truncate ${step.pointClass}`}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
