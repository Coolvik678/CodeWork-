const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const IMAGES_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
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
      console.log('Probing valid tRPC endpoints...');

      const probeCode = `
        (async () => {
          const pathParts = window.location.pathname.split('/');
          const projectId = pathParts[pathParts.length - 1];
          const endpoints = [
            'project.getProject',
            'project.getProjectById',
            'pinhole.getProjectMedia',
            'pinhole.getProject',
            'media.getProjectMedia'
          ];
          const results = {};
          for (let ep of endpoints) {
            try {
              const url = '/fx/api/trpc/' + ep + '?input=' + encodeURIComponent(JSON.stringify({ json: { projectId } }));
              const r = await fetch(url);
              const data = await r.json();
              if (!data.error) results[ep] = data;
            } catch (e) {}
          }
          return { projectId, results };
        })()
      `;

      const result = await send('Runtime.evaluate', { expression: probeCode, awaitPromise: true, returnByValue: true });
      console.log('Valid Endpoints Result:', JSON.stringify(result.result.value, null, 2).slice(0, 2000));

      ws.close();
    });

  } catch (err) {
    console.error(err);
  }
}

run();
