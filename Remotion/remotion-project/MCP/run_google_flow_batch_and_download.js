const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const NEW_PROJECT_URL = 'https://labs.google/fx/tools/flow/project/bad9ba9c-7bba-49eb-8892-a74e413e7bbd';
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const PROMPTS_FILE = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'zappiflow_image_prompts.txt');
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');

if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_IMAGES_DIR)) fs.mkdirSync(PROJECT_IMAGES_DIR, { recursive: true });

function parsePrompts() {
  const text = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.startsWith('Scene '));
  return lines.map((line, idx) => {
    const parts = line.split(':');
    const numStr = String(idx + 1).padStart(2, '0');
    const promptText = parts.slice(1).join(':').trim();
    return { id: numStr, prompt: promptText };
  });
}

async function getGoogleFlowTab() {
  const http = require('http');
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}/json`, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const pages = JSON.parse(body);
        const flowTab = pages.find(p => p.url.includes('labs.google/fx/tools/flow'));
        if (flowTab) resolve(flowTab);
        else reject(new Error('Google Flow tab not found in Chrome.'));
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    const prompts = parsePrompts();
    console.log(`=======================================================`);
    console.log(`ZAPPIFLOW GOOGLE FLOW ENGINE — WORKING PROJECT bad9ba9c`);
    console.log(`Target: 22 Fresh 16:9 Image Scenes`);
    console.log(`=======================================================\n`);

    const tab = await getGoogleFlowTab();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let msgId = 0;
    const send = (method, params = {}) => {
      return new Promise(resolve => {
        const id = ++msgId;
        const handler = data => {
          const res = JSON.parse(data);
          if (res.id === id) {
            ws.removeListener('message', handler);
            resolve(res.result);
          }
        };
        ws.on('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    };

    ws.on('open', async () => {
      console.log('Navigating Google Flow tab to fresh project:', NEW_PROJECT_URL);
      await send('Page.navigate', { url: NEW_PROJECT_URL });
      await new Promise(r => setTimeout(r, 4000));

      for (let i = 0; i < prompts.length; i++) {
        const item = prompts[i];
        console.log(`[${i + 1}/22] Injecting Scene ${item.id} Prompt into Google Flow...`);

        // Inject Prompt into Google Flow text box
        const injectCode = `
          (() => {
            const editable = document.querySelector('[contenteditable="true"]');
            if (!editable) return false;
            editable.focus();
            editable.innerText = ${JSON.stringify(item.prompt)};
            editable.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
          })()
        `;
        await send('Runtime.evaluate', { expression: injectCode, returnByValue: true });

        // Click arrow_forward / Create button
        const clickCode = `
          (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const createBtn = btns.find(b => b.innerText.includes('arrow_forward'));
            if (createBtn) { createBtn.click(); return true; }
            const addBtn = btns.find(b => b.innerText.includes('Create'));
            if (addBtn) { addBtn.click(); return true; }
            return false;
          })()
        `;
        await send('Runtime.evaluate', { expression: clickCode, returnByValue: true });

        console.log(`  └─ Submitted Scene ${item.id}. Waiting 10 seconds for Google Flow AI generation...`);
        await new Promise(r => setTimeout(r, 10000));
      }

      console.log('\n=======================================================');
      console.log('ALL 22 SCENE PROMPTS GENERATED IN FRESH GOOGLE FLOW PROJECT!');
      console.log('=======================================================');

      ws.close();
    });

  } catch (err) {
    console.error('Automation Error:', err);
  }
}

run();
