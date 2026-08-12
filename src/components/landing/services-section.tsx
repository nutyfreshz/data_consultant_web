"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: "01",
    tag: "SERVICE_01",
    title: "Strategic Advisory\n& Consultation",
    price: "1,000 – 1,500 THB",
    priceUnit: "HOURLY",
    color: "#10B981",
    features: [
      "Data & AI Architecture Advisory",
      "Tooling & Infrastructure Cost-Optimization",
      "CRM/CLV Analytics Strategy",
      "Workflow Automation Strategy",
    ],
    cta: "BOOK --ADVISORY",
  },
  {
    id: "02",
    tag: "SERVICE_02",
    title: "End-to-End\nProject Execution",
    price: "Scoped on deliverables",
    priceUnit: "FIXED / PROJECT",
    color: "#06B6D4",
    features: [
      "Custom Web Apps & Automation — Streamlit, HTML, Internal tools",
      "Modern Data Architecture — SQL, Python, PySpark, Data Marts, SCD Type 2",
      "Analytics & BI — Power BI Custom DAX, Looker, Revenue tracking",
    ],
    cta: "SCOPE --PROJECT",
  },
];

export function ServicesSection() {
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
    <section id="services" ref={ref} className="relative border-t border-[#334155] bg-[#0E1525] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`border-b border-[#334155] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <span className="sys-tag mb-3 block">SERVICES &amp; PRICING</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#F8FAFC]">
              ENGAGEMENT
              <br />
              <span className="text-[#94A3B8]" style={{ WebkitTextStroke: "1px #94A3B8", color: "transparent" }}>
                MODELS
              </span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[#94A3B8] max-w-[220px] text-right hidden lg:block leading-relaxed">
            STRATEGIC ADVISORY (HOURLY) &nbsp;/&nbsp; END-TO-END PROJECT EXECUTION (FIXED)
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 border-b border-[#334155]">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`border-r border-[#334155] last:border-r-0 p-8 lg:p-10 row-hover transition-all duration-500 group ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="sys-tag text-[9px]" style={{ color: s.color }}>
                    <span style={{ background: s.color }} className="inline-block" />
                    {s.tag}
                  </span>
                  <h3 className="font-display text-3xl lg:text-4xl leading-[0.9] text-[#F8FAFC] mt-3 whitespace-pre-line group-hover:text-[#10B981] transition-colors">
                    {s.title}
                  </h3>
                </div>
                <span className="font-mono text-[9px] text-[#475569]">{s.id}</span>
              </div>

              {/* Price */}
              <div className="border border-[#334155] bg-[#0F172A] p-4 mb-6">
                <div className="font-mono text-[10px] text-[#94A3B8] tracking-widest mb-1">{s.priceUnit}</div>
                <div className="font-mono text-lg text-[#10B981]">{s.price}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {s.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-[#10B981] font-mono text-[10px] mt-0.5 shrink-0">▸</span>
                    <span className="font-mono text-[11px] text-[#94A3B8]">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="w-full flex items-center justify-between font-mono text-[11px] tracking-widest px-5 py-4 border border-[#334155] text-[#94A3B8] hover:border-[#10B981]/40 hover:text-[#10B981] transition-colors group"
              >
                {s.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
