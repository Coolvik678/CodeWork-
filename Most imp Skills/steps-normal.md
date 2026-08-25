# 🌐 Standard Website Architecture & Development Workflow (`steps-normal.md`)

This document serves as the central source of truth for **Standard Client Website Creation**. This workflow is specifically tailored for practical, functional, and fast websites (e.g., local businesses, dentists, doctors, law firms, portfolios). It prioritizes clarity, ease of use, strong SEO, good clean design, and high conversion rates over overly complex or abstract aesthetics.

When the User asks you to create a "normal" website or references this specific workflow, you MUST follow these phases exactly as described below.

---

## Phase 1: The Initial Discovery

### 1. Requirements Gathering (The "Wantings")
Before writing a single line of code or initiating a project, the AI must collect the fundamental requirements from the User. Ask the following questions in a single, clear message:

1. **Business/Client Name:** What is the name of the entity?
2. **Primary Goal:** What is the main action the website should drive? (e.g., "Book an appointment," "Call our office," "View the menu.")
3. **Core Services/Offerings:** Briefly, what does the business do? (e.g., "General dentistry, teeth whitening, and Invisalign.")
4. **Vibe/Preferences:** Are there any specific colors, feelings, or websites you like? Anything you explicitly *do not* want? (e.g., "I like clean blue and white healthcare vibes. I don't want it to look too techy.")

### 2. The Blueprint Proposal
Once the User answers, immediately generate a highly readable, organized **Blueprint Proposal**. This should include:
- A brief narrative of what the website will feel like (e.g., "A clean, trustworthy dental site focusing on patient comfort and easy booking").
- A bulleted list of the exact pages or sections that will be built (e.g., Hero, Services, About Doctor, Testimonials, Contact/Footer).
- A proposed color palette and typography (usually standard web-safe fonts like Inter, Roboto, or Open Sans).

**Do not proceed to build until the User approves the Blueprint Proposal.**

---

## Phase 2: Structural Foundation & Rapid Prototyping

### 3. Immediate Setup
Initialize the project structure quickly. For standard websites, use React + Vite or simple HTML/CSS/JS depending on the User's explicit choice in the environment. If unspecified, default to React + Vite + Tailwind CSS for speed and maintainability.

### 4. The Functional Draft ("Good Looking, But Not Too Much")
Build the entire website based on the approved Blueprint. Follow these strict design principles for "normal" websites:

*   **Clarity Over Complexity:** Users need to find information instantly. Phone numbers and CTA buttons should be highly visible, typically in the top right corner of a clean navigation bar.
*   **Standard Layouts Working Best:** Utilize proven hero sections (Headline left, Image right, or Centered with a clear background). Avoid abstract GSAP scroll-jacking or confusing navigation menus.
*   **Trust Signals:** Prominently feature testimonials, awards, certifications, or "years in business" sections to build local trust.
*   **Mobile-First Precision:** Standard consumers mostly browse on their phones. The mobile layout must be flawless, with easily tappable buttons (min 44px height) and no horizontal scrolling issues.
*   **Accessibility (a11y):** Ensure high contrast for text (especially for older demographics or healthcare sites). Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).

*Output Expectation:* The AI will deliver a fully functioning prototype that looks professional, trustworthy, and modern, without feeling like an avant-garde art project.

---

## Phase 3: The Iterative Refinement Process

### 5. Review & Feedback Loop
Following the initial draft, the AI will enter a state of guided refinement. This is where the User checks what they like and what they don't like.

*   The User will dictate exactly what needs to be changed.
*   The AI will execute these targeted modifications precisely as requested, without arguing or over-engineering the solution.
*   If the User asks to change a color, change it. If the User asks to move a button, move it. The AI acts as the highly skilled builder; the User maintains 100% creative and functional control.

### 6. The "No Surprises" Rule
No further structural or massive design changes will be made autonomously. Once the rapid prototype is up, every single modification must be mapped directly to a User request.

---

## Phase 4: Final Polish & Handoff

### 7. Performance & SEO Check
Before declaring the website finished, the AI must ensure:
*   Appropriate meta tags and titles are in place.
*   Images are appropriately sized or referenced correctly.
*   Lighthouse performance scores theoretically align with standard best practices (efficient CSS, no massive blocking scripts).

### 8. The Logo & Favicon Creation
Before moving to deployment, the AI MUST create a dedicated logo and favicon for the business. The favicon is the small icon that appears in the browser tab when you open the site on Google (similar to YouTube's red play button in the tab).
- The AI should generate a clean, professional logo matching the website's vibe and purpose.
- The AI will save this logo into the project's public folder and set it up as the site's default favicon.
- The User will then review BOTH the complete website and the newly generated logo. The AI will ONLY proceed to the GitHub/Deployment phase after explicit User approval of both the website and the logo.

### 9. Deployment and Version Control
Once the User explicitly confirms that both the website and the logo are completely ready and finalized, the AI will handle the final delivery:
*   Provide instructions to the user on how to run locally or build.
*   If requested, initialize a Git repository, commit the finalized code, and push it to the User's GitHub account for deployment on standard hosts like Vercel or Netlify.

---
**Summary for the AI:** Build it fast, make it clear, make it trustworthy. Let the User drive the revisions, and deliver a solid, dependable digital product.
