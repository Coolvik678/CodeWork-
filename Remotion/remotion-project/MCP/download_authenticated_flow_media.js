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
      console.log('Fetching authenticated Google Flow media directly inside Chrome session...');

      const downloadInBrowserScript = `
        (async () => {
          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          const all = getAllElements();
          const mediaImgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('media.getMediaUrlRedirect'));
          const srcs = Array.from(new Set(mediaImgs.map(i => i.src)));

          const results = [];
          for (let i = 0; i < srcs.length; i++) {
            try {
              const res = await fetch(srcs[i], { credentials: 'include' });
              const blob = await res.blob();
              const reader = new FileReader();
              const base64 = await new Promise(resolve => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
              });
              results.push({ index: i + 1, base64, size: blob.size });
            } catch (e) {
              results.push({ index: i + 1, error: e.message });
            }
          }
          return results;
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: downloadInBrowserScript, awaitPromise: true, returnByValue: true });
      const items = result.result.value || [];
      console.log(`Found ${items.length} downloaded items inside browser context!`);

      for (let item of items) {
        if (item.base64) {
          const numStr = String(item.index).padStart(2, '0');
          const base64Data = item.base64.replace(/^data:[^;]+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');

          const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
          const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

          fs.writeFileSync(publicPath, buffer);
          fs.writeFileSync(projectPath, buffer);
          console.log(`[${numStr}] SUCCESS! Downloaded FULL-RES Image (${buffer.length} bytes / ${item.size} bytes blob) -> ${publicPath}`);
        } else {
          console.error(`Item ${item.index} Error:`, item.error);
        }
      }

      console.log('\n=======================================================');
      console.log('ALL AUTHENTICATED FULL-RES GOOGLE FLOW IMAGES SAVED!');
      console.log('=======================================================');

      ws.close();
    });

  } catch (err) {
    console.error('Download Error:', err);
  }
}

run();
