const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');
const THUMBNAIL_PATH = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'thumbnail.png');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
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
      console.log('Capturing viewport screenshot of Google Flow session...');

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      if (screenshot && screenshot.data) {
        const buffer = Buffer.from(screenshot.data, 'base64');
        const testPath = path.join(IMAGES_DIR, 'flow_viewport_capture.png');
        fs.writeFileSync(testPath, buffer);
        fs.writeFileSync(THUMBNAIL_PATH, buffer);
        console.log('Successfully captured viewport screenshot to:', testPath);
      }

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
