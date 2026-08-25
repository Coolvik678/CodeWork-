# Everything Claude Code (ECC) Setup & Skills Guide

This document contains the consolidated "Everything Claude Code" setup instructions and the most important skills for Anti-gravity and AI agents.

## 🚀 Setup: Everything Claude Code (ECC)

"Everything Claude Code" is a collection of battle-tested configurations—agents, skills, hooks, commands, and rules—optimized for AI agents like Anti-gravity.

### How to Install/Update
1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/affaan-m/everything-claude-code.git ECC-Setup
   ```
2. **Install dependencies**:
   ```bash
   cd ECC-Setup
   npm install
   ```
3. **Run the Installer**:
   From your project root, run:
   ```bash
   node ./ECC-Setup/scripts/install-apply.js --target antigravity typescript
   ```
   *Note: Replace `typescript` with your project's primary language if needed (e.g., `python`, `swift`).*

### Installed ECC Skills
The following skills have been installed into your `.agent/skills` folder:
- **planner**: Expert planning specialist for complex features and refactoring.
- **architect**: Master software architect for system design and architecture reviews.
- **code-reviewer**: Elite code review expert specializing in AI-powered code analysis.
- **tdd-guide**: Enforces Test-Driven Development (TDD) workflows.
- **security-reviewer**: Security auditing and vulnerability scanning specialist.
- **python-reviewer / go-reviewer / kotlin-reviewer**: Language-specific deep-dive reviewers.
- **build-error-resolver**: Automatically analyzes and fixes compiler/build errors.
- **refactor-cleaner**: Expert in clean code and SOLID principles.
- **doc-updater**: Keeps documentation in sync with code changes.
- **harness-optimizer**: Optimizes the agentic harness for better performance.

---

## 🌟 Top Skills Catalog (Highlights)

Selected from the comprehensive library of 970 skills.

### Core Agentics
- **brainstorming**: Transforms vague ideas into validated designs through disciplined reasoning.
- **systematic-debugging**: Eliminates random fixes; follows a rigorous loop to find root causes.
- **subagent-driven-development**: Executes plans by dispatching specialized sub-agents.

### Specialized Engineering
- **frontend-design**: Creates production-grade interfaces with exceptional aesthetics.
- **database-architect**: Specializes in data layer design, schema modeling, and scaling.
- **rag-engineer**: Expert in building Retrieval-Augmented Generation systems.

### Business & Strategy
- **startup-analyst**: Strategic planning, market sizing, and financial modeling for startups.
- **seo-audit**: Diagnoses issues affecting rankings and organic performance.

---

## 📽️ Video Insights: "Free AI Coding Setup"
*Summary of the "Everything Claude Code" workflow integration.*

- **Compatibility**: Anti-gravity uses an open standard for skills (folders with `SKILL.md` files).
- **Workflow**: 
    - Use **Planning Mode** for big features (creates a `PLAN.md`).
    - Use **Fast Mode** for small fixes and implementation steps.
    - Use **Review Mode** to verify quality before completion.
- **Best Practice**: Always structure work as a loop: Plan -> Implement -> Verify -> Refactor.

---

## 📁 Repository Reference
- **ECC Core**: `./ECC-Setup`
- **Active Skills**: `./.agent/skills`
- **Active Rules**: `./.agent/rules`
- **Active Workflows**: `./.agent/workflows`
