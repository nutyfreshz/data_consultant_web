# Portfolio / Landing → Next.js Template Migration Context

> **Reusable AI context** for building portfolio/landing sites with rich visual effects.
> Works with Z.ai, GPT, Claude, Cursor, or any LLM.
> Feed this MD + source materials → AI outputs a git-ready Next.js project.

---

## 1. Project Type

**Portfolio / Personal Landing Page** built as a **static-export Next.js** site with visual effects, thematic UI styling, and scroll-driven animations.

**Fixed tech stack:**
- Next.js 16+ (App Router)
- Tailwind CSS v4
- TypeScript
- Canvas 2D API for all visual effects (NO Three.js, NO external animation libs unless template explicitly uses them and user approves)
- `output: 'export'` in `next.config.mjs` (for GitHub Pages / static hosting)
- `images: { unoptimized: true }`

---

## 2. Input Materials

The AI will receive **one or more** of these:

| Material | Description |
|---|---|
| **Template ZIP** | A Next.js/React template containing visual effect components and layout structure. May also be a plain HTML template. |
| **Source HTML / Content file** | Contains the user's real content (name, bio, services, contact, etc.). May be a single HTML file, markdown, JSON, or any structured format. |
| **Theme spec** | Color palette, font choices, and design tokens. May be embedded in source HTML, specified in the template, or provided separately by the user. |
| **Screenshots / Reference images** | Showing expected visual appearance or specific template designs to replicate. |

---

## 3. Visual Effects — Classification & Implementation Framework

**DO NOT assume a fixed set of effects.** Every template is different. Use this classification system to **analyze the template, identify ALL effects, and implement each one correctly.**

### 3.1 Effect Classification Taxonomy

When reading a template, classify every visual effect into one or more of these categories:

| Category | Description | Trigger | Rendering | Typical Examples |
|---|---|---|---|---|
| **A. Canvas Animation** | Continuous `<canvas>` animation running via `requestAnimationFrame` | Mount → unmount lifecycle | Canvas 2D context | Particle fields, ASCII spheres, wave patterns, dot grids, flowing lines, fractals, noise fields |
| **B. Scroll-Triggered Reveal** | Element transitions from hidden → visible on scroll into viewport | IntersectionObserver | CSS transitions (opacity, transform) | Fade-up, slide-in, scale-in, blur-in, clip-path reveal |
| **C. Scroll-Driven Transform** | Element transform changes continuously based on scroll position | Scroll event (passive) | Inline style or CSS variable | Parallax backgrounds, progress bars, sticky sections, scale-on-scroll |
| **D. CSS Keyframe Animation** | Pure CSS `@keyframes` animations, infinite or finite | CSS only (auto on mount) | CSS rendering | Pulse, blink, rotate, marquee, float, shake, gradient shift |
| **E. Hover / Focus Micro-interaction** | State change on user interaction | Mouse/focus event | CSS transition or JS | Glow, lift, color shift, border highlight, shadow expand |
| **F. Staggered Sequential Reveal** | Multiple child elements appear one-by-one with delays | Timer chain (React state or setTimeout) | CSS transitions | Terminal lines, feature lists, step indicators, card grids |
| **G. Background Atmosphere** | Decorative layered backgrounds, non-interactive | Static or CSS animated | CSS (gradients, pseudo-elements, SVG filters) | Noise texture, radial glows, grid patterns, gradient meshes, blur blobs |
| **H. Layout Transition** | Responsive layout changes or animated section transitions | Resize / scroll position | CSS Grid/Flexbox + transitions | Column count changes, sticky headers, collapsing sections |

### 3.2 Template Analysis Procedure

For EVERY template received, the AI MUST:

1. **List all files** in the template ZIP — identify every component file
2. **Read each component** — identify what visual effect it implements
3. **Classify each effect** using the taxonomy above (A through H)
4. **Extract rendering parameters** — canvas size, particle count, speed, colors, easing, thresholds, etc.
5. **Note placement context** — where in the page layout is each effect positioned (hero background, section accent, footer, global overlay, etc.)
6. **Check for JS scripts** in HTML templates — `<script>` tags may contain effect logic not in components
7. **Verify CSS animations** — check `@keyframes`, `transition`, `animation` properties in stylesheets
8. **Create an effects manifest** — a complete list before writing any code

### 3.3 Universal Canvas Rules (Applies to ALL Category A Effects)

**DPR Handling (MANDATORY — never skip):**
```js
const resize = () => {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // NEVER use ctx.scale(dpr, dpr) — it accumulates on every resize call!
};
resize();
window.addEventListener('resize', resize);
```

**Cleanup (MANDATORY):**
```js
return () => {
  cancelAnimationFrame(frameRef.current);
  window.removeEventListener('resize', resize);
  // Also disconnect any ResizeObserver if used
};
```

**Performance:**
- Use `requestAnimationFrame` — never `setInterval` for rendering
- Pre-calculate values outside the render loop where possible
- Pre-assign particle properties (color, size, speed) at creation time — do NOT randomize per frame
- For connecting-line effects, limit distance checks (spatial hashing or simple distance cutoff)
- Use `passive: true` on scroll listeners

**Placement patterns for canvas effects:**

| Placement | Position CSS | Canvas sizing | z-index behavior |
|---|---|---|---|
| **Full-viewport overlay** | `fixed inset-0` | `window.innerWidth × innerHeight` | Low z (below content), pointer-events-none |
| **Section background** | `absolute inset-0` within section | Section's bounding rect | Behind section content (z-0 or z-1 within section) |
| **Decorative accent** | `absolute` with explicit size/position | Container's bounding rect | Often with reduced opacity (0.2-0.4) |
| **Inline element** | `relative` within content flow | Parent container size | Same z-level as surrounding content |

### 3.4 Universal Scroll Reveal Rules (Applies to ALL Category B Effects)

**An IntersectionObserver client component is ALWAYS required.** Without it, any element starting at `opacity: 0` will remain invisible forever.

```tsx
// scroll-reveal.tsx — render ONCE in the page
"use client";
import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.fade-up'); // Adjust selector to match template

    if (reduceMotion) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
```

**The CSS class names and animation properties must match whatever the template uses.** Common patterns:

| Template pattern | Hidden state | Visible state | Trigger class |
|---|---|---|---|
| `fade-up` | `opacity: 0; translateY(28px)` | `opacity: 1; translateY(0)` | `.is-visible` |
| `slide-in-left` | `opacity: 0; translateX(-40px)` | `opacity: 1; translateX(0)` | `.is-visible` |
| `scale-in` | `opacity: 0; scale(0.9)` | `opacity: 1; scale(1)` | `.is-visible` |
| `blur-in` | `opacity: 0; filter: blur(10px)` | `opacity: 1; filter: blur(0)` | `.is-visible` |
| `clip-reveal` | `clip-path: inset(0 100% 0 0)` | `clip-path: inset(0 0 0 0)` | `.is-visible` or auto @keyframes |

**Staggered delays:** If the template staggers child elements (cards in a grid, list items), use `data-delay` attributes:
```css
.reveal-item[data-delay="1"] { transition-delay: 0.08s; }
.reveal-item[data-delay="2"] { transition-delay: 0.16s; }
.reveal-item[data-delay="3"] { transition-delay: 0.24s; }
.reveal-item[data-delay="4"] { transition-delay: 0.32s; }
```

### 3.5 Universal Parallax Rules (Applies to ALL Category C Effects)

```tsx
const [scrollY, setScrollY] = useState(0);
useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Apply via inline style:
style={{ transform: `translateY(${scrollY * speedFactor}px)`, transition: 'transform 0.1s linear' }}
```

- Speed factor range: `0.1` (subtle) to `0.5` (dramatic)
- Always use `{ passive: true }` on scroll listeners
- Add `will-change: transform` on parallax elements
- Consider `position: sticky` for scroll-linked progress effects

### 3.6 Universal Staggered Reveal Rules (Applies to ALL Category F Effects)

Two valid implementation patterns:

**Pattern A — React state chain (preferred for terminal/sequential content):**
```tsx
const [parentVisible, setParentVisible] = useState(false);
// After parent enters viewport or after a base delay:
effect(() => {
  const timer = setTimeout(() => setParentVisible(true), baseDelay);
  return () => clearTimeout(timer);
}, [trigger]);

// Each child:
function RevealItem({ visible, delay, children }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);
  return <div className={`item ${shown ? 'is-shown' : ''}`}>{children}</div>;
}
```

**Pattern B — CSS animation-delay (preferred for grid items):**
```tsx
{items.map((item, i) => (
  <div key={i} className="reveal-item" style={{ animationDelay: `${i * 100}ms` }}>
    {item.content}
  </div>
))}
```

---

## 4. Z-Index Layering System

**Do NOT hardcode a single z-index map.** Instead, follow this **principle-based layering system** and derive the actual values from the template.

### Layering Principles

1. **Content is always above decoration** — all interactive/semantic content must be above all background effects
2. **Navigation is always on top** — sticky/fixed nav must be above everything including content
3. **Overlays (modals, toasts) above nav** — if the template has them
4. **Background effects between page bg and content** — atmospheric effects sit in the middle layer
5. **Noise/texture overlays are ambiguous** — they can be above or below content depending on desired effect. Check the template. If they dim content, put them above content with low opacity. If they add texture without dimming, put them above background effects but below content.

### General Layer Order (bottom to top)

```
Layer 0:   Page background (solid color or gradient)
Layer 1-N: Background atmosphere effects (gradients, grid patterns, decorative canvas)
Layer M:   Mid-layer effects (floating particles, parallax elements)
Layer X:   All content sections (the main page content)
Layer Y:   Texture overlays (noise, grain) — IF they should dim content
Layer Z:   Navigation (sticky/fixed header)
Layer Z+:  Overlays (modals, toasts, drawers)
```

### How to Derive Values for a Specific Template

1. Read the template's CSS/JS — find all `z-index`, `position: fixed`, `position: sticky`, `position: absolute` values
2. Map them to the layer order above
3. Assign numeric values with enough gaps for future insertion (e.g., 0, 1, 5, 10, 50, 100)
4. **Test by asking:** "Can the user click/interact with content?" If not, a decoration layer is covering it.

---

## 5. Theme System

**Do NOT hardcode colors or fonts.** Always extract from the source HTML or user spec first.

### 5.1 Theme Extraction

1. Read the user's source HTML — find `<style>`, `tailwind.config`, CSS variables, or inline color values
2. Identify: background color, foreground/text color, surface/card color, border color, accent colors (primary + secondary), muted text color
3. Identify: body font family + weights, monospace font family + weights
4. Identify: any border-radius, spacing patterns, shadow styles

### 5.2 CSS Custom Properties Template

Register ALL theme values as CSS custom properties. This is the canonical structure — fill in values from extraction:

```css
:root {
  --background:  <extracted>;
  --foreground:  <extracted>;
  --surface:     <extracted>;   /* Card/panel backgrounds */
  --edge:        <extracted>;   /* Borders, dividers */
  --accent-a:    <extracted>;   /* Primary accent (CTAs, highlights) */
  --accent-b:    <extracted>;   /* Secondary accent (links, info) */
  --muted:       <extracted>;   /* Secondary text */
  --radius:      <extracted>;   /* Default border-radius */
}
```

### 5.3 Tailwind v4 Theme Registration

```css
@theme inline {
  --font-sans:  <extracted body font>;
  --font-mono:  <extracted mono font>;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface:    var(--surface);
  --color-edge:       var(--edge);
  --color-accent-a:   var(--accent-a);
  --color-accent-b:   var(--accent-b);
  --color-muted:      var(--muted);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

**Tailwind v4 gotcha:** `@apply` cannot use custom theme colors directly (e.g., `@apply border-edge` fails). Use `border-color: var(--edge)` in `@layer base` instead.

### 5.4 Font Setup

```tsx
// layout.tsx
import { <FontName> } from 'next/font/google';

const bodyFont = <FontName>({
  subsets: ["latin"],
  variable: '--font-body',
  weight: [<extracted weights>],
});

// Apply variable class to <body>:
<body className={`${bodyFont.variable} font-sans antialiased`}>
```

---

## 6. Layout Architecture

**Do NOT assume a fixed layout structure.** Extract the layout from the template and source HTML.

### 6.1 Layout Extraction Procedure

1. **Identify sections** — scan the template for distinct page sections (hero, about, services, features, pricing, testimonials, contact, footer, etc.)
2. **Map section → component** — each section becomes a separate component file
3. **Extract grid/flex layout** — note column counts, breakpoints, gaps, max-widths
4. **Note the max-width pattern** — most templates use a consistent content max-width. Extract it and register as `--max-content` or `max-w-content` in Tailwind.
5. **Check hero vs content width consistency** — if the hero uses a different width than content sections, note whether this is intentional (design choice) or a mismatch (bug). Ask the user if unclear.

### 6.2 Universal Layout Rules

- **Consistent max-width:** All sections SHOULD use the same content max-width unless the template deliberately varies it
- **Consistent horizontal padding:** All sections use the same `px-4 sm:px-6` (or whatever the template specifies)
- **Section dividers:** Use consistent border or spacing between sections
- **Effect placement:** Canvas/decorative effects are typically `absolute` or `fixed` within/behind sections, never in the content flow

### 6.3 Page Shell Structure

```
<main> (relative, min-h-screen, overflow-x-hidden)
├── <ScrollReveal />         ← IntersectionObserver (if any Category B effects exist)
├── <GlobalCanvasFX />      ← If any full-viewport canvas effects exist (Category A, fixed)
└── <div content-layer>     ← All content sections
    ├── <Navigation />
    ├── <Section1 />
    ├── <Section2 />
    ├── ...
    └── <Footer />
```

Only include `<ScrollReveal />` and `<GlobalCanvasFX />` if the template actually has those effect types. Do NOT include them unconditionally.

---

## 7. CSS Utility Classes

**Do NOT hardcode a fixed list.** Extract utility classes from the template's CSS.

### 7.1 Extraction Procedure

1. Read ALL CSS in the template (stylesheets, `<style>` tags, Tailwind config)
2. Identify every custom class that defines a visual state (animation, hover, transition, pseudo-element)
3. Categorize each:
   - **Animation classes:** Define `@keyframes` or `transition` for motion
   - **State classes:** Define hover/focus/active appearances
   - **Layout classes:** Define structural patterns (glass, terminal, card)
   - **Pseudo-element classes:** Use `::before` or `::after` for decorative content (noise, cursors, glows)
4. Port ALL of them to `globals.css` under `@layer utilities`

### 7.2 Universal CSS Rules

- All animations MUST have `@media (prefers-reduced-motion: reduce)` overrides
- All interactive elements MUST have `:focus-visible` styles
- Canvas containers MUST have `pointer-events-none` unless they accept input
- `will-change` should be added to elements with frequent transform/opacity animations
- Use `cubic-bezier(0.22, 1, 0.36, 1)` for smooth deceleration (or match the template's easing)

---

## 8. Common Pitfalls (Template-Agnostic)

These are structural pitfalls that apply regardless of template:

| # | Pitfall | Symptom | Fix |
|---|---|---|---|
| 1 | **IntersectionObserver missing** | All scroll-reveal elements stay invisible | Create a `scroll-reveal.tsx` client component that observes all reveal selectors |
| 2 | **`ctx.scale()` in resize handler** | Canvas rendering breaks/glitches on window resize | Use `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` — `scale()` accumulates |
| 3 | **Randomizing properties per frame** | Particles/effects flicker randomly | Pre-assign all stable properties (color, size, speed) at object creation |
| 4 | **Z-index layer conflict** | Effects invisible or blocking content | Follow Section 4 layering principles; test interactivity |
| 5 | **Canvas sized to scrollHeight** | Full-page canvas effects invisible | Use `window.innerHeight` for fixed canvases |
| 6 | **Inconsistent max-width** | Jarring width changes between sections | Use same `max-w-content` unless template deliberately differs |
| 7 | **Tailwind v4 `@apply` with custom vars** | Build error | Use direct CSS property assignment in `@layer base` instead |
| 8 | **`next/font` variable not on body** | Fonts don't apply | Apply font variable class string to `<body>` in layout.tsx |
| 9 | **Missing cleanup in useEffect** | Memory leaks, orphaned animations, duplicate listeners | Always return cleanup: `cancelAnimationFrame`, `removeEventListener`, `observer.disconnect` |
| 10 | **Forgetting `"use client"`** | Server component error for canvas/interactive components | All components using hooks (`useState`, `useEffect`, `useRef`) must have `"use client"` |
| 11 | **Effect container too small** | Effect looks tiny, not atmospheric | Check template's original container size — decorative effects often use 600-800px+ containers, not small grid columns |
| 12 | **CSS animation without reduced-motion fallback** | Animation still runs when user prefers no motion | Always add `@media (prefers-reduced-motion: reduce)` that sets `animation: none; opacity: 1; transform: none` |

---

## 9. next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ignoreBuildErrors: true,
};
export default nextConfig;
```

---

## 10. File Structure Convention

**Do NOT assume fixed component names.** The structure below is the convention — actual files depend on the template's sections and effects.

```
project-root/
├── app/
│   ├── globals.css           ← Theme vars + ALL utility/animation classes
│   ├── layout.tsx            ← Fonts (next/font/google), metadata
│   └── page.tsx              ← Imports all sections + global effect wrappers
├── components/
│   └── landing/              ← (or whatever naming the template uses)
│       ├── navigation.tsx    ← (if template has navigation)
│       ├── hero-section.tsx  ← (if template has hero)
│       ├── scroll-reveal.tsx ← (REQUIRED if any scroll-reveal effects exist)
│       ├── <effect-1>.tsx    ← Each canvas/animation effect as its own component
│       ├── <effect-2>.tsx
│       ├── ...
│       ├── <section-1>.tsx   ← Each content section as its own component
│       ├── <section-2>.tsx
│       ├── ...
│       └── footer.tsx        ← (if template has footer)
├── public/
│   └── (static assets)
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json              ← Minimal deps, NO unnecessary libs
└── .gitignore
```

**Naming convention:** kebab-case for all files. Component names = PascalCase export from kebab-case file.

---

## 11. Output Specification

### Initial Build
- **Full project folder** — all files, ready for `npm install && npm run build`
- **ZIP file** of the full project (excluding `node_modules/`, `.next/`, `out/`)
- All source files include comments in English

### Revision Rounds
- **Changed files ONLY** — delivered as a ZIP maintaining the folder path structure
- Example: `sphere-size-fix.zip` containing:
  ```
  components/landing/hero-section.tsx
  components/landing/particle-sphere.tsx
  ```
- User extracts ZIP and drags files into their git repo to replace
- **No `node_modules/`, no build artifacts**

### Naming Convention
- ZIP: `{brief-description}.zip`
- Files: kebab-case, matching existing project structure

---

## 12. Workflow Instructions for AI

### Phase 1 — Analyze
1. Read ALL input materials (template ZIP, source HTML, theme spec, screenshots)
2. **Extract content** from source — all text, links, sections, data, images, contact info
3. **Extract theme** — colors, fonts, spacing, design tokens, CSS variables
4. **Audit template effects** — using Section 3.2 procedure, classify EVERY visual effect
5. **Extract layout** — section structure, grid columns, max-widths, responsive breakpoints
6. **Create effects manifest** — complete numbered list of all effects with their category, parameters, and placement

### Phase 2 — Plan
1. Map source content → Next.js section components
2. Map template effects → implementation approach (which category, which canvas pattern)
3. Identify z-index layering for this specific template
4. Plan creative enhancements (if user wants AI to go beyond template)
5. Create file-by-file implementation plan
6. **Present the plan to the user before building** if anything is ambiguous

### Phase 3 — Build
1. Setup Next.js project with correct `next.config.mjs`
2. Configure `globals.css` — theme vars (from extraction) + ALL utility/animation classes (from template)
3. Setup `layout.tsx` with correct fonts and metadata
4. Build global effect components (scroll-reveal, global canvas effects)
5. Build all section components with their content and local effects
6. Assemble in `page.tsx` with correct z-index layering
7. **Verify ALL of these before declaring done:**
   - `npm run build` succeeds
   - All canvas effects use `setTransform()` not `scale()`
   - IntersectionObserver exists if any scroll-reveal effects are present
   - Z-index layering is correct (content above effects, nav on top)
   - All animations have `prefers-reduced-motion` fallback
   - Content matches source exactly (no text alterations)

### Phase 4 — Revise
1. Read user feedback + any new screenshots
2. Identify minimum set of files to change
3. Edit only what's needed
4. Output changed files as ZIP with folder path structure
5. Confirm what changed and why

---

## 13. Creative Enhancement Guidelines

The AI is encouraged to go beyond the template when the user wants creative input:

- **Particle effects:** Add connecting lines, orbit rings, trails, dual-color glow, depth-of-field blur
- **Scroll animations:** Add parallax layers, staggered reveals with varied easing, scale transitions, blur transitions
- **Hover states:** Add glow effects, subtle transforms, color shifts, border animations
- **Background atmosphere:** Layer multiple gradients, noise textures, grid patterns, floating blur blobs
- **Transitions between sections:** Gradient dividers, animated SVG separators, morphing shapes
- **Micro-interactions:** Magnetic buttons, text scramble on hover, cursor effects

**Always respect:**
- The user's content and messaging — do NOT alter text
- The extracted color palette and font choices
- Performance — `requestAnimationFrame`, passive listeners, proper cleanup
- Accessibility — `prefers-reduced-motion`, aria labels, focus states, semantic HTML
- Bundle size — no unnecessary libraries

---

## 14. Delivery Checklist

### Build Verification
- [ ] `next.config.mjs` has `output: 'export'` and `images: { unoptimized: true }`
- [ ] `npm run build` succeeds with no errors
- [ ] Static export generates in `out/` folder

### Effect Verification (for EACH effect in the manifest)
- [ ] Effect is implemented and visually matches the template (or improves on it)
- [ ] Canvas effects use `setTransform()` not `scale()` for DPR
- [ ] Canvas effects have proper cleanup (`cancelAnimationFrame`, `removeEventListener`)
- [ ] Scroll-reveal effects have a working IntersectionObserver
- [ ] Z-index placement is correct (not hidden behind content, not blocking interaction)
- [ ] `prefers-reduced-motion` is respected

### Layout & Content Verification
- [ ] All sections from source HTML are present
- [ ] Content text matches source exactly
- [ ] All links and contact info are correct
- [ ] Consistent max-width across sections (unless deliberately different)
- [ ] Responsive layout works at mobile/tablet/desktop breakpoints
- [ ] Navigation links work (anchor scroll to sections)
- [ ] Mobile menu toggles correctly

### Theme Verification
- [ ] Colors match the extracted theme spec
- [ ] Fonts load correctly via `next/font/google`
- [ ] Font variable classes are applied to `<body>`
- [ ] Dark/light mode is consistent (if applicable)

---

*Context version: 2.0 | Last updated: 2026-08-12*