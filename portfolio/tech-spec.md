# Tech Spec — AURYN Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^5.0 | Build tool, dev server, asset bundling |
| gsap | ^3.12 | Core animation engine, timelines, tweens |
| lenis | ^1.1 | Smooth scroll with inertia |
| @studio-freight/lenis | — | Lenis types (bundled) |
| gsap/ScrollTrigger | (plugin) | Scroll-triggered animations |
| gsap/SplitText | (plugin) | Word/char splitting for heading reveals |

No component framework — this is a single-page, section-heavy portfolio where vanilla JS + GSAP gives direct control over every animation. No shadcn/ui (no reusable UI components needed). No React/Vue (no state management, no inter-component communication).

Fonts and icons are loaded via CDN — no npm packages.

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| NavHeader | Custom | Singleton | Sticky nav with scroll hide/show, background transition, mobile hamburger overlay |
| Preloader | Custom | Singleton | Full-viewport overlay, sequenced line/label animation, gates page entrance |
| CustomCursor | Custom | Singleton | Fixed-position dot with mix-blend-mode, scales on interactive hover, hidden on touch |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport, layered title group with decorative serif words, gradient orb, social links, scroll indicator |
| PhilosophySection | Custom | Two-column grid: pull quote left, bio text right, decorative divider with dot |
| ProjectsSection | Custom | Two-column staggered grid (left column offset 80px), 6 project cards |
| SkillsSection | Custom | Three-column skill category cards with animated progress bars |
| ExperienceSection | Custom | Two experience cards with timeline connector, expandable achievements, stats counters |
| MetricsSection | Custom | Contained panel with 52×7 contribution heatmap, 3 metric counters |
| ServicesSection | Custom | Three service cards with numbered indices, deliverable lists, hover glow |
| TestimonialsSection | Custom | Single-card slider with directional transitions, dot indicators, arrow nav |
| ContactSection | Custom | Two-column: contact form (floating labels) + info card with social links and availability badge |
| FooterSection | Custom | Decorative brand mark, nav links, social links, back-to-top |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| MagneticButton | Custom | All CTA buttons, submit button | GSAP quickTo cursor-following wrapper with elastic snap on leave |
| GlassCard | Custom | Project cards, skill cards, experience cards, service cards, contact cards, info card | CSS-only glassmorphism base; hover glow/shift added by consuming sections |
| SkillTag | Custom | Project cards (tech stacks) | Small pill tag, CSS-only |
| SectionLabel | Custom | All sections except Hero/Footer | "01 / PROJECTS" index label pattern |
| AnimatedHeading | Custom | All sections with headlines | SplitText word/char reveal on scroll trigger |

### Hooks/Utilities

| Name | Purpose |
|------|---------|
| useLenis | Initialize Lenis, connect GSAP ticker, provide scrollTo API |
| useScrollReveal | Factory for default scroll-triggered entrance (opacity + translateY + stagger) |
| useTilt | Factory for 3D card tilt on mousemove (perspective rotation + internal parallax) |
| useReducedMotion | Check `prefers-reduced-motion`, disable animations when active |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Preloader sequence (line → split → reveal) | GSAP timeline | Multi-step timeline: scaleX line, split into halves with translateY, label fade in/out. OnComplete: hide overlay, trigger hero entrance | 🔒 High |
| Hero entrance sequence | GSAP timeline | Staggered timeline after preloader: subtitle → name lines → decorative words → description → CTAs → socials → scroll indicator | Medium |
| Hero gradient orb drift | GSAP | Infinite yoyo translateY tween on the orb element | Low |
| Hero mouse parallax | GSAP quickTo | quickTo for orb (factor 0.03) and serif words (factor 0.02), updated on mousemove | Low |
| Scroll indicator dot | GSAP | Infinite repeat translateY tween on the dot | Low |
| Nav background transition | CSS transition + JS | Toggle class at 100px scroll; CSS handles backdrop-filter transition | Low |
| Nav scroll hide/show | GSAP / CSS | Track scroll direction, translateY -100% on down, 0% on up | Low |
| Custom cursor follower | GSAP quickTo | Two quickTo instances (x, y) updated on mousemove; scale/opacity tween on interactive element hover enter/leave | Medium |
| Scroll-triggered reveal (default) | GSAP + ScrollTrigger | Reusable factory: ScrollTrigger at top 80%, animate from opacity 0 / translateY 50px | Low |
| Animated heading reveal | GSAP + SplitText + ScrollTrigger | SplitText splits into words; staggered opacity/translateY/blur per word on scroll trigger | Medium |
| Philosophy divider draw | GSAP + ScrollTrigger | scaleY 0→1 on the line; scale 0→1 with back.out on the dot | Low |
| Project card entrance | GSAP + ScrollTrigger | Left column cards: translateY 80px + rotateX 5deg, stagger 0.15s. Right column: same with 0.3s delay for wave | Medium |
| Project scroll parallax | GSAP + ScrollTrigger | scrub-based translateY: left column 0.95x, right column 1.05x speed | Low |
| Card 3D tilt | Vanilla JS + GSAP | mousemove → calculate rotation from cursor position relative to card center (max ±8deg), perspective 1000px. Internal content shifts at 0.5x. Return on mouseleave | Medium |
| Card hover effects | CSS | Border color transition, image scale, box-shadow — all CSS transitions | Low |
| Skill progress bar fill | GSAP + ScrollTrigger | Width 0% → target%, staggered 0.08s per bar after card enters | Low |
| Experience timeline draw | GSAP + ScrollTrigger | scaleY 0→1 on connector line; nodes scale in with back.out | Low |
| Experience card entrance | GSAP + ScrollTrigger | Standard reveal, staggered 0.2s | Low |
| Achievement expand/collapse | GSAP | height 0→auto (animateTo technique), opacity 0→1, chevron rotation 180deg | Low |
| Stats counter animation | GSAP | Snap tween on textContent from 0 to target over 2s. "+" symbol appears with bounce after count | Medium |
| Contribution heatmap cascade | GSAP + ScrollTrigger | 364 cells stagger left-to-right, top-to-bottom: opacity 0 + scale 0.5 → final state. Stagger 0.002s per cell creates wave | 🔒 High |
| Metrics fade-up | GSAP + ScrollTrigger | Standard reveal, stagger 0.1s, delayed after heatmap | Low |
| Service card entrance | GSAP + ScrollTrigger | Cards from translateY 80px, stagger 0.15s. Internal elements micro-stagger 0.08s | Medium |
| Service card hover glow | CSS | box-shadow + border-color + translateY shift, pure CSS transitions | Low |
| Testimonial slide transition | GSAP | Outgoing: opacity→0, translateX→-40px. Incoming: opacity 0→1, translateX 40px→0. 0.4s each | Medium |
| Testimonial entrance | GSAP + ScrollTrigger | Card fade-up, quote marks scale with back.out | Low |
| Contact form card slide-in | GSAP + ScrollTrigger | Form from translateX -60px, info card from translateX 60px, 0.15s offset | Low |
| Form field stagger | GSAP + ScrollTrigger | Fields from translateY 20px, stagger 0.08s | Low |
| Floating label animation | CSS | Label translateY + scale transition on :focus and .has-value class | Low |
| Availability badge pulse | CSS | box-shadow animation (green glow expanding/fading), infinite | Low |
| Footer entrance | GSAP + ScrollTrigger | Brand mark fade, nav links stagger, socials fade, bottom bar fade | Low |
| Magnetic button pull | GSAP quickTo | quickTo x/y on mousemove within 100px radius; elastic snap on leave | Medium |
| Button ripple effect | CSS/JS | Radial gradient expanding from click position on submit/CTA buttons | Low |

---

## State & Logic

**Preloader → Hero orchestration**: Preloader is the gate. Page scroll is locked (Lenis `stop()`) during preloader. Preloader GSAP timeline `onComplete` calls: (1) set preloader `display: none`, (2) `lenis.start()`, (3) fire hero entrance timeline. This sequence must be hard-wired — no async gaps.

**Lenis + GSAP ticker sync**: Lenis RAF must be connected to `gsap.ticker` with `lagSmoothing(0)`. This is a one-time setup in the Lenis init module — if this connection breaks, all ScrollTrigger timing desyncs.

**Testimonial slider state**: Track `currentIndex` (0–2). Arrow clicks and dot clicks update index. Transition in-progress flag prevents double-clicks during the 0.4s GSAP transition. No auto-play — manual navigation only.

**Contact form state machine**: 4 states — idle, loading, success, error. State transitions triggered by submit click (→loading), validation result (→error or →success), 3s timeout (→idle). Each state updates button text, color, and optional icon.

**Reduced motion detection**: Read `prefers-reduced-motion` once at init. When active: set all GSAP durations to 0.01s, disable cursor follower, disable 3D tilt, disable smooth scroll (Lenis `destroy()` or `stop()`). This is a global flag consumed by all animation factories.

**Scroll direction tracking**: Simple previous/current scroll position comparison on Lenis scroll event. Feeds nav hide/show and any direction-dependent animations.

---

## Other Key Decisions

**Single HTML file, not multi-page**: The design explicitly states "single scrollable page" with "no sub-pages." One `index.html` with all sections. Vite handles asset bundling and dev server.

**No image preloading library**: 10 images total (6 project screenshots + 3 testimonial portraits + 1 profile). Use native `<img loading="lazy">` for below-fold images. Hero images load eagerly. Preloader timing is fixed (~2.5s) and does not wait for images — this is acceptable for a portfolio where the hero has no images.

**Contribution heatmap is static data**: The 52×7 grid of colored cells is pre-generated as a data array (4 intensity levels, realistic weekday clustering). Rendered as DOM elements. No live GitHub API integration — avoids API key management and keeps the portfolio fully static.

**Phosphor Icons via CDN script**: `<script src="https://unpkg.com/@phosphor-icons/web"></script>` loads all icons. No npm package needed. Icons referenced by CSS class (e.g., `<i class="ph ph-github-logo"></i>`).

**Vite vanilla template**: No framework setup. Raw HTML in `index.html`, CSS in `src/style.css`, JS entry point in `src/main.js`. Vite handles Hot Module Replacement and production build with asset optimization.
