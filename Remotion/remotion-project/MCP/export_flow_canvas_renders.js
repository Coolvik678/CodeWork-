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
      console.log('Extracting Canvas & WebGL renders from Google Flow session...');

      const dumpCanvasScript = `
        (async () => {
          const canvases = Array.from(document.querySelectorAll('canvas'));
          const dataUrls = [];
          
          for (let c of canvases) {
            try {
              const url = c.toDataURL('image/jpeg', 0.95);
              if (url.length > 5000) dataUrls.push({ width: c.width, height: c.height, url });
            } catch (e) {}
          }
          return dataUrls;
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: dumpCanvasScript, awaitPromise: true, returnByValue: true });
      const renders = result.result.value || [];
      console.log(`Found ${renders.length} active canvas image renders!`);

      renders.forEach((r, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        const base64Data = r.url.replace(/^data:image\/jpeg;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
        const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

        fs.writeFileSync(publicPath, buffer);
        fs.writeFileSync(projectPath, buffer);
        console.log(`[${numStr}] Saved Canvas Render (${r.width}x${r.height}, ${buffer.length} bytes)`);
      });

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
