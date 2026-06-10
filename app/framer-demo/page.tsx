"use client";

import * as React from "react";
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type PanInfo,
  type Variants,
} from "framer-motion";

/* ── Gemeinsame Klassen ──────────────────────────────────────── */

const CARD =
  "rounded-[var(--radius-lg)] border border-border bg-surface p-6 md:p-8";

const BUTTON =
  "inline-flex items-center gap-2 rounded-full border border-border-strong bg-ink-2 px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-200 hover:border-violet hover:text-violet-3";

const CARD_TITLE = "font-display text-lg font-semibold text-foreground";

const CARD_TEXT = "mt-2 text-sm leading-relaxed text-muted";

/* ── Section-Gerüst ──────────────────────────────────────────── */

type SectionShellProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

function SectionShell({
  id,
  index,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-baseline gap-4">
          <span className="step-number font-mono text-sm">{index}</span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ── Scroll-Fortschrittsbalken (fixed, top) ──────────────────── */

function DemoScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-violet via-violet-2 to-cyan"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ── 01 · Basis-Animationen ──────────────────────────────────── */

function BasicsSection() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <SectionShell
      id="basis"
      index="01"
      title="Basis-Animationen"
      description="Mount-Animation, Hover- und Tap-Gesten sowie animierte Zustandswechsel über das animate-Prop."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={CARD}
        >
          <h3 className={CARD_TITLE}>Mount-Animation</h3>
          <p className={CARD_TEXT}>
            Diese Karte blendet beim Laden der Seite von unten ein — opacity 0
            → 1, y 20 → 0.
          </p>
        </m.div>

        <m.div
          whileHover={{
            scale: 1.03,
            boxShadow: "0 18px 60px -22px rgba(124, 58, 237, 0.45)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${CARD} cursor-pointer select-none`}
        >
          <h3 className={CARD_TITLE}>Hover &amp; Tap</h3>
          <p className={CARD_TEXT}>
            Beim Überfahren skaliert die Karte leicht hoch und erhält einen
            violetten Schatten, beim Klicken federt sie zurück.
          </p>
        </m.div>

        <div className={CARD}>
          <h3 className={CARD_TITLE}>Zustandswechsel</h3>
          <m.div
            aria-hidden
            animate={{
              backgroundColor: isActive
                ? "var(--color-cyan)"
                : "var(--color-violet)",
              borderRadius: isActive ? "9999px" : "1rem",
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 h-16 w-16"
          />
          <button
            type="button"
            onClick={() => setIsActive((value) => !value)}
            className={`${BUTTON} mt-5`}
          >
            Zustand wechseln
          </button>
        </div>
      </div>
    </SectionShell>
  );
}

/* ── 02 · Scroll-Animationen ─────────────────────────────────── */

const SCROLL_CARDS = [
  { title: "Karte 1", text: "Erscheint, sobald sie in den Viewport scrollt." },
  { title: "Karte 2", text: "viewport={{ once: true }} animiert nur einmal." },
  { title: "Karte 3", text: "Leicht versetzt für einen natürlichen Rhythmus." },
];

function ScrollSection({ isReducedMotion }: { isReducedMotion: boolean }) {
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  // 0,3-fache Scroll-Geschwindigkeit: der Text legt nur ±30 % zurück,
  // während die Box den kompletten Viewport durchquert.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <SectionShell
      id="scroll"
      index="02"
      title="Scroll-Animationen"
      description="whileInView für Einblendungen, useScroll + useTransform für Parallax und den Fortschrittsbalken am oberen Rand."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {SCROLL_CARDS.map((card, i) => (
          <m.div
            key={card.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            className={CARD}
          >
            <h3 className={CARD_TITLE}>{card.title}</h3>
            <p className={CARD_TEXT}>{card.text}</p>
          </m.div>
        ))}
      </div>

      <div
        ref={parallaxRef}
        className="relative mt-10 flex h-56 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-border bg-ink-2"
      >
        <m.span
          aria-hidden
          style={isReducedMotion ? undefined : { y: parallaxY }}
          className="text-outline absolute select-none font-display text-7xl font-semibold tracking-tight md:text-9xl"
        >
          GÜLER.DEV
        </m.span>
        <p className="relative z-10 px-6 text-center text-sm text-muted">
          Parallax: Der Hintergrundtext bewegt sich mit 0,3-facher
          Scroll-Geschwindigkeit.
        </p>
      </div>
    </SectionShell>
  );
}

/* ── 03 · Layout-Animationen ─────────────────────────────────── */

type GridItem = { id: string; label: string };

const INITIAL_ITEMS: GridItem[] = [
  { id: "featured", label: "Featured" },
  { id: "design", label: "Design" },
  { id: "code", label: "Code" },
  { id: "seo", label: "SEO" },
  { id: "hosting", label: "Hosting" },
  { id: "support", label: "Support" },
];

function shuffleItems(items: GridItem[]): GridItem[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function LayoutSection() {
  const [items, setItems] = React.useState(INITIAL_ITEMS);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <SectionShell
      id="layout"
      index="03"
      title="Layout-Animationen"
      description="Das layout-Prop animiert Positionswechsel automatisch. layoutId verbindet zwei Elemente zu einer nahtlosen Transformation."
    >
      <button
        type="button"
        onClick={() => setItems(shuffleItems)}
        className={BUTTON}
      >
        Neu sortieren
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item) =>
          item.id === "featured" ? (
            // Beim Öffnen des Overlays verschwindet die Grid-Karte, damit
            // layoutId die Transformation zwischen beiden Elementen übernimmt.
            !isExpanded && (
              <m.button
                key={item.id}
                type="button"
                layoutId="featured"
                layout
                onClick={() => setIsExpanded(true)}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="flex h-28 items-center justify-center rounded-[var(--radius-lg)] border border-violet bg-violet/10 font-display font-semibold text-violet-3"
              >
                {item.label}
              </m.button>
            )
          ) : (
            <m.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="flex h-28 items-center justify-center rounded-[var(--radius-lg)] border border-border bg-surface text-paper-2"
            >
              {item.label}
            </m.div>
          ),
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
          >
            <m.div
              layoutId="featured"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="w-full max-w-md rounded-[var(--radius-xl)] border border-violet bg-surface p-10"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Featured
              </h3>
              <p className={CARD_TEXT}>
                layoutId verbindet die Grid-Karte und dieses Overlay: Framer
                Motion interpoliert Position, Größe und Border-Radius
                automatisch.
              </p>
              <p className="mt-6 font-mono text-xs text-muted-2">
                Klicken zum Schließen
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}

/* ── 04 · Gestures ───────────────────────────────────────────── */

const SWIPE_ITEMS = ["Strategie", "Design", "Code", "Launch", "Support"];

function GesturesSection() {
  const dragAreaRef = React.useRef<HTMLDivElement>(null);
  const swipeAreaRef = React.useRef<HTMLDivElement>(null);
  const [panDelta, setPanDelta] = React.useState({ x: 0, y: 0 });

  function handlePan(_event: PointerEvent, info: PanInfo) {
    setPanDelta({ x: Math.round(info.offset.x), y: Math.round(info.offset.y) });
  }

  return (
    <SectionShell
      id="gestures"
      index="04"
      title="Gestures"
      description="Drag mit Begrenzungsrahmen, horizontale Swipe-Liste und Pan-Erkennung mit Live-Koordinaten."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <div className={CARD}>
          <h3 className={CARD_TITLE}>Drag mit Begrenzung</h3>
          <div
            ref={dragAreaRef}
            className="mt-4 flex h-44 items-center justify-center rounded-[var(--radius)] border border-dashed border-border-strong bg-ink"
          >
            <m.div
              drag
              dragConstraints={dragAreaRef}
              dragElastic={0.15}
              whileDrag={{ scale: 1.08 }}
              className="h-14 w-14 cursor-grab touch-none rounded-[var(--radius)] bg-violet active:cursor-grabbing"
            />
          </div>
        </div>

        <div className={CARD}>
          <h3 className={CARD_TITLE}>Swipe-Liste</h3>
          <div ref={swipeAreaRef} className="mt-4 overflow-hidden">
            <m.div
              drag="x"
              dragConstraints={swipeAreaRef}
              className="flex w-max cursor-grab touch-none gap-3 active:cursor-grabbing"
            >
              {SWIPE_ITEMS.map((label) => (
                <div
                  key={label}
                  className="flex h-28 w-36 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-ink-2 text-sm text-paper-2"
                >
                  {label}
                </div>
              ))}
            </m.div>
          </div>
        </div>

        <div className={CARD}>
          <h3 className={CARD_TITLE}>Pan-Canvas</h3>
          <m.div
            onPan={handlePan}
            onPanEnd={() => setPanDelta({ x: 0, y: 0 })}
            className="bg-dot-grid mt-4 flex h-44 touch-none select-none items-center justify-center rounded-[var(--radius)] border border-border bg-ink"
          >
            <span className="font-mono text-sm text-cyan">
              x: {panDelta.x} · y: {panDelta.y}
            </span>
          </m.div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ── 05 · Variants & Stagger ─────────────────────────────────── */

const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const STAGGER_STEPS = [
  "Beratung",
  "Konzept",
  "Design",
  "Entwicklung",
  "Launch",
  "Support",
];

function StaggerSection() {
  const [replayKey, setReplayKey] = React.useState(0);

  return (
    <SectionShell
      id="variants"
      index="05"
      title="Variants &amp; Stagger"
      description="Eltern-Variants orchestrieren Kinder: staggerChildren animiert die Listeneinträge nacheinander."
    >
      <button
        type="button"
        onClick={() => setReplayKey((key) => key + 1)}
        className={BUTTON}
      >
        Neu animieren
      </button>

      {/* Neuer key erzwingt Remount → die Stagger-Sequenz spielt erneut ab */}
      <m.ul
        key={replayKey}
        variants={LIST_VARIANTS}
        initial="hidden"
        animate="visible"
        className="mt-6 grid gap-3 md:grid-cols-2"
      >
        {STAGGER_STEPS.map((step, i) => (
          <m.li
            key={step}
            variants={ITEM_VARIANTS}
            className="flex items-center gap-4 rounded-[var(--radius)] border border-border bg-surface px-5 py-4"
          >
            <span className="font-mono text-xs text-cyan">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-paper">{step}</span>
          </m.li>
        ))}
      </m.ul>
    </SectionShell>
  );
}

/* ── 06 · AnimatePresence ────────────────────────────────────── */

const TABS = ["Übersicht", "Leistung", "Portfolio"] as const;
type Tab = (typeof TABS)[number];

const TAB_CONTENT: Record<Tab, string> = {
  Übersicht:
    "Alle Projekte auf einen Blick: drei aktive Websites, zwei in der Entwicklung, ein anstehender Launch.",
  Leistung:
    "Lighthouse-Score 98, Ladezeit unter einer Sekunde, Core Web Vitals durchgehend im grünen Bereich.",
  Portfolio:
    "Von der KMU-Landingpage bis zur individuellen Web-App — jedes Projekt mit messbarem Ergebnis.",
};

function PresenceSection() {
  const [isNotificationVisible, setIsNotificationVisible] =
    React.useState(false);
  const [activeTab, setActiveTab] = React.useState<Tab>("Übersicht");

  return (
    <SectionShell
      id="presence"
      index="06"
      title="AnimatePresence"
      description="Exit-Animationen beim Unmount: eine Benachrichtigung mit Ein- und Ausblendung sowie ein Tab-Router mit Slide-Übergängen."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={CARD}>
          <h3 className={CARD_TITLE}>Benachrichtigung</h3>
          <button
            type="button"
            onClick={() => setIsNotificationVisible((value) => !value)}
            className={`${BUTTON} mt-4`}
          >
            {isNotificationVisible ? "Ausblenden" : "Einblenden"}
          </button>
          <div className="mt-4 min-h-20">
            <AnimatePresence>
              {isNotificationVisible && (
                <m.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-[var(--radius)] border border-cyan/40 bg-ink-2 px-5 py-4"
                >
                  <span aria-hidden className="h-2 w-2 rounded-full bg-cyan" />
                  <div>
                    <p className="text-sm font-medium text-paper">
                      Willkommen zurück
                    </p>
                    <p className="text-xs text-muted">
                      Ihr Projekt-Dashboard wurde aktualisiert.
                    </p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={CARD}>
          <h3 className={CARD_TITLE}>Tab-Router</h3>
          <div role="tablist" aria-label="Demo-Tabs" className="mt-4 flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-violet text-paper"
                    : "border border-border text-muted hover:text-paper"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4 min-h-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <m.p
                key={activeTab}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-sm leading-relaxed text-muted"
              >
                {TAB_CONTENT[activeTab]}
              </m.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ── 07 · Motion Values ──────────────────────────────────────── */

function TiltCard({ isReducedMotion }: { isReducedMotion: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-9, 9]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    // Mausposition relativ zur Kartenmitte, normalisiert auf -0,5 … 0,5
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="[perspective:900px]">
      <m.div
        onMouseMove={isReducedMotion ? undefined : handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={isReducedMotion ? undefined : { rotateX, rotateY }}
        className={CARD}
      >
        <h3 className={CARD_TITLE}>3D-Tilt</h3>
        <p className={CARD_TEXT}>
          useMotionValue verfolgt die Mausposition, useTransform mappt sie auf
          rotateX/rotateY. Beim Verlassen setzt die Karte sanft zurück.
        </p>
      </m.div>
    </div>
  );
}

function CursorFollowerPanel({ isReducedMotion }: { isReducedMotion: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div
      onMouseMove={isReducedMotion ? undefined : handleMouseMove}
      className="relative flex h-full min-h-52 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-border bg-ink-2"
    >
      <m.div
        aria-hidden
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 rounded-full bg-cyan"
      />
      <p className="px-6 text-center text-sm text-muted">
        Cursor-Follower: useSpring (stiffness 400, damping 30) glättet die
        Bewegung des Punkts.
      </p>
    </div>
  );
}

function MotionValuesSection({ isReducedMotion }: { isReducedMotion: boolean }) {
  return (
    <SectionShell
      id="motion-values"
      index="07"
      title="Motion Values"
      description="Motion Values laufen außerhalb des React-Renderzyklus: 3D-Tilt per useTransform und ein Spring-geglätteter Cursor-Follower."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TiltCard isReducedMotion={isReducedMotion} />
        <CursorFollowerPanel isReducedMotion={isReducedMotion} />
      </div>
    </SectionShell>
  );
}

/* ── 08 · SVG & 3D ───────────────────────────────────────────── */

function SvgSection() {
  return (
    <SectionShell
      id="svg-3d"
      index="08"
      title="SVG &amp; 3D"
      description="pathLength zeichnet SVG-Pfade nach, perspective + rotateY erzeugen eine 3D-Flip-Karte mit Vorder- und Rückseite."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className={`${CARD} flex flex-col items-center justify-center`}>
          <svg
            viewBox="0 0 120 120"
            className="h-36 w-36"
            role="img"
            aria-label="Animiertes Hexagon-Logo"
          >
            <m.path
              d="M60 12 L101.6 36 L101.6 84 L60 108 L18.4 84 L18.4 36 Z"
              className="fill-none stroke-violet-2"
              strokeWidth={3}
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          <p className={`${CARD_TEXT} text-center`}>
            pathLength animiert von 0 auf 1 — der Pfad zeichnet sich selbst.
          </p>
        </div>

        <div className="[perspective:1000px]">
          <m.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full min-h-52 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-border bg-surface [backface-visibility:hidden]">
              <span className="font-display text-2xl font-semibold text-foreground">
                Güler.dev
              </span>
              <span className="text-sm text-muted">Hover zum Umdrehen</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-lg)] border border-violet bg-ink-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <code className="font-mono text-sm text-cyan">
                whileHover=&#123;&#123; rotateY: 180 &#125;&#125;
              </code>
            </div>
          </m.div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ── Seite ───────────────────────────────────────────────────── */

export default function FramerDemoPage() {
  const isReducedMotion = useReducedMotion() ?? false;

  return (
    // domMax statt domAnimation (globaler MotionProvider): Drag-, Pan- und
    // Layout-Animationen sind nur im domMax-Feature-Bundle enthalten.
    <LazyMotion features={domMax} strict>
      <DemoScrollProgress />

      <header className="relative overflow-hidden pb-14 pt-36 md:pt-44">
        <div className="teal-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-cyan"
          >
            Live-Demo
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl"
          >
            Framer Motion — <span className="text-gradient-teal">Live Demo</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            Alle Kernfunktionen in einer Seite
          </m.p>
        </div>
      </header>

      <div className="hairline" aria-hidden />
      <BasicsSection />
      <div className="hairline" aria-hidden />
      <ScrollSection isReducedMotion={isReducedMotion} />
      <div className="hairline" aria-hidden />
      <LayoutSection />
      <div className="hairline" aria-hidden />
      <GesturesSection />
      <div className="hairline" aria-hidden />
      <StaggerSection />
      <div className="hairline" aria-hidden />
      <PresenceSection />
      <div className="hairline" aria-hidden />
      <MotionValuesSection isReducedMotion={isReducedMotion} />
      <div className="hairline" aria-hidden />
      <SvgSection />
    </LazyMotion>
  );
}
