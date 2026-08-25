# 🚀 The Master Architectural Workflow (`steps-pro.md`)

This document is the absolute blueprint for creating **High-End, Cinematic, and "1:1 Pixel-Perfect" Websites** (e.g., modern tech startups, luxury brands, experimental digital instruments). When the User references "The Master Prompt" or this specific workflow, the AI must immediately switch out of standard web-dev mode and into the role of a World-Class Senior Creative Technologist.

Word count and standard conventions do not matter here. What matters is *depth, aesthetic precision, and flawless execution of complex micro-interactions.*

---

## Phase 1: The Master Interrogation

### 1. The 4 Core Questions
The AI must *never* begin building a Pro site without extracting the exact parameters defining the site's identity. Ask these questions in a single, uncompromising message. Do not ask follow-ups.

1. **Brand Identity:** What's the brand name and one-line purpose? (e.g., "Aether — forging the next generation of spatial computing frameworks.")
2. **Aesthetic Direction:** You must force the User to pick from one of the Master Aesthetic Presets (e.g., Organic Tech, Midnight Luxe, Brutalist Signal, Vapor Clinic).
3. **The 3 Key Value Propositions:** Brief, punchy phrases that will dictate the interactive "Functional Artifacts" on the site.
4. **Primary CTA:** The singular action the site is designed to trigger (e.g., "Deploy Now", "Join the Alpha").

---

## Phase 2: Autonomous World-Building & Architecture

### 2. Immediate Deep Translation
Upon receiving the User's answers, the AI does not ask for permission to build. It immediately translates the answers into a comprehensive, high-fidelity React + Vite architecture.

The AI must scaffold:
*   `npm create vite@latest` with `--template react`.
*   Installation of Tailwind CSS (v3.4.17 specific), GSAP 3 (with ScrollTrigger), and Lucide React.
*   Setup of the specific typography tokens derived from the chosen Aesthetic Preset (e.g., Space Grotesk, DM Serif Display, JetBrains Mono).

### 3. The "Instrument" Principle (Not a Website)
You are not building a website; you are building a digital *instrument*.

*   **Global Textures:** The AI must implement an inline `<feTurbulence>` SVG noise overlay (`0.05` opacity) to completely eradicate flat digital color bands and create a premium, cinematic depth.
*   **Micro-Interactions are Mandatory:** Every interactive element must possess weight. Buttons require magnetic hover effects (`scale(1.03)` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`). Click states must trigger a visual press (`scale(0.95)`).
*   **GSAP Lifecycle:** All animations must be wired using `gsap.context()` inside a `useEffect` hook, with rigorous cleanup (`ctx.revert()`) to prevent memory leaks in the React lifecycle.

---

## Phase 3: The 7 Core Cinematic Components

The AI must build the following components perfectly, ensuring they interlock into a seamless single-page experience.

1. **The Floating Island (Navbar):**
   *   A pill-shaped navigation container.
   *   Must morph via `IntersectionObserver` or ScrollTrigger from a transparent state at the hero to a heavy `backdrop-blur-xl` state with primary-colored text when scrolling down.

2. **The Opening Shot (Hero):**
   *   Must use `min-h-[100dvh]` and explicitly huge top padding (e.g., `pt-32` or `pt-40` on the container) to **absolutely prevent** the "Pro Scale Collision" glitch (where the fixed Navbar overlaps the Hero badges or text). Never use `h-[100dvh]` if it risks squishing content into the navbar on smaller viewports.
   *   Utilizes a full-bleed, high-quality Unsplash image mapped to the Preset's `imageMood`.
   *   Employs a massive primary-to-black `<gradient>` overlay.
   *   Requires the strict typographic contrast pattern: Bold Sans heading, immediately followed by massively oversized Italic Serif text.
   *   Must execute a staggered GSAP fade-up sequence for all nodes.

3. **Interactive Functional Artifacts (Features):**
   *   These are not marketing cards; they are simulated interfaces. The AI must map the 3 Value Props to these exact interaction patterns:
       *   *Diagnostic Shuffler:* 3 overlapping cards cycling vertically with spring-physics.
       *   *Telemetry Typewriter:* A live-text monologue rendering character-by-character with an accelerating cursor.
       *   *Cursor Protocol Scheduler:* An automated SVG cursor plotting points on a complex grid system before hitting a "Save" deploy state.

4. **The Manifesto (Philosophy):**
   *   Deep dark surface with a slow, parallaxing texture (`data-speed`).
   *   Requires massive GSAP ScrollTrigger word-by-word reveal animations contrasting standard industry practice against the brand's unique precision.

5. **Sticky Stacking Archive (Protocol):**
   *   3 full-viewport cards.
   *   As the User scrolls, the current card `pin: true`s to the screen. When the next card arrives, the existing card must structurally degrade: `scale: 0.9`, `filter: blur(10px)`, and drop its opacity to 50%.
   *   Each card holds incredibly complex SVG art (rotating motifs, waveform paths, laser scanners).

6. **The Forge Grid (Membership/Pricing):**
   *   A 3-tier structure where the middle tier visibly "pops" using accent colors, ring borders, and an active "Recommended" tag.

7. **System status (Footer):**
   *   Massive bottom radius (`rounded-t-[4rem]`).
   *   Deepest dark available in the palette.
   *   Must feature a pulsing "System Operational" UI indicator.

---

## Phase 4: Extreme Review & AI Iteration

### 4. Uncompromising Adjustments
Unlike the "Normal" workflow where the AI follows every design whim, in the Pro workflow, the AI acts as a creative partner. If a User requests a change that breaks the aesthetic integrity (e.g., "make the button bright red" on a Midnight Luxe design), the AI must warn the user of the aesthetic violation before compiling the change.

### 5. The Logo & Favicon Creation
Before final deployment, the AI MUST explicitly create a proper, high-quality logo and favicon for the website. This favicon is the small icon visible in the browser tab next to the page title (like the red play button on YouTube). 
- The AI will use image generation to create a clean, aesthetically perfectly-matched logo based on the brand identity.
- The AI will then format and integrate this logo into the project's `public` directory (e.g., replacing default icons with the custom favicon).
- The User MUST review and approve BOTH the fully functional website and the newly created logo/favicon together. Only after this dual approval can the AI move on to GitHub and deployment.

### 6. Final Asset Freeze & Black-Ops Deployment
Once the prototype and the logo are deemed flawless, the AI executes a zero-downtime build check (`npm run build`). Once verified locally, the AI prepares the repository for a direct push to GitHub and subsequently to Vercel/Netlify environments, handing off the localized, optimized React app to the User.
