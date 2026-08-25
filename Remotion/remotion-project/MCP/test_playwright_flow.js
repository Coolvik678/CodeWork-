const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');
if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });

const PROMPTS = [
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character staring closely at his glowing stick hand under bright sunlight, simple 2D background, wide 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character wearing sunglasses pointing angrily up at a giant laughing yellow cartoon Sun, high contrast 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, group of caveman stickmen walking across a prehistoric savanna under intense solar rays, wide 16:9 landscape.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, funny stickman inspecting a large globe map with a giant magnifying glass, question marks above his head, 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, stickman character wrapped inside a glowing protective dark shield aura blocking purple UV laser bolts, 16:9 framing."
];

async function run() {
  console.log(`=======================================================`);
  console.log(`PLAYWRIGHT GOOGLE FLOW ENGINE — 5 UNIQUE TEST SCENES`);
  console.log(`=======================================================\n`);

  try {
    const userDataDir = path.join(process.env.USERPROFILE, '.gemini', 'chrome_playwright_profile');
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--remote-debugging-port=9222', '--no-sandbox']
    });

    const page = context.pages()[0] || await context.newPage();
    console.log('Navigating to Google Flow...');
    await page.goto('https://labs.google/fx/tools/flow', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    console.log('Google Flow Page Title:', await page.title());
    await context.close();
  } catch (err) {
    console.error('Playwright Error:', err.message);
  }
}

run();
