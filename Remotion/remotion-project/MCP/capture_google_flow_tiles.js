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
    console.log('Connecting to Google Flow tab:', tab.title);
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
      console.log('Extracting all generated Google Flow project media...');

      // 1. Scroll through page to load all generated image cards
      const scrollScript = `
        (async () => {
          for (let i = 0; i < 15; i++) {
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
          const imgs = all.filter(el => el.tagName === 'IMG' && el.src);
          const urls = imgs.map(i => i.src);
          return Array.from(new Set(urls));
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: scrollScript, awaitPromise: true, returnByValue: true });
      const imageSrcs = result.result.value || [];
      console.log(`Found ${imageSrcs.length} total image URLs in DOM!`);

      // Filter valid image URLs
      const validSrcs = imageSrcs.filter(src => src.includes('googleusercontent') || src.startsWith('blob:') || src.startsWith('data:'));
      console.log(`Filtered ${validSrcs.length} valid Google Flow generated image URLs.`);

      // Save images for Scenes 01 to 22
      for (let i = 0; i < 22; i++) {
        const numStr = String(i + 1).padStart(2, '0');
        const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
        const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

        if (i < validSrcs.length) {
          const src = validSrcs[i];
          try {
            if (src.startsWith('data:')) {
              const base64 = src.split(',')[1];
              const buf = Buffer.from(base64, 'base64');
              fs.writeFileSync(publicPath, buf);
              fs.writeFileSync(projectPath, buf);
              console.log(`[${numStr}] Saved data URL image (${buf.length} bytes)`);
            } else {
              const res = await fetch(src);
              const arrayBuffer = await res.arrayBuffer();
              const buf = Buffer.from(arrayBuffer);
              fs.writeFileSync(publicPath, buf);
              fs.writeFileSync(projectPath, buf);
              console.log(`[${numStr}] Saved fetched image (${buf.length} bytes)`);
            }
            continue;
          } catch (e) {
            console.error(`Failed to save image ${i + 1}:`, e.message);
          }
        }
      }

      console.log('Finished saving images to public/video2/!');
      ws.close();
    });

  } catch (err) {
    console.error('Extraction Error:', err);
  }
}

run();
