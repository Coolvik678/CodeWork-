# Master Thumbnail Prompt Template & Design Specs

> 🔴 **STRICT MANDATE:** EVERY SINGLE IMAGE AND THUMBNAIL MUST BE GENERATED EXCLUSIVELY VIA GOOGLE FLOW (LABS.GOOGLE/FX/TOOLS/FLOW). DO NOT USE ANY LOCAL IMAGE GENERATION TOOL.

---

## Google Flow Master Vector Thumbnail System Prompt

**Format & Canvas:** High-resolution 16:9 wide-format YouTube video thumbnail (1920x1080 horizontal).

### 1. Visual Style & Reference Standard
- Clean, bold 2D vector cartoon animation style exactly matching `thumbnails/reference/ref1.jpg` through `ref4.jpg`.
- Characters feature smooth black vector outlines, circular white heads, expressive black facial features, and minimalist stick bodies.
- Backgrounds are clean, colorful, and flat-shaded (prehistoric sunset, dark night field, or cave interior).

### 2. Character Pose & Expression Blueprints
- **Dazed / Relaxed (ref3.jpg):** Stick figure sitting/lying down with half-closed eyes, red eyelids, peaceful smirk, holding smoking pipe or glowing plants.
- **Flustered / Embarrassed (ref2.jpg):** Stick figure scratching head with red blushes on cheeks and squiggly nervous mouth.
- **Amused / Laughing (ref2.jpg):** Stick figure with wide open laughing mouth, pointing arm.
- **Sleepy / Curious (ref1.jpg, ref4.jpg):** Stick figure resting on boulder or cave floor with wide curious eyes.

### 3. Typography & Text Overlay (CRITICAL)
- **Text Style:** Clean, ultra-bold rounded sans-serif font in ALL-CAPS (2 to 4 words max).
- **Text Color:** Bright electric yellow `#FFEE00` with a thick, heavy black outline stroke (`#000000`) for high contrast against any background.
- **Placement:** Spanned across the top center of the frame.
- **Example Hooks:** `HIGH ALL DAY`, `WHY CLOTHES?`, `WHY NOT ATTACK?`, `2 SLEEPS?`, `FIRST HIGH?`

### 4. Direct Google Flow Prompt Template

```
A high-resolution 16:9 horizontal YouTube video thumbnail in clean 2D vector cartoon stick figure illustration style. 

AT THE TOP CENTER OF THE FRAME: Large bold yellow text with a heavy black outline reads "[INSERT 2-4 WORD ALL CAPS HOOK]".

CHARACTER & SCENE: [Describe stick figure character pose, hair, and facial expression matching ref1.jpg to ref4.jpg].

BACKGROUND: [Describe simple high-contrast background: e.g. warm prehistoric sunset plain, dark night field with crescent moon, or cave interior]. 

STYLE MARKERS: Bold black vector outlines, solid flat color fills, clean 2D vector art, zero 3D textures, zero noise, high contrast 16:9 ratio.
```
