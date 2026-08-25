/**
 * Flowing Images — Google Flow DOM Automation Engine
 * Runs on Google Flow pages (https://labs.google/fx/tools/flow*)
 * Robust prompt injection, keyboard simulation, button clicking, and image detection.
 */

console.log("⚡ Flowing Images Engine loaded on Google Flow page.");

let lastPromptInput = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EXECUTE_PROMPT") {
    handlePromptExecution(message);
    sendResponse({ status: "ACK" });
  }
  return true;
});

async function handlePromptExecution(data) {
  const { promptText, settings, promptIndex } = data;
  console.log(`[Flowing Images] Processing Prompt #${promptIndex + 1}: ${promptText}`);

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      if (checkUnusualActivity()) {
        chrome.runtime.sendMessage({ type: "UNUSUAL_ACTIVITY_DETECTED" });
        return;
      }

      let cleanText = promptText;
      if (window.AutoTagger) {
        cleanText = window.AutoTagger.cleanPromptText(promptText);
      }

      // Step 1: Inject text into Google Flow DOM prompt box
      const injected = await injectPromptText(cleanText);
      if (!injected) {
        throw new Error("Could not locate Google Flow prompt input box. Make sure you have a project canvas open!");
      }

      await sleep(400);

      // Step 2: Set Aspect Ratio if button exists
      if (settings.aspectRatio) {
        await setAspectRatio(settings.aspectRatio);
      }

      await sleep(300);

      // Step 3: Record pre-existing image URLs
      const initialImages = getCurrentImageUrls();

      // Step 4: Click Generate / Submit button & dispatch Enter key
      const submitted = clickSubmitButton(lastPromptInput);
      if (!submitted) {
        throw new Error("Could not locate or trigger Submit button");
      }

      console.log(`[Flowing Images] Prompt submitted (Attempt ${attempts})! Monitoring DOM for output...`);

      // Step 5: Fast polling (400ms) for newly generated images
      const newUrls = await waitForNewImages(initialImages, 35000);

      if (newUrls && newUrls.length > 0) {
        console.log(`[Flowing Images] ✅ Generated ${newUrls.length} new image(s)!`);
        chrome.runtime.sendMessage({
          type: "PROMPT_COMPLETED",
          promptIndex,
          imageUrls: newUrls
        });
        return;
      } else {
        throw new Error("Timeout waiting for image generation to complete");
      }
    } catch (err) {
      console.warn(`[Flowing Images] Attempt ${attempts}/${maxAttempts} failed: ${err.message}`);
      if (attempts < maxAttempts) {
        await sleep(2000);
      } else {
        chrome.runtime.sendMessage({
          type: "PROMPT_FAILED",
          promptIndex,
          error: err.message
        });
      }
    }
  }
}

/**
 * Focus and inject text into Google Flow prompt input box
 */
async function injectPromptText(text) {
  const inputSelectors = [
    'textarea',
    'div[contenteditable="true"]',
    'input[type="text"]',
    '[role="textbox"]',
    '[aria-label*="prompt" i]',
    '[placeholder*="prompt" i]',
    '[aria-label*="create" i]'
  ];

  let promptInput = null;
  for (const selector of inputSelectors) {
    const els = Array.from(document.querySelectorAll(selector));
    promptInput = els.find(e => e.offsetWidth > 0 && e.offsetHeight > 0);
    if (promptInput) break;
  }

  if (!promptInput) return false;
  lastPromptInput = promptInput;

  promptInput.focus();

  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set ||
                       Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

  if (promptInput.tagName === 'TEXTAREA' || promptInput.tagName === 'INPUT') {
    if (nativeSetter) {
      nativeSetter.call(promptInput, text);
    } else {
      promptInput.value = text;
    }
    promptInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    promptInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  } else {
    // Contenteditable div
    promptInput.innerHTML = '';
    promptInput.innerText = text;
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, text);
    promptInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data: text }));
    promptInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  return true;
}

/**
 * Trigger submission via Enter key press & button click
 */
function clickSubmitButton(promptInput) {
  let triggered = false;

  // 1. Dispatch Enter & Ctrl+Enter keyboard events
  if (promptInput) {
    promptInput.focus();
    ['keydown', 'keypress', 'keyup'].forEach(type => {
      promptInput.dispatchEvent(new KeyboardEvent(type, {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
        composed: true
      }));
      promptInput.dispatchEvent(new KeyboardEvent(type, {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
        composed: true
      }));
    });
    triggered = true;
  }

  // 2. Search for Submit / Create / Arrow button near prompt input
  const scope = (promptInput && (promptInput.closest('div.input-container, form, footer') || promptInput.parentElement.parentElement)) || document.body;
  const buttons = Array.from(scope.querySelectorAll('button, div[role="button"], span[role="button"]'));

  let submitBtn = buttons.find(b => {
    const aria = (b.getAttribute('aria-label') || '').toLowerCase();
    const title = (b.getAttribute('title') || '').toLowerCase();
    const txt = (b.innerText || '').toLowerCase();
    const html = (b.innerHTML || '').toLowerCase();

    // 🔴 CRITICAL FIX: EXPLICITLY REJECT "Upload Media" or "Add" buttons to prevent wrong popups!
    if (aria.includes('upload') || aria.includes('add media') || aria.includes('attach') || aria.includes('file')) return false;
    if (title.includes('upload') || title.includes('add media')) return false;
    if (txt.includes('upload') || txt.includes('add media')) return false;

    // Explicitly target the Submit / Send arrow
    if (aria === 'send message' || aria === 'submit' || aria.includes('send') || aria.includes('submit prompt') || b.getAttribute('type') === 'submit') return true;
    
    return html.includes('arrow') || html.includes('send') || html.includes('play');
  });

  if (!submitBtn && buttons.length > 0) {
    // Pick the exact last interactive button in the prompt container (Google Flow places the Send arrow at the end)
    submitBtn = buttons[buttons.length - 1];
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(evtType => {
      submitBtn.dispatchEvent(new MouseEvent(evtType, { bubbles: true, cancelable: true, view: window }));
    });
    triggered = true;
  }

  return triggered;
}

/**
 * Set aspect ratio button if available in DOM
 */
async function setAspectRatio(ratioStr) {
  const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'));
  const ratioBtn = buttons.find(b => (b.innerText || '').includes(ratioStr));
  if (ratioBtn) {
    ratioBtn.click();
  }
}

/**
 * Extract currently rendered image URLs from DOM
 */
function getCurrentImageUrls() {
  const imgs = Array.from(document.querySelectorAll('img'));
  const urls = [];
  imgs.forEach(img => {
    const src = img.src || img.getAttribute('src');
    if (src && (src.includes('googleusercontent.com') || src.includes('blob:') || src.startsWith('data:image'))) {
      urls.push(src);
    }
  });
  return urls;
}

/**
 * Fast polling (400ms) for new image URLs in DOM
 */
function waitForNewImages(initialUrls, timeoutMs = 45000) {
  return new Promise((resolve) => {
    const initialSet = new Set(initialUrls);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentUrls = getCurrentImageUrls();
      const newUrls = currentUrls.filter(u => !initialSet.has(u));

      if (newUrls.length > 0) {
        clearInterval(interval);
        resolve(newUrls);
      } else if (Date.now() - startTime > timeoutMs) {
        clearInterval(interval);
        resolve([]);
      }
    }, 400);
  });
}

function checkUnusualActivity() {
  const bodyText = document.body.innerText || '';
  return bodyText.includes('Unusual activity detected') || bodyText.includes('Rate limit exceeded') || bodyText.includes('Too many requests');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
