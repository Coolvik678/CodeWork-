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
      const inspectCode = `
        (async () => {
          // Check performance entries for image fetch calls
          const entries = performance.getEntriesByType('resource');
          const imgEntries = entries.filter(e => e.name.includes('googleusercontent') || e.name.includes('labs.google') || e.name.includes('image') || e.name.includes('generate'));
          return imgEntries.map(e => e.name).slice(0, 30);
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: inspectCode, awaitPromise: true, returnByValue: true });
      console.log('Resource Performance Entries:', result.result.value);

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
