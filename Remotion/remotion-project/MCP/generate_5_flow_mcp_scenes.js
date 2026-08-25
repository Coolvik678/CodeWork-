const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CDP_PORT = 9222;
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', 'how_did_ancient_humans_become_asian', 'images');

if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_IMAGES_DIR)) fs.mkdirSync(PROJECT_IMAGES_DIR, { recursive: true });

const UNIQUE_PROMPTS = [
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character staring closely at his glowing stick hand under bright sunlight, simple 2D background, wide 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, minimal stickman character wearing sunglasses pointing angrily up at a giant laughing yellow cartoon Sun, high contrast 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, group of caveman stickmen walking across a prehistoric savanna under intense solar rays, wide 16:9 landscape.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, funny stickman inspecting a large globe map with a giant magnifying glass, question marks above his head, 16:9 composition.",
  "2D vector stick figure cartoon illustration, clean hand-drawn black outlines, stickman character wrapped inside a glowing protective dark shield aura blocking purple UV laser bolts, 16:9 framing."
];

async function getGoogleFlowTab() {
  const http = require('http');
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}/json`, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const flowTab = pages.find(p => p.url.includes('labs.google/fx/tools/flow'));
          if (flowTab) resolve(flowTab);
          else reject(new Error('Google Flow tab not found in Chrome CDP. Open Google Flow in Chrome.'));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`=======================================================`);
  console.log(`ZAPPIFLOW GOOGLE FLOW MCP ENGINE — 5 UNIQUE HD SCENES`);
  console.log(`=======================================================\n`);

  try {
    const tab = await getGoogleFlowTab();
    console.log('Connected to Active Google Flow Tab:', tab.url);
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
      const results = [];
      const seenHashes = new Set();

      for (let i = 0; i < UNIQUE_PROMPTS.length; i++) {
        const numStr = String(i + 1).padStart(2, '0');
        const promptText = UNIQUE_PROMPTS[i];
        console.log(`\n[${i + 1}/5] Processing Scene ${numStr}...`);
        console.log(`  Prompt: "${promptText.slice(0, 75)}..."`);

        // 1. Inject unique prompt into contenteditable text box
        const injectCode = `
          (() => {
            const editable = document.querySelector('[contenteditable="true"]');
            if (!editable) return false;
            editable.focus();
            editable.innerText = ${JSON.stringify(promptText)};
            editable.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
          })()
        `;
        await send('Runtime.evaluate', { expression: injectCode, returnByValue: true });

        // 2. Click arrow_forward / Create button
        const clickCode = `
          (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const createBtn = btns.find(b => b.innerText.includes('arrow_forward'));
            if (createBtn) { createBtn.click(); return true; }
            const addBtn = btns.find(b => b.innerText.includes('Create'));
            if (addBtn) { addBtn.click(); return true; }
            return false;
          })()
        `;
        await send('Runtime.evaluate', { expression: clickCode, returnByValue: true });

        console.log(`  └─ Submitted Scene ${numStr}. Waiting 12 seconds for Google Flow AI generation...`);
        await new Promise(r => setTimeout(r, 12000));

        // 3. Draw rendered image to canvas & export Base64
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
            if (mediaImgs.length === 0) return null;

            const latestImg = mediaImgs[mediaImgs.length - 1];
            const canvas = document.createElement('canvas');
            canvas.width = latestImg.naturalWidth || latestImg.width || 1376;
            canvas.height = latestImg.naturalHeight || latestImg.height || 768;
            const ctx = canvas.getContext('2d');
            try {
              ctx.drawImage(latestImg, 0, 0, canvas.width, canvas.height);
              return { dataUrl: canvas.toDataURL('image/jpeg', 0.95), width: canvas.width, height: canvas.height };
            } catch (e) {
              return { error: e.message };
            }
          })()
        `;

        const resExt = await send('Runtime.evaluate', { expression: extractCode, returnByValue: true });
        const resObj = resExt.result ? resExt.result.value : null;

        if (resObj && resObj.dataUrl) {
          const base64Data = resObj.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');

          const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');
          const isDuplicate = seenHashes.has(md5Hash);
          seenHashes.add(md5Hash);

          const publicPath = path.join(PUBLIC_VIDEO2_DIR, `${numStr}.jpg`);
          const projectPath = path.join(PROJECT_IMAGES_DIR, `${numStr}.jpg`);

          fs.writeFileSync(publicPath, buffer);
          fs.writeFileSync(projectPath, buffer);

          results.push({
            scene: numStr,
            file: `${numStr}.jpg`,
            sizeBytes: buffer.length,
            dimensions: `${resObj.width}x${resObj.height}`,
            md5: md5Hash.substring(0, 8),
            status: isDuplicate ? '⚠️ DUPLICATE DETECTED' : '✅ 100% UNIQUE'
          });

          console.log(`  └─ SAVED Scene ${numStr}.jpg (${resObj.width}x${resObj.height}, ${buffer.length} bytes, MD5: ${md5Hash.substring(0, 8)}) [${isDuplicate ? 'DUPLICATE' : 'UNIQUE'}]`);
        } else {
          console.log(`  └─ Scene ${numStr} submitted.`);
        }
      }

      console.log('\n=======================================================');
      console.log('SUMMARY OF GENERATED UNIQUE TEST IMAGES:');
      console.log('=======================================================');
      console.table(results);

      ws.close();
    });

  } catch (err) {
    console.error('Generation Error:', err.message);
  }
}

run();
