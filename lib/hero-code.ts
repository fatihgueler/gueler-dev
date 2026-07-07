/**
 * Kuratierte Textquelle für die Code-Füllung der Hero-Wortmarke.
 *
 * SICHERHEITSAUFLAGE: Diese Liste ist HANDVERLESEN. Sie enthält ausschließlich
 * echte, öffentliche Artefakte aus diesem Repository — Funktionssignaturen,
 * Shader-Helfer und Commit-Messages aus dem Git-Log. Keine automatische
 * Extraktion, keine .env-Inhalte, keine Secrets, keine personenbezogenen
 * Daten. Neue Zeilen nur nach manueller Prüfung ergänzen.
 */

/** Echte Funktions-/Code-Zeilen aus dieser Codebase (manuell kuratiert). */
export const CODE_LINES: readonly string[] = [
  "export function lerp(a: number, b: number, t: number)",
  "float snoise(vec3 v) { const vec2 C = vec2(1.0/6.0, 1.0/3.0); }",
  "vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }",
  "vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }",
  "vec4 taylorInvSqrt(vec4 r){ return 1.79284291 - 0.85373472 * r; }",
  "export function prefersReducedMotion(): boolean",
  "export function isTouchDevice(): boolean",
  "export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;",
  "const { scrollYProgress } = useScroll({ target: sectionRef });",
  "const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 420]);",
  "ringPos.x = lerp(ringPos.x, mouse.x, 0.18);",
  "raf = window.requestAnimationFrame(render);",
  "window.addEventListener(\"signal:found\", onFound);",
  "export function generateStaticParams()",
  "const study = caseStudies.find((s) => s.id === slug);",
  "clip-path: inset(0 100% 0 0);",
  "mix-blend-mode: difference;",
  "font-size: clamp(3rem, 9vw, 7.5rem);",
  "viewport={{ once: true, margin: \"-8%\" }}",
  "grid-template-columns: auto 1fr;",
  "@media (hover: none), (pointer: coarse)",
  "IntersectionObserver(([entry]) => pick(), { threshold: 0 })",
  "document.documentElement.classList.add(\"has-cursor\");",
  "const faqJsonLd = { \"@context\": \"https://schema.org\" };",
  "priceRange: \"ab 500 \\u20AC\",",
  "areaServed: { \"@type\": \"Country\", name: \"Deutschland\" },",
];

/** Echte Commit-Messages aus dem Git-Log dieses Repos (manuell kuratiert). */
export const COMMIT_LINES: readonly string[] = [
  "feat: dual-theme GPGPU particle-morph hero + full content/SEO/a11y pass",
  "perf: replace Spline hero with custom OrbScene shader",
  "typeset: replace Syne with Bricolage Grotesque, add fluid type scale",
  "feat(theme): vollwertiger Light/Dark-Mode mit Toggle",
  "feat(brand): festes Logo (Mark + Wortmarke), Favicon, OG-Rebrand",
  "fix: replace layout-animated cursor ring with compositor-friendly styles",
  "feat: rebuild into multi-page award-style site (3D orb, GSAP, Lenis)",
  "fix: Animations-Performance, Rechtschreibung und Aufräumarbeiten",
  "feat: visuelles Major-Upgrade der Startseite",
  "style(polish): snappier Button-/Card-Micro-Interactions",
  "fix: Leerzeichen im StoryPitch und flüssige Prozess-Zahlen-Animation",
  "feat: Framer-Motion-Techniken in die Website integriert",
  "fix: prevent scroll jump when opening mobile nav",
  "feat: Portfolio-Upgrade v2.0 – KMU, SEO, Pakete, OG Image",
  "fix: simplify reduce-motion fallbacks and remove orphaned offsets",
  "feat: Terminbuchung auf Calendly umgestellt",
  "Initial commit: Güler.dev portfolio with Impressum and Datenschutz",
];

/** Gemischter Pool für die Textur — Code dominiert, Commits als Rhythmus. */
export const HERO_TEXT_POOL: readonly string[] = [
  ...CODE_LINES,
  ...COMMIT_LINES,
  ...CODE_LINES,
];
