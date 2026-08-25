const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const DOWNLOADS_DIR = 'C:/Users/myovi/Downloads';
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', 'how_did_ancient_humans_become_asian', 'images');

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
    console.log('Connected to Google Flow tab:', tab.title);
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
      console.log('Locating all download/export options in Google Flow project canvas...');

      const downloadAllScript = `
        (async () => {
          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          const all = getAllElements();
          const btns = all.filter(el => {
            const txt = (el.innerText || el.getAttribute('aria-label') || el.title || '').toLowerCase();
            return txt.includes('download') || txt.includes('export') || txt.includes('save image');
          });

          return btns.map((b, i) => ({
            index: i,
            text: b.innerText || b.getAttribute('aria-label') || b.title,
            tag: b.tagName
          }));
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: downloadAllScript, awaitPromise: true, returnByValue: true });
      console.log('Download Buttons Found:', JSON.stringify(result.result.value, null, 2));

      ws.close();
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

run();
