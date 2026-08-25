const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'why_were_ancient_humans_black';
const PUBLIC_VIDEO3_DIR = path.join(__dirname, '..', 'public', 'video3');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');

if (!fs.existsSync(PUBLIC_VIDEO3_DIR)) fs.mkdirSync(PUBLIC_VIDEO3_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_IMAGES_DIR)) fs.mkdirSync(PROJECT_IMAGES_DIR, { recursive: true });

async function getGoogleFlowTab() {
  const http = require('http');
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}/json`, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const flowTab = pages.find(p => p.url.includes('labs.google/fx/tools/flow/project'));
          if (flowTab) resolve(flowTab);
          else reject(new Error('Google Flow project tab not found in Chrome CDP.'));
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`=======================================================`);
  console.log(`ZAPPIFLOW EXTRACTOR FOR ACTIVE LIVE PROJECT`);
  console.log(`=======================================================\n`);

  try {
    const tab = await getGoogleFlowTab();
    console.log('Connected to Active Google Flow Project Tab:', tab.url);
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
      // Extract all media.getMediaUrlRedirect images currently in DOM
      const extractCode = `
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
          
          return mediaImgs.map(img => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || 1376;
            canvas.height = img.naturalHeight || 768;
            const ctx = canvas.getContext('2d');
            try {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              return {
                dataUrl: canvas.toDataURL('image/jpeg', 0.95),
                width: canvas.width,
                height: canvas.height,
                src: img.src
              };
            } catch (e) {
              return { error: e.message, src: img.src };
            }
          });
        })()
      `;

      const res = await send('Runtime.evaluate', { expression: extractCode, returnByValue: true });
      const imgList = (res.result && res.result.value) || [];

      console.log(`Found ${imgList.length} rendered images in active project DOM.`);

      const savedFiles = [];
      const seenHashes = new Map();

      imgList.forEach((item, idx) => {
        if (item.dataUrl) {
          const numStr = String(idx + 1).padStart(2, '0');
          const base64Data = item.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const md5Hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);

          const isDuplicate = seenHashes.has(md5Hash);
          if (!isDuplicate) seenHashes.set(md5Hash, numStr);

          const publicPath = path.join(PUBLIC_VIDEO3_DIR, `${numStr}.jpg`);
          const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

          fs.writeFileSync(publicPath, buffer);
          fs.writeFileSync(projectPath, buffer);

          savedFiles.push({
            filename: `${numStr}.jpg`,
            sizeBytes: buffer.length,
            dimensions: `${item.width}x${item.height}`,
            md5: md5Hash,
            status: isDuplicate ? `⚠️ DUPLICATE of Scene ${seenHashes.get(md5Hash)}` : '✅ 100% UNIQUE'
          });
        }
      });

      console.log('\n=======================================================');
      console.table(savedFiles);
      console.log('=======================================================');

      ws.close();
    });

  } catch (err) {
    console.error('Execution Error:', err.message);
  }
}

run();
