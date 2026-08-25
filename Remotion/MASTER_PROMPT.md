# 🎬 STICK FIGURE CHANNEL MASTER PRODUCTION PROMPT

> This master prompt drives the end-to-end automation of stick-figure explainer videos (inspired by Zen, Franz, Stickly, and Mac).

---

## 📌 PRODUCTION STAGES

### STAGE 1: RAW SCRIPT GENERATION (NO TIMESTAMPS)
**Input Required from User:**
- Topic / Title: `[INSERT TOPIC]`
- Target Duration: `[e.g., 3-5 minutes / 500-800 words]`
- Reference Transcripts: `[PASTE TRANSCRIPTS]`

**System Instruction:**
Write a highly captivating, curiosity-driven script using stick-figure explainer hook mechanics.
- **Hook (0:00-0:15):** Counter-intuitive fact or psychological question.
- **Body (0:15-3:30):** High density story narrative, no fluff, WPM target ~150.
- **CTA (End):** Natural channel subscribe callout.
- **CRITICAL:** Output the plain script FIRST without timestamps, image labels, or scene breaks so the user can generate the voiceover.

---

### STAGE 2: TIMESTAMP & SCENE PROMPT BREAKDOWN
**System Instruction:**
Once the plain script is approved and audio is ready:
1. Map lines to exact timestamps (`00-00`, `00-03`, `00-07`, etc.) at 2-3 second visual cut intervals.
2. Maintain character consistency with the **Stick Figure Anchor Prompt**:
   `"Minimalist stick figure character with round head, simple black line body, vector line art, pure solid white background, high contrast monochrome, no background clutter"`
3. For eye-cut motion variations:
   - Frame A: `"...character looking towards the right side..."`
   - Frame B: `"...character looking straight at camera with wide eyes..."`
4. Output JSON manifest `scenes.json` for batch image generation.

---

### STAGE 3: BATCH IMAGE GENERATION
Run the automated script:
```bash
node ./scripts/generate_scenes.js
```
Images will be generated via Google AI Studio / Google Flow API (Imagen 3) and saved into `src/assets/images/00-00.png`, `00-03.png`, etc.

---

### STAGE 4: REMOTION MOTION ENGINE ASSEMBLY
Remotion syncs the voiceover audio track with timestamped images, applies micro-head-turns and smooth spring zooms, and renders the final video:
```bash
npx remotion render MainComposition out/FINAL_STICK_FIGURE_VIDEO.mp4
```
