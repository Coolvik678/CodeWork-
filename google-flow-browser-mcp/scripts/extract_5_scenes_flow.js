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

async function run() {
  console.log(`=======================================================`);
  console.log(`EXTRACTING 5 GENERATED SCENE IMAGES FROM GOOGLE FLOW`);
  console.log(`=======================================================\n`);

  try {
    const userDataDir = path.join(process.env.USERPROFILE || process.env.HOME, '.gemini', 'chrome_flow_mcp_profile');
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--remote-debugging-port=9222', '--no-sandbox']
    });

    const page = context.pages()[0] || await context.newPage();
    await page.goto('https://labs.google/fx/tools/flow/project/bad9ba9c-7bba-49eb-8892-a74e413e7bbd', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);

    // Scroll down to load all generated image cards
    await page.evaluate(async () => {
      for (let i = 0; i < 15; i++) {
        window.scrollBy(0, 800);
        await new Promise(r => setTimeout(r, 200));
      }
      window.scrollTo(0, 0);
    });

    const renders = await page.evaluate(async () => {
      function getAllElements(root = document) {
        let els = Array.from(root.querySelectorAll('*'));
        for (let el of els) {
          if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
        }
        return els;
      }

      const all = getAllElements();
      const mediaImgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('media.getMediaUrlRedirect'));
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const results = [];

      for (let i = 0; i < mediaImgs.length; i++) {
        const img = mediaImgs[i];
        canvas.width = img.naturalWidth || img.width || 1376;
        canvas.height = img.naturalHeight || img.height || 768;
        try {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          results.push({ dataUrl: canvas.toDataURL('image/jpeg', 0.95), width: canvas.width, height: canvas.height });
        } catch (e) {
          results.push({ error: e.message });
        }
      }
      return results;
    });

    console.log(`Extracted ${renders.length} generated scene image renders!`);

    for (let i = 0; i < Math.min(5, renders.length); i++) {
      const item = renders[i];
      if (item.dataUrl) {
        const numStr = String(i + 1).padStart(2, '0');
        const base64Data = item.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
        const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

        fs.writeFileSync(publicPath, buffer);
        fs.writeFileSync(projectPath, buffer);
        console.log(`[${numStr}] Saved UNIQUE Scene Image (${item.width}x${item.height}, ${buffer.length} bytes) -> ${publicPath}`);
      }
    }

    await context.close();
  } catch (err) {
    console.error(err);
  }
}

run();
