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
      console.log('Inspecting all media cards and background images in Google Flow...');

      const dumpCardsScript = `
        (async () => {
          const allEls = Array.from(document.querySelectorAll('*'));
          const mediaUrls = [];

          for (let el of allEls) {
            const bg = getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('url(')) {
              const cleaned = bg.replace(/^url\\(['"]?/, '').replace(/['"]?\\)$/, '');
              if (cleaned.startsWith('http') || cleaned.startsWith('blob')) {
                mediaUrls.push(cleaned);
              }
            }
            if (el.src && (el.src.startsWith('http') || el.src.startsWith('blob'))) {
              mediaUrls.push(el.src);
            }
          }

          const unique = Array.from(new Set(mediaUrls));
          return {
            totalElements: allEls.length,
            uniqueMediaUrls: unique
          };
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: dumpCardsScript, awaitPromise: true, returnByValue: true });
      console.log('Media Cards Result:', JSON.stringify(result.result.value, null, 2));

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
