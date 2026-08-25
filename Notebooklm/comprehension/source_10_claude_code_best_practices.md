# Comprehension: Best Practices for Claude Code - Claude Code Docs

## Metadata
- **Category**: Claude Code / Generic
- **Source(s)**: 10. Best Practices for Claude Code...
- **Applicable to**: Claude Code | Anti-Gravity | Gemini CLI
- **Priority**: Critical
- **Dependencies**: None
- **Date Implemented**: 2026-03-17

## Description
A compilation of official best practices from Anthropic (Claude Code Docs) for maximizing output quality and managing costs.

## Concept
Quality is a function of Context Quality + Prompt Specificity + Verification Loops.

## Implementation

### Patterns
1. **Context Window Management**: #1 Priority. Refresh sessions before the context window becomes "saturated" (slow reasoning, non-deterministic output).
2. **Verification-First Development**: Before implementation, the agent must define "what success looks like" (Tests, UI Screenshots, logs).
3. **The 'Explore -> Plan -> Implement' Loop**: Never skip the planning phase. The agent must document the proposed changes before editing files.
4. **MCP Integration**: Use MCP servers as extending "organs" for the agent (Google Search, Browser, GitHub).

## References
- Source 10 from NotebookLM.
