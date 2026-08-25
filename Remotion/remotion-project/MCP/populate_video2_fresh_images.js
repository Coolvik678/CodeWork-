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
      console.log('Extracting fresh images from Google Flow DOM...');

      const extractScript = `
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
          const uniqueSrcs = Array.from(new Set(imgs.map(i => i.src)));
          return uniqueSrcs;
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: extractScript, awaitPromise: true, returnByValue: true });
      const srcs = result.result.value || [];
      console.log(`Found ${srcs.length} generated Google Flow images in DOM.`);

      for (let i = 0; i < 22; i++) {
        const numStr = String(i + 1).padStart(2, '0');
        const targetPublic = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
        const targetProject = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

        if (i < srcs.length) {
          try {
            const res = await fetch(srcs[i]);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            fs.writeFileSync(targetPublic, buffer);
            fs.writeFileSync(targetProject, buffer);
            console.log(`[${numStr}] Saved fresh image from Google Flow (${buffer.length} bytes)`);
            continue;
          } catch (e) {
            console.error(`Failed to fetch image ${i + 1}:`, e.message);
          }
        }
      }

      console.log('Finished updating public/video2/ images!');
      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
