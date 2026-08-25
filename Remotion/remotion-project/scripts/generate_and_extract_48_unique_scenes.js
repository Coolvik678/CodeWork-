const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'why_were_ancient_humans_black';
const PROMPTS_FILE = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'zappiflow_image_prompts.txt');
const PUBLIC_VIDEO3_DIR = path.join(__dirname, '..', 'public', 'video3');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');

if (!fs.existsSync(PUBLIC_VIDEO3_DIR)) fs.mkdirSync(PUBLIC_VIDEO3_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_IMAGES_DIR)) fs.mkdirSync(PROJECT_IMAGES_DIR, { recursive: true });

function parsePrompts() {
  const text = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.startsWith('Scene '));
  return lines.map((line, idx) => {
    const parts = line.split(':');
    const numStr = String(idx + 1).padStart(2, '0');
    const promptText = parts.slice(1).join(':').trim();
    return { id: numStr, prompt: promptText };
  });
}

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
          else reject(new Error('Google Flow tab not found in Chrome CDP on port 9222.'));
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
  const prompts = parsePrompts();
  console.log(`=======================================================`);
  console.log(`ZAPPIFLOW GOOGLE FLOW REAL-TIME GENERATION ENGINE — VIDEO #3`);
  console.log(`Target: ${prompts.length} 100% Unique 1376x768 HD Stickman Scenes`);
  console.log(`=======================================================\n`);

  try {
    const tab = await getGoogleFlowTab();
    console.log('Connected to Active Google Flow Session:', tab.url);
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
      const savedFiles = [];
      const seenHashes = new Map();
      const extractedUuids = new Set();

      for (let i = 0; i < prompts.length; i++) {
        const item = prompts[i];
        console.log(`\n[${i + 1}/${prompts.length}] Generating Scene ${item.id} in Google Flow...`);
        console.log(`  Prompt: "${item.prompt.slice(0, 75)}..."`);

        // 1. Inject Prompt via execCommand insertText
        const injectCode = `
          (() => {
            const editable = document.querySelector('[contenteditable="true"]');
            if (!editable) return false;
            editable.focus();
            document.execCommand('selectAll', false, null);
            document.execCommand('delete', false, null);
            document.execCommand('insertText', false, ${JSON.stringify(item.prompt)});
            return true;
          })()
        `;
        await send('Runtime.evaluate', { expression: injectCode, returnByValue: true });
        await new Promise(r => setTimeout(r, 500));

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

        console.log(`  └─ Submitted Scene ${item.id}. Waiting for NEW image card to render in DOM...`);

        // 3. Poll DOM until a NEW image element appears that is NOT in extractedUuids
        let newImgObj = null;
        const startTime = Date.now();

        while (Date.now() - startTime < 30000) {
          await new Promise(r => setTimeout(r, 2000));

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

              // Find the newest image element whose src is not yet extracted
              const knownUuids = ${JSON.stringify(Array.from(extractedUuids))};
              const freshImgs = mediaImgs.filter(img => !knownUuids.includes(img.src));

              if (freshImgs.length === 0) return null;

              const targetImg = freshImgs[freshImgs.length - 1];
              if (!targetImg.complete || targetImg.naturalWidth < 100) return null;

              const canvas = document.createElement('canvas');
              canvas.width = targetImg.naturalWidth || 1376;
              canvas.height = targetImg.naturalHeight || 768;
              const ctx = canvas.getContext('2d');
              try {
                ctx.drawImage(targetImg, 0, 0, canvas.width, canvas.height);
                return {
                  dataUrl: canvas.toDataURL('image/jpeg', 0.95),
                  width: canvas.width,
                  height: canvas.height,
                  src: targetImg.src
                };
              } catch (e) {
                return { error: e.message };
              }
            })()
          `;

          const resExt = await send('Runtime.evaluate', { expression: extractCode, returnByValue: true });
          const resObj = resExt.result ? resExt.result.value : null;

          if (resObj && resObj.dataUrl) {
            newImgObj = resObj;
            extractedUuids.add(resObj.src);
            break;
          }
        }

        if (newImgObj && newImgObj.dataUrl) {
          const base64Data = newImgObj.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const md5Hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);

          if (seenHashes.has(md5Hash)) {
            console.error(`🚨 FATAL: MD5 Duplicate detected for Scene ${item.id}! Duplicate of Scene ${seenHashes.get(md5Hash)}. Stopping.`);
            ws.close();
            process.exit(1);
          }

          seenHashes.set(md5Hash, item.id);

          const publicPath = path.join(PUBLIC_VIDEO3_DIR, `${item.id}.jpg`);
          const projectPath = path.join(PROJECT_IMAGES_DIR, `${item.id}.jpg`);

          fs.writeFileSync(publicPath, buffer);
          fs.writeFileSync(projectPath, buffer);

          savedFiles.push({
            scene: item.id,
            sizeBytes: buffer.length,
            dimensions: `${newImgObj.width}x${newImgObj.height}`,
            md5: md5Hash,
            status: '✅ 100% UNIQUE'
          });

          console.log(`  └─ SUCCESS! Saved 100% UNIQUE Scene ${item.id}.jpg (${newImgObj.width}x${newImgObj.height}, ${buffer.length} bytes, MD5: ${md5Hash})`);
        } else {
          console.log(`  └─ Warning: Scene ${item.id} timeout or gallery update.`);
        }
      }

      console.log('\n=======================================================');
      console.log('FINAL VERIFICATION TABLE OF ALL GENERATED SCENE IMAGES:');
      console.log('=======================================================');
      console.table(savedFiles);

      ws.close();
    });

  } catch (err) {
    console.error('CDP Execution Error:', err.message);
  }
}

run();
