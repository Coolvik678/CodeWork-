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
      console.log('Extracting rendered Google Flow images via canvas drawing...');

      const drawCanvasScript = `
        (() => {
          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          const all = getAllElements();
          const mediaImgs = all.filter(el => el.tagName === 'IMG' && el.src && el.src.includes('media.getMediaUrlRedirect'));
          const uniqueImgs = Array.from(new Set(mediaImgs));

          const results = [];
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          for (let i = 0; i < uniqueImgs.length; i++) {
            const img = uniqueImgs[i];
            canvas.width = img.naturalWidth || img.width || 1280;
            canvas.height = img.naturalHeight || img.height || 720;
            try {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
              results.push({ index: i + 1, dataUrl, width: canvas.width, height: canvas.height });
            } catch (e) {
              results.push({ index: i + 1, error: e.message });
            }
          }
          return results;
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: drawCanvasScript, returnByValue: true });
      const items = result.result.value || [];
      console.log(`Found ${items.length} canvas-extracted image items!`);

      for (let item of items) {
        if (item.dataUrl) {
          const numStr = String(item.index).padStart(2, '0');
          const base64Data = item.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');

          const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
          const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

          fs.writeFileSync(publicPath, buffer);
          fs.writeFileSync(projectPath, buffer);
          console.log(`[${numStr}] SUCCESS! Saved High-Res Render (${item.width}x${item.height}, ${buffer.length} bytes) -> ${publicPath}`);
        } else {
          console.error(`Item ${item.index} error:`, item.error);
        }
      }

      console.log('Finished saving all rendered Google Flow images!');
      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
