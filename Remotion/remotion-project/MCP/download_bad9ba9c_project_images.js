const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');

if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_IMAGES_DIR)) fs.mkdirSync(PROJECT_IMAGES_DIR, { recursive: true });

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
    console.log('Connected to Google Flow project tab:', tab.url);
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
      console.log('Extracting all generated images from project bad9ba9c...');

      // Scroll page down and extract all valid generated image URLs
      const extractScript = `
        (async () => {
          for (let i = 0; i < 20; i++) {
            window.scrollBy(0, 800);
            await new Promise(r => setTimeout(r, 200));
          }
          window.scrollTo(0, 0);

          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          const all = getAllElements();
          const imgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent') && !el.src.includes('s96-c'));
          return Array.from(new Set(imgs.map(i => i.src)));
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: extractScript, awaitPromise: true, returnByValue: true });
      const srcs = result.result.value || [];
      console.log(`Found ${srcs.length} unique Google Flow generated image URLs!`);

      for (let i = 0; i < srcs.length; i++) {
        const numStr = String(i + 1).padStart(2, '0');
        const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
        const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

        try {
          const res = await fetch(srcs[i]);
          const arrayBuffer = await res.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          fs.writeFileSync(publicPath, buffer);
          fs.writeFileSync(projectPath, buffer);
          console.log(`[${numStr}] Successfully downloaded image (${buffer.length} bytes) -> ${publicPath}`);
        } catch (e) {
          console.error(`Failed to download image ${i + 1}:`, e.message);
        }
      }

      console.log('\nFinished downloading Google Flow project images!');
      ws.close();
    });

  } catch (err) {
    console.error('Download Error:', err);
  }
}

run();
