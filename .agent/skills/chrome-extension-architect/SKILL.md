---
name: chrome-extension-architect
description: Master Manifest V3 Chrome extension architecture, Shadow DOM in-page UI injection, and background service workers.
---

# Chrome Extension Architect Skill

## Core Principles

1. **In-Page Persistent Overlay UI**:
   - Rather than relying on Chrome action popups (which close on click/blur) or side panels (which compress the layout), inject a floating container (`#flowing-images-host`) directly into the target page using **Shadow DOM** (`element.attachShadow({ mode: 'open' })`).
   - Shadow DOM isolates extension CSS and prevents target page styles from polluting the extension interface.

2. **Single-Context Execution**:
   - Running the UI and DOM automation engine in the content script context eliminates inter-process message passing latency (`sendMessage` / `onMessage`).

3. **Background Service Worker Role**:
   - Offload heavy storage operations, file downloads via `chrome.downloads`, and global background queue persistence to `service_worker.js`.
