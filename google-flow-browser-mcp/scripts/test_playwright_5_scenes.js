import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_VIDEO2_DIR = path.resolve(__dirname, '../../Remotion/remotion-project/public/video2');
const PROJECT_IMAGES_DIR = path.resolve(__dirname, '../../Remotion/videos/how_did_ancient_humans_become_asian/images');

if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_IMAGES_DIR)) fs.mkdirSync(PROJECT_IMAGES_DIR, { recursive: true });

const PROMPTS = [
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character staring closely at his glowing stick hand under bright sunlight, simple 2D background, wide 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character wearing sunglasses pointing angrily up at a giant laughing yellow cartoon Sun, high contrast 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, group of caveman stickmen walking across a prehistoric savanna under intense solar rays, wide 16:9 landscape.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, funny stickman inspecting a large globe map with a giant magnifying glass, question marks above his head, 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, stickman character wrapped inside a glowing protective dark shield aura blocking purple UV laser bolts, 16:9 framing."
];

async function run() {
  console.log(`=======================================================`);
  console.log(`GOOGLE FLOW MCP PLAYWRIGHT ENGINE — 5 UNIQUE TEST SCENES`);
  console.log(`=======================================================\n`);

  try {
    const userDataDir = path.join(process.env.USERPROFILE || process.env.HOME, '.gemini', 'chrome_flow_mcp_profile');
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--remote-debugging-port=9222', '--no-sandbox']
    });

    const page = context.pages()[0] || await context.newPage();
    console.log('Navigating to Google Flow project page...');
    await page.goto('https://labs.google/fx/tools/flow/project/bad9ba9c-7bba-49eb-8892-a74e413e7bbd', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);

    console.log('Project Page Loaded. Title:', await page.title());

    const savedFiles = [];

    for (let i = 0; i < PROMPTS.length; i++) {
      const numStr = String(i + 1).padStart(2, '0');
      const promptText = PROMPTS[i];
      console.log(`\n[${i + 1}/5] Generating Scene ${numStr}...`);
      console.log(`  Prompt: "${promptText.slice(0, 75)}..."`);

      // 1. Inject Prompt into Google Flow contenteditable box
      await page.evaluate((text) => {
        const editable = document.querySelector('[contenteditable="true"]');
        if (editable) {
          editable.focus();
          editable.innerText = text;
          editable.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, promptText);

      // 2. Click arrow_forward / Create button
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const createBtn = btns.find(b => b.innerText.includes('arrow_forward'));
        if (createBtn) { createBtn.click(); return; }
        const addBtn = btns.find(b => b.innerText.includes('Create'));
        if (addBtn) addBtn.click();
      });

      console.log(`  └─ Submitted Scene ${numStr}. Waiting 12 seconds for Google Flow AI generation...`);
      await page.waitForTimeout(12000);

      // 3. Extract generated image render via canvas drawing
      const renderObj = await page.evaluate(() => {
        function getAllElements(root = document) {
          let els = Array.from(root.querySelectorAll('*'));
          for (let el of els) {
            if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
          }
          return els;
        }

        const all = getAllElements();
        const mediaImgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('media.getMediaUrlRedirect'));
        if (mediaImgs.length === 0) return null;

        const latestImg = mediaImgs[mediaImgs.length - 1];
        const canvas = document.createElement('canvas');
        canvas.width = latestImg.naturalWidth || latestImg.width || 1376;
        canvas.height = latestImg.naturalHeight || latestImg.height || 768;
        const ctx = canvas.getContext('2d');
        try {
          ctx.drawImage(latestImg, 0, 0, canvas.width, canvas.height);
          return { dataUrl: canvas.toDataURL('image/jpeg', 0.95), width: canvas.width, height: canvas.height };
        } catch (e) {
          return { error: e.message };
        }
      });

      if (renderObj && renderObj.dataUrl) {
        const base64Data = renderObj.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
        const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

        fs.writeFileSync(publicPath, buffer);
        fs.writeFileSync(projectPath, buffer);
        savedFiles.push({ file: `${numStr}.jpg`, sizeBytes: buffer.length, dimensions: `${renderObj.width}x${renderObj.height}` });
        console.log(`  └─ SUCCESS! Saved Unique Scene ${numStr}.jpg (${renderObj.width}x${renderObj.height}, ${buffer.length} bytes)`);
      } else {
        console.log(`  └─ Scene ${numStr} submitted to Google Flow gallery.`);
      }
    }

    console.log('\n=======================================================');
    console.log('SUMMARY OF 5 UNIQUE GENERATED HD SCENE IMAGES:');
    console.log('=======================================================');
    console.table(savedFiles);

    await context.close();
  } catch (err) {
    console.error('Playwright Error:', err);
  }
}

run();
