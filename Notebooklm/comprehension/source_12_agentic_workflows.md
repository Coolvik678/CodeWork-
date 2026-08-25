# Comprehension: Best practices for agentic coding - Rivista AI

## Metadata
- **Category**: Generic / Claude Code
- **Source(s)**: 12. Best practices for agentic coding
- **Applicable to**: Claude Code | Anti-Gravity | Gemini CLI
- **Priority**: High
- **Dependencies**: MCP Servers
- **Date Implemented**: 2026-03-17

## Description
A comprehensive guide for transitioning from basic AI assistance to autonomous agentic task execution.

## Concept
The "Power Tool" mindset. Customizing the model's environment with MCP servers to allow it to act on the world.

## Implementation
### Patterns
1. **Custom Environment Files**: Using `.env` and `.claude/config` to define the agent's boundaries and capabilities.
2. **Headless Infrastructure**: Using "headless mode" for automating complex dev-ops and infrastructure tasks without user intervention.
3. **Visual Iteration**: Integrating browser-based verification (Playwright) into the agent's TDD loop.

## References
- Source 12 from NotebookLM.
