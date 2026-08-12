"use client";

import { useEffect, useRef, useState } from "react";

const STACK_ROWS = [
  [
    { name: "Python", cat: "CORE", level: "core" },
    { name: "SQL", cat: "CORE", level: "core" },
    { name: "HTML", cat: "WEB APPS", level: "web apps" },
    { name: "Power BI", cat: "ANALYTICS", level: "Custom DAX" },
    { name: "Looker", cat: "BI", level: "BI" },
    { name: "CLV", cat: "ANALYTICS", level: "lifetime value" },
    { name: "RFM", cat: "ANALYTICS", level: "segmentation" },
    { name: "Data Pipelines", cat: "ENGINEERING", level: "ETL / ELT" },
    { name: "Cloud Cost Opt.", cat: "INFRASTRUCTURE", level: "infra" },
    { name: "ETL / ELT", cat: "ENGINEERING", level: "ingestion" },
  ],
  [
    { name: "PySpark", cat: "ENGINEERING", level: "big data" },
    { name: "Data Marts", cat: "ENGINEERING", level: "architecture" },
    { name: "SCD Type 2", cat: "ENGINEERING", level: "dimensional" },
    { name: "IAM", cat: "SECURITY", level: "access" },
    { name: "Streamlit", cat: "WEB APPS", level: "prototyping" },
    { name: "Revenue Tracking", cat: "ANALYTICS", level: "BI" },
    { name: "CRM Analytics", cat: "BUSINESS", level: "strategy" },
    { name: "Retention Modeling", cat: "ML", level: "predictive" },
    { name: "DAX", cat: "ANALYTICS", level: "custom measures" },
    { name: "Automation", cat: "WORKFLOW", level: "n8n / zapier" },
  ],
];

function StackChip({ name, cat, level }: { name: string; cat: string; level: string }) {
  return (
    <div className="shrink-0 flex items-center gap-4 border border-[#334155] px-5 py-3.5 hover:border-[#10B981]/40 hover:bg-[#10B981]/5 transition-all duration-200 cursor-default group">
      <span className="font-mono text-[9px] text-[#94A3B8] tracking-widest">{cat}</span>
      <span className="font-display text-lg text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">
        {name}
      </span>
      <span className="font-mono text-[9px] text-[#10B981] tracking-widest">{level}</span>
    </div>
  );
}

export function StackSection() {
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
    <section id="stack" ref={ref} className="relative border-t border-[#334155] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`border-b border-[#334155] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <span className="sys-tag mb-3 block">TECH_STACK_MATRIX</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#F8FAFC]">
              CAPABILITIES
              <br />
              <span className="text-[#94A3B8]" style={{ WebkitTextStroke: "1px #94A3B8", color: "transparent" }}>
                MATRIX
              </span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[#94A3B8] max-w-[220px] text-right hidden lg:block leading-relaxed">
            LANGUAGES &nbsp;/&nbsp; ANALYTICS &nbsp;/&nbsp; ENGINEERING &nbsp;/&nbsp; AUTOMATION
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="border-b border-[#334155] py-4 overflow-hidden">
        <div className="flex gap-3 marquee">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex gap-3 shrink-0">
              {STACK_ROWS[0].map(s => <StackChip key={`${s.name}-${ri}`} {...s} />)}
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[#334155] py-4 overflow-hidden">
        <div className="flex gap-3" style={{ animation: "marquee 20s linear infinite reverse" }}>
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex gap-3 shrink-0">
              {STACK_ROWS[1].map(s => <StackChip key={`${s.name}-${ri}`} {...s} />)}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#94A3B8]">CORE STACK: PYTHON · SQL · HTML · POWER BI · LOOKER · ETL/ELT</span>
        <span className="font-mono text-[10px] text-[#10B981] hover:underline tracking-wider cursor-default">
          VIEW FULL STACK →
        </span>
      </div>
    </section>
  );
}
