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

const UNIQUE_PROMPTS = [
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character staring closely at his glowing stick hand under bright sunlight, simple 2D background, wide 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character wearing sunglasses pointing angrily up at a giant laughing yellow cartoon Sun, high contrast 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, group of caveman stickmen walking across a prehistoric savanna under intense solar rays, wide 16:9 landscape.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, funny stickman inspecting a large globe map with a giant magnifying glass, question marks above his head, 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, stickman character wrapped inside a glowing protective dark shield aura blocking purple UV laser bolts, 16:9 framing."
];

async function run() {
  console.log(`=======================================================`);
  console.log(`GOOGLE FLOW MCP — 5 UNIQUE SCENE GENERATION ENGINE`);
  console.log(`=======================================================\n`);

  let browser;
  try {
    // Connect to CDP if available, otherwise launch
    try {
      browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
      console.log('Connected to running Chrome via CDP port 9222!');
    } catch {
      console.log('CDP port 9222 not active. Launching persistent Chrome context...');
      const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
      browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        channel: 'chrome',
        args: ['--remote-debugging-port=9222', '--no-sandbox']
      });
    }

    const pages = browser.pages ? browser.pages() : browser.contexts()[0].pages();
    let page = pages.find(p => p.url().includes('labs.google/fx/tools/flow'));

    if (!page) {
      page = pages[0] || await (browser.newPage ? browser.newPage() : browser.contexts()[0].newPage());
      console.log('Navigating to Google Flow...');
      await page.goto('https://labs.google/fx/tools/flow', { waitUntil: 'domcontentloaded' });
    } else {
      console.log('Found active Google Flow tab:', page.url());
    }

    await page.waitForTimeout(2000);

    // If on main page, click "+ New project"
    if (!page.url().includes('/project/')) {
      console.log('Clicking "+ New project" button...');
      const newProjBtn = page.locator('button:has-text("New project"), div:has-text("New project")').first();
      if (await newProjBtn.isVisible().catch(() => false)) {
        await newProjBtn.click();
        await page.waitForTimeout(4000);
      }
    }

    console.log('Active Flow Project URL:', page.url());

    const results = [];

    for (let i = 0; i < UNIQUE_PROMPTS.length; i++) {
      const numStr = String(i + 1).padStart(2, '0');
      const promptText = UNIQUE_PROMPTS[i];
      console.log(`\n[${i + 1}/5] Generating Scene ${numStr}...`);
      console.log(`  Prompt: "${promptText.slice(0, 75)}..."`);

      // 1. Inject Prompt
      await page.evaluate((text) => {
        const editable = document.querySelector('[contenteditable="true"]');
        if (editable) {
          editable.focus();
          editable.innerText = text;
          editable.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, promptText);

      await page.waitForTimeout(500);

      // 2. Click Create / arrow_forward button
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const createBtn = btns.find(b => b.innerText.includes('arrow_forward'));
        if (createBtn) { createBtn.click(); return; }
        const addBtn = btns.find(b => b.innerText.includes('Create'));
        if (addBtn) addBtn.click();
      });

      console.log(`  └─ Submitted Scene ${numStr}. Waiting 12s for AI generation...`);
      await page.waitForTimeout(12000);

      // 3. Extract High-Res Canvas Render
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
        results.push({ scene: numStr, file: `${numStr}.jpg`, sizeBytes: buffer.length, dimensions: `${renderObj.width}x${renderObj.height}` });
        console.log(`  └─ SUCCESS! Saved Scene ${numStr}.jpg (${renderObj.width}x${renderObj.height}, ${buffer.length} bytes)`);
      } else {
        console.log(`  └─ Scene ${numStr} submitted.`);
      }
    }

    console.log('\n=======================================================');
    console.log('SUMMARY OF GENERATED UNIQUE TEST IMAGES:');
    console.log('=======================================================');
    console.table(results);

  } catch (err) {
    console.error('Execution Error:', err.message);
  }
}

run();
