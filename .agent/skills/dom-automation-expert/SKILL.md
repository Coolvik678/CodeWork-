---
name: dom-automation-expert
description: Advanced DOM manipulation for modern web apps (React, Angular, Lit), native property setters, and synthetic event chains.
---

# DOM Automation Expert Skill

## Core Principles

1. **Native Value Setter Pattern**:
   - Modern frameworks (React, Angular) override HTMLInputElement and HTMLTextAreaElement value setters.
   - Use `Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(el, val)` followed by synthetic `input` and `change` events with `bubbles: true, composed: true`.

2. **Full Pointer & Mouse Event Chain**:
   - When programmatically clicking buttons in modern web apps, dispatch the complete user gesture sequence:
     `['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']` using `MouseEvent`.

3. **DOM Mutation Observation**:
   - Use `MutationObserver` or fast interval polling to detect newly rendered elements (e.g. image output cards) immediately.
