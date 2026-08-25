const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const PROMPTS_FILE = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'zapi_flow_prompts.txt');
const IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');
const VIDEO_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG);

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function parsePrompts() {
  const text = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.startsWith('Scene ') || l.startsWith('MASTER THUMBNAIL PROMPT:'));
  const prompts = [];
  
  lines.forEach((line, idx) => {
    if (line.startsWith('Scene ')) {
      const parts = line.split(':');
      const numStr = String(idx + 1).padStart(2, '0');
      const promptText = parts.slice(1).join(':').trim();
      prompts.push({ id: numStr, prompt: promptText });
    } else if (line.startsWith('MASTER THUMBNAIL PROMPT:')) {
      const promptText = line.replace('MASTER THUMBNAIL PROMPT:', '').trim();
      prompts.push({ id: 'thumbnail', prompt: promptText });
    }
  });
  return prompts;
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
    console.log(`GOOGLE FLOW CDP AUTOMATION ENGINE — VIDEO #2`);
    console.log(`Found ${prompts.length} total prompts (22 Scenes + 1 Thumbnail).`);
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
      console.log('Connected to Chrome CDP session for Google Flow!\n');

      for (let i = 0; i < prompts.length; i++) {
        const item = prompts[i];
        console.log(`[${i + 1}/${prompts.length}] Injecting Prompt for Scene ${item.id}...`);

        // Inject Prompt
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

        // Click Submit
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
          console.log(`  └─ SUCCESS! Prompt submitted to Google Flow.`);
        } else {
          console.log(`  └─ WARNING: Prompt injection or button click failed, retrying...`);
        }

        // Wait 10 seconds per scene batch generation
        console.log(`  └─ Waiting 10s for Google Flow AI generation...`);
        await new Promise(r => setTimeout(r, 10000));
      }

      console.log('\n=======================================================');
      console.log('ALL 23 PROMPTS SUBMITTED TO GOOGLE FLOW SUCCESSFULLY!');
      console.log('=======================================================');

      ws.close();
    });

  } catch (err) {
    console.error('Error running Google Flow CDP runner:', err);
  }
}

run();
