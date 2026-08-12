"use client";

import { useEffect, useState } from "react";

const LINKS = {
  SERVICES: [
    { name: "Strategic Advisory",   href: "#services" },
    { name: "Project Execution",    href: "#services" },
    { name: "Custom Web Apps",      href: "#services" },
    { name: "Data Architecture",    href: "#stack" },
    { name: "BI & Analytics",       href: "#stack" },
  ],
  CAPABILITIES: [
    { name: "Python",      href: "#stack" },
    { name: "SQL",         href: "#stack" },
    { name: "Power BI",    href: "#stack" },
    { name: "Looker",      href: "#stack" },
    { name: "ETL / ELT",   href: "#stack" },
  ],
  ABOUT: [
    { name: "Track Record",  href: "#about" },
    { name: "LinkedIn",      href: "https://www.linkedin.com/in/nutchapong-lertsithikarnkosol-5b2534198/" },
    { name: "Contact",       href: "#contact" },
  ],
};

export function FooterSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, timeZone: "Asia/Bangkok" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-[#334155]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top row — brand + tagline */}
        <div className="border-b border-[#334155] py-12 grid lg:grid-cols-[1fr_2fr] gap-10">
          <div>
            {/* Logo */}
            <a href="#" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-8 h-8 border border-[#10B981] flex items-center justify-center relative">
                <div className="w-2.5 h-2.5 bg-[#10B981]" />
                <div className="absolute inset-0 bg-[#10B981]/10 group-hover:bg-[#10B981]/20 transition-colors" />
              </div>
              <span className="font-display text-2xl tracking-[0.12em] text-[#F8FAFC]">KENDO</span>
            </a>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs font-mono">
              Data &amp; AI Stack Solutions Consultant. Bridging executive business strategy and modern AI/Data engineering.
            </p>
            <div className="flex gap-5 mt-6">
              {[
                { label: "LINKEDIN", href: "https://www.linkedin.com/in/nutchapong-lertsithikarnkosol-5b2534198/" },
                { label: "EMAIL", href: "mailto:nut_bcd@windowslive.com" },
              ].map(s => (
                <a key={s.label} href={s.href} className="font-mono text-[10px] tracking-widest text-[#94A3B8] hover:text-[#10B981] transition-colors">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-mono text-[9px] tracking-[0.2em] text-[#10B981] mb-5">{section}</h3>
                <ul className="space-y-3">
                  {links.map(l => (
                    <li key={l.name}>
                      <a href={l.href} className="font-mono text-[11px] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors inline-flex items-center gap-2">
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#94A3B8]">
            © 2026 NUTCHAPONG L. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-[#94A3B8] tabular-nums">{time} ICT</span>
            <div className="flex items-center gap-2">
              <span className="status-pulse w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
              <span className="font-mono text-[10px] text-[#10B981] tracking-widest">ALL_SYSTEMS_OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
