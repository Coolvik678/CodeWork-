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
      const dumpScript = `
        (() => {
          const all = Array.from(document.querySelectorAll('*'));
          const btns = all.filter(e => e.tagName === 'BUTTON' || e.getAttribute('role') === 'button');
          return btns.map(b => ({
            tag: b.tagName,
            role: b.getAttribute('role'),
            text: b.innerText,
            ariaLabel: b.getAttribute('aria-label'),
            className: b.className.slice(0, 50)
          }));
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: dumpScript, returnByValue: true });
      console.log('All Buttons in DOM:', JSON.stringify(result.result.value, null, 2));

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
