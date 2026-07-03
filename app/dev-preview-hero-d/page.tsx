"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/**
 * TEMPORÄRE Preview-Route — nicht Teil der echten Seite. Testet echte
 * Scroll-Choreografie (nicht nur ein Standbild) für Konzept D.
 * Wird gelöscht, sobald die Richtung entschieden ist.
 */

const PROJECTS = [
  { name: "BüroBrücke", url: "buerobruecke.de", img: "/projects/buerobruecke-preview.png", tag: "KI-Web-App · live im Einsatz" },
  { name: "VoxNote", url: "voxnote.app", img: "/projects/voxnote-preview.png", tag: "KI-SaaS · Praxis-Dokumentation" },
  { name: "Weitblick", url: "weitblick.de", img: "/projects/weitblick-preview.png", tag: "Konzept-Showcase" },
];

function Grain() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      }}
      animate={{ x: [0, -6, 3, -3, 0], y: [0, 4, -5, 2, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

function TiltDevice({ project, z }: { project: (typeof PROJECTS)[number]; z: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 1800 }}>
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 60, rotateY: -14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotateY: -6, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative overflow-hidden rounded-[10px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.09]"
      >
        <div className="flex items-center justify-between border-b border-white/[0.09] bg-[#151318] px-4 py-[11px]">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/[0.09]" />
            <span className="size-2 rounded-full bg-white/[0.09]" />
            <span className="size-2 rounded-full bg-white/[0.09]" />
          </div>
          <div className="font-mono text-[11px] text-[#9b968f]">{project.url}</div>
          <div style={{ width: 40 }} />
        </div>
        <img src={project.img} alt={project.name} className="block h-[560px] w-full object-cover object-top saturate-[0.94]" />
      </motion.div>
      <div className="mt-4 font-mono text-[11.5px] text-[#9b968f]">
        {project.name} — {project.tag}
      </div>
    </div>
  );
}

function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const deviceRotate = useTransform(scrollYProgress, [0, 1], [-6, -14]);
  const deviceScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = ["Kunden", "suchen", "Sie."];
  const words2 = ["Werden", "Sie", "auch", "gefunden?"];

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center bg-[#0b0a0d] px-14 text-[#eeece9]">
      <Grain />
      <div className="relative z-10 grid w-full grid-cols-[620px_1fr] items-center gap-20">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-[22px] flex items-center gap-[10px] font-mono text-xs uppercase tracking-[0.18em] text-[#9b968f]"
          >
            <span className="h-px w-7 bg-[#9b968f]" />
            Webentwicklung aus Hannover
          </motion.div>
          <h1 className="mb-[26px] text-[58px] font-semibold leading-[1.08] tracking-[-0.015em]">
            <span className="mr-[0.3em] inline-flex flex-wrap">
              {words.map((w, i) => (
                <span key={w} className="mr-[0.3em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <br />
            <span className="inline-flex flex-wrap">
              {words2.map((w, i) => (
                <span key={w} className="mr-[0.3em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + 0.05 * i }}
                    style={i >= 1 ? { color: "#a78bfa" } : undefined}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-9 max-w-[480px] text-[17px] leading-[1.65] text-[#9b968f]"
          >
            Aus Hannover für ganz Deutschland: moderne Websites zum Festpreis, in wenigen Wochen – ein fester Ansprechpartner statt Agentur.
          </motion.p>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 bg-[#a78bfa] px-7 py-4 text-sm font-semibold text-white"
          >
            Kostenloses Erstgespräch →
          </motion.a>
        </motion.div>

        <motion.div style={{ y: deviceY, rotate: 0, scale: deviceScale }}>
          <motion.div style={{ rotateY: deviceRotate }}>
            <TiltDevice project={PROJECTS[0]} z={0} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Gallery-Pass: gepinnter Abschnitt, Projekte lösen sich beim Scrollen ab (Persepolis-Stil). */
function GalleryPass() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative bg-[#0b0a0d]" style={{ height: `${PROJECTS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-14 text-[#eeece9]">
        <Grain />
        <div className="relative z-10 grid w-full grid-cols-[500px_1fr] items-center gap-20">
          <div>
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#9b968f]">Der Beweis</div>
            <h2 className="text-[42px] font-semibold leading-[1.1]">Sauberer Code.<br />Echte Projekte.</h2>
          </div>
          <div className="relative h-[560px]">
            {PROJECTS.map((p, i) => {
              const start = i / PROJECTS.length;
              const mid = (i + 0.5) / PROJECTS.length;
              const end = (i + 1) / PROJECTS.length;
              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.05), start, mid, end, Math.min(1, end + 0.05)],
                [0, 1, 1, 1, 0],
              );
              const scale = useTransform(scrollYProgress, [start, mid, end], [0.96, 1, 0.96]);
              const rotateY = useTransform(scrollYProgress, [start, end], [-8, -3]);
              return (
                <motion.div key={p.name} style={{ opacity, scale, rotateY, position: "absolute", inset: 0 }}>
                  <div style={{ perspective: 1800 }}>
                    <div className="overflow-hidden rounded-[10px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.09]">
                      <div className="flex items-center justify-between border-b border-white/[0.09] bg-[#151318] px-4 py-[11px]">
                        <div className="flex gap-1.5">
                          <span className="size-2 rounded-full bg-white/[0.09]" />
                          <span className="size-2 rounded-full bg-white/[0.09]" />
                          <span className="size-2 rounded-full bg-white/[0.09]" />
                        </div>
                        <div className="font-mono text-[11px] text-[#9b968f]">{p.url}</div>
                        <div style={{ width: 40 }} />
                      </div>
                      <img src={p.img} alt={p.name} className="block h-[500px] w-full object-cover object-top saturate-[0.94]" />
                    </div>
                    <div className="mt-4 font-mono text-[11.5px] text-[#9b968f]">
                      {p.name} — {p.tag}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewHeroD() {
  return (
    <main className="bg-[#0b0a0d]">
      <Hero />
      <GalleryPass />
      <div className="flex h-screen items-center justify-center bg-[#0b0a0d] font-mono text-sm text-[#9b968f]">
        (Ende der Preview — normale Seite geht hier weiter)
      </div>
    </main>
  );
}
