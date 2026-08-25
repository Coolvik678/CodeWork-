---
name: robust-rate-limiter
description: Rate limit detection, exponential backoff, pause/resume state machine, and error recovery.
---

# Robust Rate Limiter Skill

## Core Principles

1. **Popup & DOM Banner Detection**:
   - Monitor DOM for rate limit strings (`Unusual activity`, `Too many requests`, `Rate limit`).

2. **Auto Pause & Exponential Backoff**:
   - Pause queue automatically when rate limit is detected to protect account quota.
   - Provide manual "Fix Unusual Activity" / "Retry" button in UI.
