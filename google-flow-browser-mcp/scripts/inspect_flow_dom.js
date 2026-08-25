import { chromium } from 'playwright';

async function inspectDOM() {
  const userDataDir = 'C:\\Users\\myovi\\.gemini\\chrome_flow_mcp_profile';
  const context = await chromium.launchPersistentContext(userDataDir, { headless: false, channel: 'chrome' });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://labs.google/fx/tools/flow/project/bad9ba9c-7bba-49eb-8892-a74e413e7bbd');
  await page.waitForTimeout(5000);

  const info = await page.evaluate(() => {
    function getAllElements(root = document) {
      let els = Array.from(root.querySelectorAll('*'));
      for (let el of els) {
        if (el.shadowRoot) els = els.concat(getAllElements(el.shadowRoot));
      }
      return els;
    }
    const all = getAllElements();
    const imgs = all.filter(e => e.tagName === 'IMG').map(i => i.src);
    return { count: all.length, imgs: Array.from(new Set(imgs)) };
  });

  console.log('DOM info:', JSON.stringify(info, null, 2));
  await context.close();
}

inspectDOM();
