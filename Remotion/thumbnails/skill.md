# Skill Definition: Stick Figure Thumbnail Automation & Deployment

> 🔴 **STRICT MANDATE:** EVERY IMAGE AND THUMBNAIL MUST BE GENERATED EXCLUSIVELY VIA GOOGLE FLOW (LABS.GOOGLE/FX/TOOLS/FLOW). LOCAL AI IMAGE GENERATORS ARE STRICTLY FORBIDDEN.

## 4-Step Thumbnail Automation Protocol
1. **PROMPT CONSTRUCT:** Construct a CTR-optimized thumbnail prompt based on `thumbnails/prompt.md` and reference images `thumbnails/reference/ref1.jpg` through `ref4.jpg`.
2. **GOOGLE FLOW GENERATION:** Open Google Flow (`labs.google/fx/tools/flow`) via browser automation tools (with Zapiwala AI extension), navigate to the `Thumbnail` project, and batch generate thumbnails (`quantity: 4`).
3. **RETRY ON FAILURE:** If generation fails or output is low quality, adjust prompt parameters and regenerate until thumbnail is crisp.
4. **THUMBNAIL DEPLOYMENT:** Save final thumbnail image directly to `Remotion/videos/<video_slug>/thumbnail.png`.

## Core Competencies

### 1. Visual Reference Compliance
- Reference `thumbnails/reference/ref1.jpg` through `ref4.jpg` for character proportions, vector line thickness, and color vibrancy.
- Signature character expressions:
  - **Dazed / High (ref3.jpg):** Half-closed eyes, red eyelids, relaxed pose.
  - **Flustered (ref2.jpg):** Red cheek blushes, sweat drop, squiggly mouth.
  - **Laughing (ref2.jpg):** Wide open mouth, pointing stick arm.
  - **Curious (ref1.jpg, ref4.jpg):** Wide circular eyes, tilted head.

### 2. Typography & Headline Hooks
- Headline text MUST be 2 to 4 words in ALL-CAPS (`HIGH ALL DAY`, `WHY CLOTHES?`, `WHY NOT ATTACK?`, `2 SLEEPS?`).
- Text MUST be bright electric yellow `#FFEE00` with heavy black outline stroke placed across top center.

### 3. File Management & Organization
- Saved as `Remotion/videos/<video_slug>/thumbnail.png`.
