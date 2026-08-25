# Comprehension: 25 Claude Code Tips from 11 Months of Intense Use : r/ClaudeAI - Reddit

## Metadata
- **Category**: Claude Code / Generic
- **Source(s)**: 2. 25 Claude Code Tips from 11 Months of Intense Use : r/ClaudeAI - Reddit
- **Applicable to**: Anti-Gravity | Gemini CLI | Both
- **Priority**: Critical
- **Dependencies**: None
- **Date Implemented**: 2026-03-17

## Description
This source provides a collection of 25 advanced tips and strategies for maximizing the efficiency and productivity of Claude Code (and by extension, agentic IDEs like Anti-Gravity). It focuses on configuration, workflow optimization, and integration with other developer tools.

## Concept
The core concept is that agentic coding tools require a different mindset than traditional chat-based AI. Success comes from managing the "environment" (MCPs, project-specific rules, terminal integration) and the "context" (fresh chats, project summaries, system prompt patching) rather than just asking for code.

## Implementation

### Key Implementation Patterns

1. **Status Line Customization**: Implement a status line in the CLI that tracks token usage and project state.
2. **Global & Project Configuration**:
   - Use `~/.claude/config.json` for global aliases.
   - Use `project-root/CLAUDE.md` for project-specific rules.
3. **Handoff Mechanism**:
   - Maintain a `HANDOFF.md` or `SUMMARY.md` that keeps the "current state" of a task.
   - When context becomes too large, move the state to the file, start a fresh session, and read the state back.
4. **Tool Integration**:
   - Integrate with `gh` (GitHub CLI) for PR management.
   - Integrate with `Playwright` for automated UI verification.
5. **Context Management**:
   - Use the `/compact` command (or manual summarization) to shrink the conversation history.
   - Preference for text-based representations (Accessibility Trees, terminal logs) over visual snapshots (screenshots) to save tokens.

### Usage Examples
- **Fresh Session Strategy**: "I've reached 80% context. I will summarize our progress in `TASK_STATE.md`, start a fresh session, and have you read that file to continue."
- **Verification Loop**: "After implementing the UI component, use the Playwright MCP to navigate to the dev server and verify the button is clickable."

### Edge Cases
- **Large Codebases**: Use Tree-Sitter based indexing tools (mentioned in other sources) to help the agent navigate without reading every file.
- **Model Down/Limits**: Switch to Gemini CLI as a fallback for high-token research tasks.

## Integration Notes
- This skill integrates directly with the **Anti-Gravity** configuration system.
- Many of these tips assume the presence of **MCP Servers** (Firebase, GitHub, Playwright).

## Verification
- Verify that `CLAUDE.md` is respected by the agent in a new session.
- Verify that terminal integration (like `gh`) works within the agent's environment.

## References
- Source 2 from NotebookLM project.
- ykdojo's GitHub tutorial (Source 31).
