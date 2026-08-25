const WebSocket = require('ws');
const fs = require('fs');

const CDP_PORT = 9222;

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
      console.log('Testing click on Google Flow generate arrow button...');

      const clickArrowScript = `
        (() => {
          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          const all = getAllElements();
          // Find the submit arrow button next to 'Nano Banana 2' or in the prompt card
          const arrowBtn = all.find(el => {
            if (el.tagName !== 'BUTTON') return false;
            const parent = el.closest('div');
            const svg = el.querySelector('svg') || el.innerHTML.includes('path');
            return svg && parent && (parent.innerText || '').includes('Nano Banana');
          });

          if (arrowBtn) {
            arrowBtn.click();
            return { success: true, text: arrowBtn.innerText, tag: arrowBtn.tagName };
          }

          // Fallback: click any button inside the prompt container
          const promptBox = all.find(el => el.getAttribute && el.getAttribute('contenteditable') === 'true');
          if (promptBox) {
            const container = promptBox.closest('div').parentElement;
            const btn = container.querySelector('button:last-child');
            if (btn) {
              btn.click();
              return { success: true, text: btn.innerText, tag: btn.tagName, via: 'container last-child' };
            }
          }

          return { success: false };
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: clickArrowScript, returnByValue: true });
      console.log('Click Result:', JSON.stringify(result.result.value, null, 2));

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
