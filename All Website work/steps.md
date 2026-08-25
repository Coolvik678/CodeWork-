# 🌐 Standard Website Development Workflow (SOP)

This document outlines the professional end-to-end process for building, refining, and deploying high-conversion websites for clients. 

---

## Phase 1: Discovery & Planning
1.  **Requirement Prompt**: Start with a detailed prompt from the user (e.g., brand vibe, color palette, target audience, and specific sections needed).
2.  **Implementation Plan**: Create a technical plan (`implementation_plan.md`) describing the architecture, tech stack (e.g., Vite/Vanilla JS), and design choices.
3.  **Task Breakdown**: Initialize a `task.md` file to track development phases and milestones.

---

## Phase 2: Core Development
1.  **Project Injection**: Set up the project structure using Vite or a similar modern build tool.
2.  **Asset Integration**: Map and organize client-provided assets (images, logos, text) in the `public/` directory. **CRITICAL**: Always replace the framework's default Favicon (e.g., `favicon.ico`) with the client's actual logo (`icon.png`).
3.  **Component Build**: Build the website segments (Hero, Features, Services, Contact, etc.) using clean, semantic HTML and modular CSS.
4.  **Micro-animations**: Integrate scroll-reveal triggers, button pulses, and smooth-scrolling anchors to enhance UX.
5.  **Scroll Normalization**: Always implement a mechanism (like `window.scrollTo(0, 0)`) on the main entry page mount, and set `window.history.scrollRestoration = "manual"`. This prevents the browser from aggressively scrolling to the bottom if the user reloads the page or navigated away previously.

---

## Phase 3: Review & Iterative Refinement
1.  **Local Preview**: Run a local development server (`npm run dev`) for the user to see the site live at `localhost`.
2.  **Socratic Feedback**: The user reviews the preview and provides suggestions or identifies bugs (e.g., "Change the doctor photo," "Make the font bolder").
3.  **Rapid Edits**: Implement the requested refinements immediately and hot-reload the preview.
4.  **Final Polish**: Perform a browser audit for mobile responsiveness, click-to-call functionality, and navigation accuracy.

---

## Phase 4: Version Control & Export
1.  **Git Initialization**: Once approved by the user, initialize a local git repository.
2.  **Staging & Commits**: Create a `.gitignore` to keep the project clean, then `commit` the finalized code.
3.  **Automated GitHub Export (Token Method)**:
    - **PAT Token**: `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`
    - **GitHub Username**: `Coolvik678`
    - **Process**:
        1. Use `curl` or `Invoke-RestMethod` with the token in the header to create a new repository via the GitHub API.
        2. Add the remote using the authenticated URL: `git remote add origin https://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@github.com/Coolvik678/project-name.git`
        3. Push to main: `git push -u origin main`
    - This allows for fully "headless" repository creation without needing manually configured SSH keys or the interactive `gh` CLI.

---

## Phase 5: Production Deployment
1.  **Vercel Integration**: Connect the GitHub repository to [Vercel](https://vercel.com/) for automated deployment.
2.  **Live Handover**: Provide the client with the custom `vercel.app` (or custom domain) URL.
3.  **Project Archive**: Store a copy of the finalized repository in the `All Website work` directory for maintenance.

---
*Last Updated: March 2026*
