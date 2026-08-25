/**
 * Flowing Images — Background Service Worker
 * Manages background queue execution, downloads, state persistence, and background tab messaging.
 */

// Global State
let queueState = {
  isRunning: false,
  isPaused: false,
  prompts: [],
  currentIndex: 0,
  settings: {
    mode: "image", // "image" | "video"
    speed: "balanced", // "fast" | "balanced" | "slow" | "custom"
    delayMs: 12000,
    model: "Nano Banana 2",
    aspectRatio: "16:9",
    imagesPerPrompt: 1,
    referenceMode: "same", // "none" | "same" | "different" | "auto-tag"
    sharedReferences: [],
    chainReferences: false,
    saveFolder: "flowing_images",
    autoDownloadImages: true,
    imageQuality: "standard", // "standard" | "2k" | "4k"
    autoDownloadVideos: true,
    videoQuality: "720p",
    namingScheme: "001", // "001" | "prompt" | "custom"
    customPrefix: "flowing",
    startNumber: 1
  },
  gallery: [],
  logs: []
};

// Load saved state on startup and prevent orphaned content scripts
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["flowing_queueState"], (res) => {
    if (res.flowing_queueState) {
      queueState = { ...queueState, ...res.flowing_queueState, isRunning: false };
    }
  });

  // Force reload any open Google Flow tabs so the new injected UI works immediately
  chrome.tabs.query({ url: "*://labs.google/fx/tools/flow*" }, (tabs) => {
    tabs.forEach(tab => {
      try {
        chrome.tabs.reload(tab.id);
      } catch (e) {}
    });
  });
});

function saveState() {
  chrome.storage.local.set({ flowing_queueState: queueState });
}

function logMessage(msg) {
  const time = new Date().toLocaleTimeString();
  const entry = `[${time}] ${msg}`;
  queueState.logs.unshift(entry);
  if (queueState.logs.length > 200) queueState.logs.pop();
  saveState();
  broadcastState();
}

function broadcastState() {
  chrome.runtime.sendMessage({ type: "STATE_UPDATED", state: queueState }).catch(() => {
    // Side panel might be closed, which is fine
  });
}

// Handle Incoming Messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "GET_STATE":
      sendResponse({ state: queueState });
      break;

    case "START_QUEUE":
      if (message.prompts && message.prompts.length > 0) {
        queueState.prompts = message.prompts;
        queueState.currentIndex = 0;
        queueState.settings = { ...queueState.settings, ...message.settings };
        queueState.isRunning = true;
        queueState.isPaused = false;
        logMessage(`Starting queue with ${queueState.prompts.length} prompts...`);
        saveState();
        broadcastState();
        triggerNextPrompt();
      }
      sendResponse({ success: true });
      break;

    case "PAUSE_QUEUE":
      queueState.isPaused = true;
      logMessage("Queue paused.");
      saveState();
      broadcastState();
      sendResponse({ success: true });
      break;

    case "RESUME_QUEUE":
      queueState.isPaused = false;
      logMessage("Queue resumed.");
      saveState();
      broadcastState();
      triggerNextPrompt();
      sendResponse({ success: true });
      break;

    case "STOP_QUEUE":
      queueState.isRunning = false;
      queueState.isPaused = false;
      logMessage("Queue stopped.");
      saveState();
      broadcastState();
      sendResponse({ success: true });
      break;

    case "PROMPT_COMPLETED":
      logMessage(`Finished Scene ${queueState.currentIndex + 1}/${queueState.prompts.length}`);
      if (message.imageUrls && message.imageUrls.length > 0) {
        handleAutoDownloads(message.imageUrls, queueState.prompts[queueState.currentIndex]);
      }
      queueState.currentIndex++;
      saveState();
      broadcastState();

      if (queueState.currentIndex < queueState.prompts.length && queueState.isRunning && !queueState.isPaused) {
        const delay = getDelayMs(queueState.settings);
        logMessage(`Waiting ${Math.round(delay / 1000)}s before next prompt...`);
        setTimeout(() => {
          if (queueState.isRunning && !queueState.isPaused) {
            triggerNextPrompt();
          }
        }, delay);
      } else if (queueState.currentIndex >= queueState.prompts.length) {
        queueState.isRunning = false;
        logMessage("🎉 All prompts generated successfully!");
        saveState();
        broadcastState();
      }
      sendResponse({ success: true });
      break;

    case "PROMPT_FAILED":
      logMessage(`⚠️ Error processing Scene ${queueState.currentIndex + 1}: ${message.error}. Pausing queue.`);
      queueState.isPaused = true;
      saveState();
      broadcastState();
      sendResponse({ success: true });
      break;

    case "UNUSUAL_ACTIVITY_DETECTED":
      queueState.isPaused = true;
      logMessage("🛑 Rate limit / Unusual Activity detected on Google Flow! Queue paused.");
      saveState();
      broadcastState();
      sendResponse({ success: true });
      break;
  }
  return true;
});

function getDelayMs(settings) {
  switch (settings.speed) {
    case "fast": return 3000;
    case "slow": return 15000;
    case "custom": return settings.delayMs || 6000;
    case "balanced":
    default: return 6000;
  }
}

async function triggerNextPrompt() {
  if (!queueState.isRunning || queueState.isPaused) return;

  const currentPrompt = queueState.prompts[queueState.currentIndex];
  logMessage(`Submitting Scene ${queueState.currentIndex + 1}: "${currentPrompt.substring(0, 40)}..."`);

  // Find target Google Flow tab
  const tabs = await chrome.tabs.query({ url: "https://labs.google/fx/tools/flow*" });
  if (!tabs || tabs.length === 0) {
    logMessage("❌ Error: No Google Flow tab open. Please open Google Flow first!");
    queueState.isRunning = false;
    saveState();
    broadcastState();
    return;
  }

  const targetTab = tabs[0];

  // Dynamically inject content scripts into target tab to ensure connection exists
  try {
    await chrome.scripting.executeScript({
      target: { tabId: targetTab.id },
      files: [
        "src/utils/auto_tagger.js",
        "src/utils/file_namer.js",
        "src/content/google_flow_dom.js"
      ]
    });
  } catch (e) {
    console.log("Script injection note:", e.message);
  }

  // Send message to execute prompt
  chrome.tabs.sendMessage(targetTab.id, {
    type: "EXECUTE_PROMPT",
    promptIndex: queueState.currentIndex,
    totalPrompts: queueState.prompts.length,
    promptText: currentPrompt,
    settings: queueState.settings
  }).catch((err) => {
    logMessage(`❌ Failed to send command to Google Flow tab: ${err.message}`);
  });
}

function handleAutoDownloads(urls, promptText) {
  if (!queueState.settings.autoDownloadImages) return;

  urls.forEach((url, i) => {
    const filenameIndex = queueState.currentIndex + 1;
    let filenameStr = `${filenameIndex.toString().padStart(3, '0')}.jpg`;

    if (queueState.settings.namingScheme === "prompt") {
      const slug = promptText.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 40);
      filenameStr = `${filenameIndex.toString().padStart(3, '0')}_${slug}.jpg`;
    } else if (queueState.settings.namingScheme === "custom") {
      filenameStr = `${queueState.settings.customPrefix || 'flowing'}_${filenameIndex.toString().padStart(3, '0')}.jpg`;
    }

    const folder = queueState.settings.saveFolder || "flowing_images";
    const downloadPath = `${folder}/${filenameStr}`;

    chrome.downloads.download({
      url: url,
      filename: downloadPath,
      conflictAction: "uniquify"
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        logMessage(`Download error: ${chrome.runtime.lastError.message}`);
      } else {
        logMessage(`Saved image to ${downloadPath}`);
      }
    });

    // Save to local gallery state
    queueState.gallery.unshift({
      id: Date.now() + "_" + i,
      prompt: promptText,
      url: url,
      filename: downloadPath,
      timestamp: new Date().toISOString()
    });
  });
}
