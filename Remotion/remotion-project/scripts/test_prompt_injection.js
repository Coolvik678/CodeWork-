const WebSocket = require('ws');

async function getGoogleFlowTab() {
  const http = require('http');
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:9222/json`, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const flowTab = pages.find(p => p.url.includes('labs.google/fx/tools/flow'));
          if (flowTab) resolve(flowTab);
          else reject(new Error('Flow tab not found.'));
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
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
    console.log('Testing execCommand prompt injection in Google Flow...');

    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const editable = document.querySelector('[contenteditable="true"]');
          if (!editable) return { success: false, reason: 'no contenteditable' };

          editable.focus();
          document.execCommand('selectAll', false, null);
          document.execCommand('delete', false, null);
          document.execCommand('insertText', false, 'Test Prompt 12345 Stickman');

          const btns = Array.from(document.querySelectorAll('button'));
          const createBtn = btns.find(b => b.innerText.includes('arrow_forward'));
          
          return {
            success: true,
            text: editable.innerText,
            btnFound: !!createBtn
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Result:', JSON.stringify(res.result.value, null, 2));
    ws.close();
  });
}

run();
