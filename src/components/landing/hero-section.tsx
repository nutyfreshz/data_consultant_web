"use client";

import { useEffect, useRef, useState } from "react";
import { ParticleCanvas } from "./particle-canvas";

const TERMINAL_LINES = [
  { prompt: "$ whoami", output: "> Nutchapong L. (KENDO)" },
  { prompt: "$ get --credentials", output1: "> Master's in Data Analytics (First-Class Honors), NIDA", output2: "> 8+ years combined: 4 Yrs Business Development + 4+ Yrs Data Analytics/Management" },
  { prompt: "$ get --core-stack", output: '> ["Python", "SQL", "HTML", "Power BI", "Looker", "ETL/ELT"]' },
  { prompt: "$ check --status", output: "> Ready for strategic enterprise deployment..." },
];

export function HeroSection() {
  const mounted = useRef(false);
  const [termLine, setTermLine] = useState(0);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (termLine < TERMINAL_LINES.length) {
      const id = setTimeout(() => setTermLine(l => l + 1), 600);
      return () => clearTimeout(id);
    }
  }, [termLine]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg pt-[88px]">
      {/* Particle canvas — right half */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none z-0">
        <ParticleCanvas className="w-full h-full" />
      </div>

      {/* Emerald radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN — Hero Copy */}
          <div>
            <div
              className={`transition-all duration-700 delay-100 opacity-100 translate-y-0`}
              style={{ animation: "fade-up 0.7s ease 0.1s both" }}
            >
              <div className="overflow-hidden">
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#10B981] mb-4">
                  — ANALYTICS &amp; AI ARCHITECTURE
                </p>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.88] tracking-tight text-[#F8FAFC] uppercase">
                NUTCHAPONG L.
              </h1>

              <div className="overflow-hidden">
                <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.88] tracking-tight text-[#10B981] uppercase">
                  (KENDO)
                </h1>
              </div>

              <p className="mt-4 font-mono text-sm text-[#06B6D4]">
                <span className="text-[#94A3B8]">const</span> role = <span className="text-[#10B981]">&quot;Data &amp; AI Stack Solutions Consultant&quot;</span>;
              </p>
              <p className="mt-1 font-mono text-xs text-[#94A3B8]">
                Analytics Engineer
              </p>
            </div>

            {/* Tagline */}
            <div
              className={`mt-8 transition-all duration-700 delay-300 opacity-100 translate-y-0`}
              style={{ animation: "fade-up 0.7s ease 0.3s both" }}
            >
              <p className="text-base text-[#94A3B8] leading-relaxed max-w-xl font-sans">
                Bridging the gap between executive business strategy and modern AI/Data engineering. I turn complex data systems into ROI, automated workflows, and high-impact web apps.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 w-fit">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-[#10B981] text-[#0F172A] font-mono text-sm tracking-widest px-6 py-4 hover:bg-[#34D399] transition-colors font-semibold whitespace-nowrap"
                >
                  EXECUTE_CALL()
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#services"
                  className="group inline-flex items-center gap-3 border border-[#334155] text-[#F8FAFC] font-mono text-sm tracking-widest px-6 py-4 hover:border-[#10B981]/40 hover:text-[#10B981] transition-colors whitespace-nowrap"
                >
                  VIEW --SERVICES
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-6">
                <span className="status-pulse w-2 h-2 rounded-full bg-[#10B981] inline-block" />
                <span className="font-mono text-[10px] text-[#94A3B8]">
                  [● SYSTEM_ONLINE] — Available for engagement
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Terminal Card */}
          <div
            className={`transition-all duration-700 delay-500 opacity-100 translate-y-0`}
            style={{ animation: "fade-up 0.7s ease 0.5s both" }}
          >
            <div className="border border-[#334155] bg-[#1E293B]/90 backdrop-blur-md shadow-lg shadow-black/30 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-[#334155] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
                <span className="ml-3 font-mono text-[10px] text-[#94A3B8]">kendo@studio — zsh</span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-xs leading-relaxed min-h-[260px]">
                {TERMINAL_LINES.slice(0, termLine).map((line, i) => (
                  <div
                    key={i}
                    className="mb-4"
                    style={{ animation: "fade-up 0.35s ease both" }}
                  >
                    <div>
                      <span className="text-[#10B981]">{line.prompt.split(" ")[0]}</span>{" "}
                      <span className="text-[#F8FAFC]">{line.prompt.split(" ").slice(1).join(" ")}</span>
                    </div>
                    <div className="mt-1 text-[#94A3B8]">{line.output}</div>
                    {line.output2 && (
                      <div className="text-[#94A3B8]">{line.output2}</div>
                    )}
                  </div>
                ))}

                {/* Blinking cursor at the end */}
                {termLine >= TERMINAL_LINES.length && (
                  <div className="mt-2 text-[#94A3B8] cursor-blink">
                    &gt; Ready for strategic enterprise deployment...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TICKER ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 border-t border-[#334155] py-5 opacity-100`}
        style={{ animation: "fade-up 0.7s ease 0.7s both" }}
      >
        <div className="overflow-hidden">
          <div className="marquee-fast whitespace-nowrap flex gap-16">
            {[...Array(2)].map((_, rep) => (
              <span key={rep} className="inline-flex items-center gap-16">
                {[
                  "DATA ANALYTICS",
                  "AI ARCHITECTURE",
                  "POWER BI",
                  "PYTHON",
                  "SQL",
                  "ETL / ELT",
                  "BUSINESS INTELLIGENCE",
                  "CLV MODELING",
                ].map(item => (
                  <span key={item} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[#475569]">
                    <span className="w-1 h-1 bg-[#10B981] inline-block shrink-0" />
                    {item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
