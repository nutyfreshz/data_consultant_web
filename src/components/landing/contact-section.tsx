"use client";

import { useEffect, useRef, useState } from "react";

function DotWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const SPACING = 28;
    const DOT_R   = 1.5;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width  / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = col * SPACING;
          const by = row * SPACING;
          const wave = Math.sin((col * 0.35) + (row * 0.35) - t * 2.2);
          const dy   = wave * 5;
          const alpha = 0.06 + Math.abs(wave) * 0.22;

          ctx.beginPath();
          ctx.arc(bx, by + dy, DOT_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16,185,129,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function ContactSection() {
  const [vis, setVis] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("nut_bcd@windowslive.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="relative border-t border-[#334155]">
      <div
        className={`max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Giant CTA block */}
        <div className="border border-[#334155] relative overflow-hidden my-12 lg:my-16">
          <DotWaveCanvas />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-[#10B981]/30" />
          <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-[#10B981]/30" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-r border-t border-[#10B981]/30" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-[#10B981]/30" />

          {/* Subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(16,185,129,0.04) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 px-8 lg:px-20 py-16 lg:py-24">
            {/* Status */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="status-pulse w-2 h-2 rounded-full bg-[#10B981] inline-block" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#10B981]">KENDO RUNTIME · READY</span>
            </div>

            <h2 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.88] tracking-tight text-[#F8FAFC] uppercase mb-4 text-center">
              OPEN A<br />
              <span className="text-[#10B981]">CHANNEL</span>
            </h2>

            <p className="font-mono text-sm text-[#94A3B8] mb-12 max-w-lg mx-auto leading-relaxed text-center">
              Terminal ping · email · LinkedIn. Let&apos;s build something that matters.
            </p>

            {/* Contact Terminal */}
            <div className="max-w-2xl mx-auto border border-[#334155] bg-[#1E293B]/90 backdrop-blur-md overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[#334155] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
                <span className="ml-3 font-mono text-[10px] text-[#94A3B8]">contact@kendo — session</span>
              </div>

              <div className="space-y-5 p-5 font-mono text-sm">
                {/* Email */}
                <div>
                  <div className="text-[#94A3B8]">$ ping --email</div>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <code className="text-[#F8FAFC] break-all">nut_bcd@windowslive.com</code>
                    <button
                      onClick={copyEmail}
                      className={`border px-3 py-2 text-xs transition-colors ${
                        copied
                          ? "border-[#10B981] text-[#10B981]"
                          : "border-[#334155] text-[#94A3B8] hover:border-[#10B981]/40 hover:text-[#10B981]"
                      }`}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <a
                      href="mailto:nut_bcd@windowslive.com"
                      className="border border-[#10B981] text-[#10B981] px-3 py-2 text-xs hover:bg-[#10B981] hover:text-[#0F172A] transition-colors"
                    >
                      mailto()
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <div className="text-[#94A3B8]">$ open --linkedin</div>
                  <div className="mt-2">
                    <a
                      href="https://www.linkedin.com/in/nutchapong-lertsithikarnkosol-5b2534198/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#06B6D4] underline-offset-4 hover:underline break-all"
                    >
                      https://www.linkedin.com/in/nutchapong-lertsithikarnkosol
                    </a>
                  </div>
                </div>

                <div className="border-t border-[#334155] pt-4 text-xs text-[#94A3B8] cursor-blink">
                  $ awaiting input — systems operational
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
