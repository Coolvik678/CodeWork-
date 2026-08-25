const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');

if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });

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
      console.log('Scrolling Google Flow session to trigger lazy-loaded images...');

      const scrollAndExtractScript = `
        (async () => {
          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          // Scroll down step by step
          const container = document.querySelector('[class*="scroll"], [class*="content"]') || window;
          for (let i = 0; i < 20; i++) {
            window.scrollBy(0, 800);
            await new Promise(r => setTimeout(r, 400));
          }
          window.scrollTo(0, 0);

          const all = getAllElements();
          const imgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent'));
          
          const uniqueSrcs = Array.from(new Set(imgs.map(i => i.src)));
          return uniqueSrcs;
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: scrollAndExtractScript, awaitPromise: true, returnByValue: true });
      const imageSrcs = result.result.value || [];
      console.log(`Extracted ${imageSrcs.length} unique Google Flow image URLs!`);

      for (let i = 0; i < imageSrcs.length; i++) {
        const src = imageSrcs[i];
        const numStr = String(i + 1).padStart(2, '0');
        try {
          const res = await fetch(src);
          const arrayBuffer = await res.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const projectPath = path.join(IMAGES_DIR, `${numStr}.jpg`);
          const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);

          fs.writeFileSync(projectPath, buffer);
          fs.writeFileSync(publicPath, buffer);
          console.log(`[${numStr}] Extracted Video #2 image -> ${projectPath} (${buffer.length} bytes)`);
        } catch (e) {
          console.error(`Failed to download image ${i + 1}:`, e.message);
        }
      }

      ws.close();
    });

  } catch (err) {
    console.error('Extraction Error:', err);
  }
}

run();
