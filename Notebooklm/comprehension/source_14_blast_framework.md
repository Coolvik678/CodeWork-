# Comprehension: Claude Code Anti-Gravity: The IDE Setup That Changed How I Build

## Metadata
- **Category**: Anti-Gravity / Claude Code
- **Source(s)**: 14. Claude Code Anti-Gravity: The IDE Setup...
- **Applicable to**: Anti-Gravity | Claude Code
- **Priority**: Critical
- **Dependencies**: None
- **Date Implemented**: 2026-03-17

## Description
Details the optimal configuration of the Anti-Gravity IDE for deep integration with Claude Code agents.

## Concept
The **BLAST** framework for agentic steering.

## Implementation

### **The BLAST Framework**
- **Believe**: Establish the agent's identity and mission (Identity Bootstrap).
- **Listen**: Gather context and read project rules (`CLAUDE.md`).
- **Analyze**: Break down the problem into a step-by-step plan.
- **Solve**: Execute the plan in small patches.
- **Test**: Automated verification of the solution.

### **IDE Configurations**
- **Claude Skills**: Implement custom task automations as "skills" that the agent can load dynamically.
- **Handoff Strategy**: Mandatory use of `HANDOFF.md` to persist memory between sessions.
- **Context Refresh**: Automatic session reset when tokens exceed 70% of the reasoning window to maintain peak agent performance.

## References
- Source 14 from NotebookLM.
