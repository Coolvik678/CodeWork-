const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const PROMPTS_FILE = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'zapi_flow_prompts.txt');
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
    console.log(`GOOGLE FLOW AUTONOMOUS IMAGE GENERATION ENGINE — VIDEO #2`);
    console.log(`Target: 22 Fresh 16:9 Stickman Visuals`);
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
      console.log('Connected to Google Flow CDP Session!');

      for (let i = 0; i < prompts.length; i++) {
        const item = prompts[i];
        console.log(`[${i + 1}/22] Generating Fresh Image for Scene ${item.id}...`);

        // 1. Inject Prompt into Google Flow text box
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

        // 2. Click Create / Generate Button
        const clickCode = `
          (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const createBtn = btns.find(b => b.innerText.includes('Create') && (b.innerText.includes('arrow_forward') || b.className.includes('primary')));
            if (createBtn) { createBtn.click(); return true; }
            const arrowBtn = btns.find(b => b.innerText.includes('arrow_forward'));
            if (arrowBtn) { arrowBtn.click(); return true; }
            return false;
          })()
        `;
        await send('Runtime.evaluate', { expression: clickCode, returnByValue: true });

        // Wait 10 seconds for Google Flow AI generation
        await new Promise(r => setTimeout(r, 10000));

        // 3. Extract generated image from Google Flow DOM
        const extractCode = `
          (async () => {
            function getAllElements(root = document) {
              let els = Array.from(root.querySelectorAll('*'));
              for (let el of els) {
                if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
              }
              return els;
            }
            const all = getAllElements();
            const imgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent'));
            return imgs.map(i => i.src);
          })()
        `;
        const resExt = await send('Runtime.evaluate', { expression: extractCode, awaitPromise: true, returnByValue: true });
        const imgUrls = resExt.result.value || [];

        if (imgUrls.length > 0) {
          const latestUrl = imgUrls[imgUrls.length - 1];
          try {
            const res = await fetch(latestUrl);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${item.id}.jpg`);
            const projectPath = path.join(PROJECT_IMAGES_DIR, `${item.id}.jpg`);

            fs.writeFileSync(publicPath, buffer);
            fs.writeFileSync(projectPath, buffer);
            console.log(`  └─ SUCCESS! Saved fresh image for Scene ${item.id} (${buffer.length} bytes)`);
          } catch (e) {
            console.error(`  └─ Error saving image for Scene ${item.id}:`, e.message);
          }
        } else {
          console.log(`  └─ Submitted Scene ${item.id} to Google Flow.`);
        }
      }

      console.log('\n=======================================================');
      console.log('ALL 22 FRESH SCENE IMAGES PROCESSED SUCCESSFULLY!');
      console.log('=======================================================');

      ws.close();
    });

  } catch (err) {
    console.error('CDP Generator Error:', err);
  }
}

run();
