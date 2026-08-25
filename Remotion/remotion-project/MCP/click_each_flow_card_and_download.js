const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

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
      console.log('Automating card clicks & downloads in Google Flow canvas...');

      const autoClickScript = `
        (async () => {
          function getAllElements(root = document) {
            let els = Array.from(root.querySelectorAll('*'));
            for (let el of els) {
              if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
            }
            return els;
          }

          const all = getAllElements();
          // Find all cards or canvas elements
          const cards = all.filter(el => {
            const cls = (el.className || '').toString();
            return cls.includes('card') || cls.includes('node') || cls.includes('item') || cls.includes('tile');
          });

          return { totalCards: cards.length };
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: autoClickScript, awaitPromise: true, returnByValue: true });
      console.log('Cards Discovery Result:', JSON.stringify(result.result.value, null, 2));

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
