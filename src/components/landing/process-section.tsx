"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    id: "01",
    tag: "PING",
    title: "SEND A\nMESSAGE",
    description: "Share your current bottleneck or business goal. A simple message is all it takes to start.",
    code: "$ ping --contact",
    accent: "#06B6D4",
  },
  {
    id: "02",
    tag: "SCOPE",
    title: "INITIAL\nCONSULT",
    description: "Discovery call to map out the exact scope, timeline, and deliverables. No commitment, just clarity.",
    code: "$ consult --scope",
    accent: "#10B981",
  },
  {
    id: "03",
    tag: "SHIP",
    title: "EXECUTION\n& DELIVERY",
    description: "Receive milestones, clean code, and business deliverables. Full transparency at every step.",
    code: "$ ship --deliverables",
    accent: "#10B981",
  },
];

export function ProcessSection() {
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % STEPS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[active];

  return (
    <section id="process" ref={ref} className="relative border-t border-[#334155] bg-[#0E1525] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`border-b border-[#334155] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <span className="sys-tag mb-3 block">WORKING_PROCESS</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#F8FAFC]">
              HOW WE
              <br />
              <span className="text-[#94A3B8]" style={{ WebkitTextStroke: "1px #94A3B8", color: "transparent" }}>
                WORK
              </span>
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest">
            PING &nbsp;·&nbsp; SCOPE &nbsp;·&nbsp; SHIP
          </span>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[280px_1fr] border-b border-[#334155]">
          {/* Step nav */}
          <div className="border-r border-[#334155]">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`w-full text-left border-b border-[#334155] p-6 transition-all duration-200 group ${
                  active === i ? "bg-[#1E293B]" : "hover:bg-[#0F172A]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] text-[#94A3B8] tracking-widest">{s.tag}</span>
                  <span className="font-mono text-[10px] text-[#94A3B8]">{s.id}</span>
                </div>
                <h3 className={`font-display text-2xl leading-[0.9] transition-colors whitespace-pre-line ${
                  active === i ? "text-[#10B981]" : "text-[#94A3B8] group-hover:text-[#F8FAFC]"
                }`}>
                  {s.title}
                </h3>
                {/* Progress bar */}
                {active === i && (
                  <div className="mt-4 h-px bg-[#334155] overflow-hidden">
                    <div
                      key={active}
                      className="h-full bg-[#10B981]"
                      style={{ width: 0, animation: "draw-line 5s linear forwards" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="grid lg:grid-cols-2">
            {/* Description */}
            <div className="border-r border-[#334155] p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <p className="text-base text-[#94A3B8] leading-relaxed mb-8 font-sans">{step.description}</p>
                <a href="#contact" className="inline-flex items-center gap-2 font-mono text-[11px] text-[#10B981] tracking-wider hover:underline">
                  EXECUTE_CALL() →
                </a>
              </div>
              <div className="mt-8 font-mono text-[10px] text-[#94A3B8] border-t border-[#334155] pt-4">
                STEP &nbsp;{step.id} &nbsp;OF &nbsp;03
              </div>
            </div>

            {/* Terminal preview */}
            <div className="bg-[#0F172A]">
              <div className="border-b border-[#334155] px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#94A3B8]">kendo@studio — zsh</span>
                <div className="flex items-center gap-2">
                  <span className="status-pulse w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
                  <span className="font-mono text-[10px] text-[#10B981]">READY</span>
                </div>
              </div>
              <div className="p-8 font-mono text-lg min-h-[200px] flex items-center justify-center">
                <div
                  key={active}
                  className="text-[#06B6D4]"
                  style={{ animation: "fade-up 0.3s ease both" }}
                >
                  {step.code}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
