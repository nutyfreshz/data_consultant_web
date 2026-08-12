"use client";

import { useEffect, useRef, useState } from "react";

const METRICS = [
  {
    value: "60%",
    label: "COST REDUCTION",
    description: "Cut legacy dashboard and cloud pipeline infrastructure costs by up to 60%.",
    color: "#10B981",
  },
  {
    value: "40–70%",
    label: "AUTOMATION WORKLOAD CUT",
    description: "Automated marketing and CRM lead generation workflows, cutting team workload by 40%–70%.",
    color: "#06B6D4",
  },
  {
    value: "MULTI-MILLION THB",
    label: "REVENUE IMPACT",
    description: "Driven multi-million THB sales uplifts through CLV and retention modeling.",
    color: "#10B981",
  },
];

function AnimMetric({ value, delay, vis }: { value: string; delay: number; vis: boolean }) {
  return (
    <div
      className={`font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight tabular-nums transition-all duration-500 ${
        vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {value}
    </div>
  );
}

export function AboutSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative border-t border-[#334155] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`border-b border-[#334155] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <span className="sys-tag mb-3 block">ABOUT &amp; TRACK_RECORD</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#F8FAFC]">
              GROUND TRUTH,
              <br />
              <span className="text-[#94A3B8]" style={{ WebkitTextStroke: "1px #94A3B8", color: "transparent" }}>
                NOT BUZZWORDS
              </span>
            </h2>
          </div>
        </div>

        {/* Bio + Metrics Grid */}
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left — Bio */}
          <div className={`border-r border-[#334155] p-8 lg:p-10 transition-all duration-500 ${
            vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}>
            <p className="text-base text-[#94A3B8] leading-relaxed mb-6 font-sans">
              Most technical engineers build pipelines without understanding P&amp;L or ROI. Most consultants give advice but can&apos;t write code. I bridge both worlds.
            </p>
            <p className="text-base text-[#94A3B8] leading-relaxed mb-8 font-sans">
              8+ years combined experience — 4 Yrs Business Development + 4+ Yrs Data Analytics/Management — backed by a Master&apos;s in Data Analytics (First-Class Honors), NIDA.
            </p>

            {/* Info cards */}
            <div className="grid gap-3">
              <div className="border border-[#334155] bg-[#1E293B] p-4">
                <dt className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">Education</dt>
                <dd className="mt-1 font-mono text-sm text-[#F8FAFC]">Master&apos;s in Data Analytics · NIDA · First-Class Honors</dd>
              </div>
              <div className="border border-[#334155] bg-[#1E293B] p-4">
                <dt className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">Experience</dt>
                <dd className="mt-1 font-mono text-sm text-[#F8FAFC]">8+ years (4 BD + 4+ Data)</dd>
              </div>
            </div>
          </div>

          {/* Right — Metrics */}
          <div className="flex flex-col">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`border-b border-[#334155] p-8 lg:p-10 row-hover transition-all duration-500 ${
                  vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                <AnimMetric value={m.value} delay={i * 80 + 200} vis={vis} />
                <div className="mt-3 font-mono text-[10px] text-[#10B981] tracking-[0.18em]">
                  {m.label}
                </div>
                <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed font-sans max-w-md">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
