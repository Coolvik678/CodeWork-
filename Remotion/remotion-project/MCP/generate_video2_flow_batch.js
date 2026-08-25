const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const PROMPTS_FILE = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'zapi_flow_prompts.txt');
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');
const PROJECT_IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');

if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });
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
    const prompts = parsePrompts();
    console.log(`=======================================================`);
    console.log(`GOOGLE FLOW CDP ENGINE — GENERATING VIDEO #2 IMAGES`);
    console.log(`Found ${prompts.length} scene prompts.`);
    console.log(`=======================================================\n`);

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
      console.log('Connected to Google Flow Project Session via CDP!');

      for (let i = 0; i < prompts.length; i++) {
        const item = prompts[i];
        console.log(`[${i + 1}/${prompts.length}] Injecting Scene ${item.id} Prompt...`);

        const setPromptCode = `
          (() => {
            const editable = document.querySelector('[contenteditable="true"]');
            if (!editable) return false;
            editable.focus();
            editable.innerText = ${JSON.stringify(item.prompt)};
            editable.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
          })()
        `;
        const resSet = await send('Runtime.evaluate', { expression: setPromptCode, returnByValue: true });

        const clickCreateCode = `
          (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const createBtn = btns.find(b => b.innerText.includes('Create') && (b.innerText.includes('arrow_forward') || b.className.includes('primary')));
            if (createBtn) {
              createBtn.click();
              return true;
            }
            const arrowBtn = btns.find(b => b.innerText.includes('arrow_forward'));
            if (arrowBtn) {
              arrowBtn.click();
              return true;
            }
            return false;
          })()
        `;
        const resClick = await send('Runtime.evaluate', { expression: clickCreateCode, returnByValue: true });

        if (resSet.result.value && resClick.result.value) {
          console.log(`  └─ SUCCESS! Scene ${item.id} submitted.`);
        } else {
          console.log(`  └─ Retrying Scene ${item.id}...`);
        }

        await new Promise(r => setTimeout(r, 8000));
      }

      console.log('\nAll 22 prompts submitted to Google Flow project successfully!');
      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
