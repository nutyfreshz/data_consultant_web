"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "ABOUT",     href: "#about" },
  { name: "SERVICES",  href: "#services" },
  { name: "STACK",     href: "#stack" },
  { name: "PROCESS",   href: "#process" },
  { name: "CONTACT",   href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, timeZone: "Asia/Bangkok" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0F172A]/95 backdrop-blur-sm border-b border-[#334155]" : "bg-transparent"
        }`}
      >
        {/* Top status bar */}
        <div className="border-b border-[#334155] px-6 lg:px-12 h-8 flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">
            SYS:KENDO-OS &nbsp;/&nbsp; BUILD 2026.08
          </span>
          <div className="hidden md:flex items-center gap-6">
            <span className="font-mono text-[10px] text-[#94A3B8]">
              <span className="text-[#10B981]">●</span>&nbsp;SYSTEMS_OPERATIONAL
            </span>
            <span className="font-mono text-[10px] text-[#94A3B8] tabular-nums">{time} ICT</span>
          </div>
        </div>

        {/* Main nav */}
        <div className="px-6 lg:px-12 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-7 h-7 border border-[#10B981] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#10B981]" />
              <div className="absolute inset-0 bg-[#10B981]/10 group-hover:bg-[#10B981]/20 transition-colors" />
            </div>
            <span className="font-display text-2xl tracking-[0.15em] text-[#F8FAFC]">KENDO</span>
            <span className="hidden lg:block font-mono text-[10px] text-[#94A3B8] border-l border-[#334155] pl-3 ml-1 tracking-widest">
              DATA &amp; AI
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.18em] text-[#94A3B8] hover:text-[#10B981] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="font-mono text-[11px] tracking-widest bg-[#10B981] text-[#0F172A] px-5 h-9 flex items-center hover:bg-[#34D399] transition-colors font-semibold">
              EXECUTE_CALL() →
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#F8FAFC] p-1"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0F172A] flex flex-col transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "88px" }}
      >
        <div className="border-t border-[#334155] flex flex-col">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`border-b border-[#334155] px-8 py-7 font-display text-5xl tracking-wider text-[#F8FAFC] hover:text-[#10B981] transition-all duration-300 flex items-center justify-between ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {link.name}
              <span className="font-mono text-xs text-[#94A3B8]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>
        <div className="mt-auto p-8 border-t border-[#334155]">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="w-full block text-center font-mono text-sm tracking-widest bg-[#10B981] text-[#0F172A] py-5 font-semibold"
          >
            EXECUTE_CALL() →
          </a>
        </div>
      </div>
    </>
  );
}
