# Comprehension: Claude Code Best Practices: A Guide to Agentic Coding ...

## Metadata
- **Category**: Claude Code / Generic
- **Source(s)**: 15. Claude Code Best Practices: A Guide...
- **Applicable to**: Claude Code | Anti-Gravity | Gemini CLI
- **Priority**: High
- **Dependencies**: CI/CD integration
- **Date Implemented**: 2026-03-17

## Description
Establishes a rigorous mental model for working with AI agents as "High-Speed Junior Engineers."

## Concept
"Disciplined Delegation" — providing enough oversight and structured gates to prevent autonomous runaway or code rot.

## Implementation
### Patterns
1. **Mandatory Pre-Coding Plans**: The agent must write and get approval for a list of changes before modifying any files.
2. **Automated Quality Gates**: Using linting, unit tests, and CI/CD pipelines as "hard checks" that the agent cannot override.
3. **Small, Testable Changes**: Forcing the agent to commit frequently to keep changes atomic and easy to rollback.

## References
- Source 15 from NotebookLM.
