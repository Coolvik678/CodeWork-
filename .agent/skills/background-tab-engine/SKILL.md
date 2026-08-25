---
name: background-tab-engine
description: Non-throttled queue loops, state persistence, and background downloads for browser extensions.
---

# Background Tab Engine Skill

## Core Principles

1. **Service Worker State Engine**:
   - Maintain queue status, active index, and prompt lists in `chrome.storage.local`.

2. **Auto Download Management**:
   - Save rendered images directly using `chrome.downloads.download` into configured target subfolders (e.g. `flowing_images/`).

3. **Background Unthrottled Execution**:
   - Keep execution active when target tab is unfocused or window is minimized.
