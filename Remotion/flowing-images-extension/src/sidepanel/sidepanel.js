/**
 * Flowing Images — Side Panel Controller Script
 * Handles UI interactions, tab routing, setting state, and background worker communications.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Navigation Tabs
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      navButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`tab-${targetTab}`).classList.add("active");
    });
  });

  // Controls UI elements
  const textarea = document.getElementById("prompt-textarea");
  const promptCountBadge = document.getElementById("prompt-count-badge");
  const btnStartQueue = document.getElementById("btn-start-queue");
  const btnClearPrompts = document.getElementById("btn-clear-prompts");
  const fileImport = document.getElementById("file-import-prompts");

  // Speed selection
  let selectedSpeed = "balanced";
  document.querySelectorAll("[data-speed]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-speed]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSpeed = btn.getAttribute("data-speed");
    });
  });

  // Aspect ratio selection
  let selectedRatio = "16:9";
  document.querySelectorAll(".ratio-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".ratio-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedRatio = btn.getAttribute("data-ratio");
    });
  });

  // Count selection
  let selectedCount = 1;
  document.querySelectorAll("[data-count]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-count]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCount = parseInt(btn.getAttribute("data-count"), 10);
    });
  });

  // Textarea prompt counting
  textarea.addEventListener("input", updatePromptCount);

  function getPromptsList() {
    return textarea.value
      .split("\n")
      .map(p => p.trim())
      .filter(p => {
        if (!p) return false;
        // Ignore header comments
        if (p.startsWith("# ZAPPIFLOW") || p.startsWith("# Total") || p.startsWith("# Audio") || p.startsWith("# Average")) {
          return false;
        }
        return true;
      })
      .map(p => {
        // Strip prefixes like "Scene 01: [00:00 - 00:07] "
        return p.replace(/^Scene\s+\d+:\s*(\[\d{2}:\d{2}\s*-\s*\d{2}:\d{2}\])?\s*/i, "").trim();
      })
      .filter(p => p.length > 0);
  }

  function updatePromptCount() {
    const list = getPromptsList();
    promptCountBadge.innerText = `${list.length} prompt${list.length === 1 ? "" : "s"}`;
  }

  // Clear button
  btnClearPrompts.addEventListener("click", () => {
    textarea.value = "";
    updatePromptCount();
  });

  // Import TXT/CSV file
  fileImport.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      textarea.value = event.target.result;
      updatePromptCount();
    };
    reader.readAsText(file);
  });

  // Start Queue Button
  btnStartQueue.addEventListener("click", () => {
    const prompts = getPromptsList();
    if (prompts.length === 0) {
      alert("Please enter or import at least one prompt before starting!");
      return;
    }

    const settings = {
      speed: selectedSpeed,
      model: document.getElementById("select-model").value,
      aspectRatio: selectedRatio,
      imagesPerPrompt: selectedCount,
      chainReferences: document.getElementById("chk-chain-references").checked,
      saveFolder: document.getElementById("setting-save-folder").value,
      autoDownloadImages: document.getElementById("setting-auto-download-img").checked,
      imageQuality: document.getElementById("setting-image-quality").value,
      namingScheme: document.getElementById("setting-naming-scheme").value,
      startNumber: parseInt(document.getElementById("setting-start-number").value || "1", 10)
    };

    chrome.runtime.sendMessage({
      type: "START_QUEUE",
      prompts,
      settings
    }, (res) => {
      // Switch to Queue Tab
      document.querySelector('[data-tab="queue"]').click();
    });
  });

  // Queue Control Buttons
  document.getElementById("btn-pause-queue").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "PAUSE_QUEUE" });
  });

  document.getElementById("btn-resume-queue").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "RESUME_QUEUE" });
  });

  document.getElementById("btn-stop-queue").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "STOP_QUEUE" });
  });

  // Troubleshooting button
  document.getElementById("btn-fix-activity").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "RESUME_QUEUE" });
    alert("Rate limit state reset! Retrying next prompt...");
  });

  // Listen for Background State Updates
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "STATE_UPDATED") {
      renderState(message.state);
    }
  });

  // Request initial state on startup
  chrome.runtime.sendMessage({ type: "GET_STATE" }, (res) => {
    if (res && res.state) {
      renderState(res.state);
    }
  });

  function renderState(state) {
    // Render status line
    const footerLog = document.getElementById("footer-log-text");
    if (state.logs && state.logs.length > 0) {
      footerLog.innerText = state.logs[0];
    }

    // Render Queue
    const statusText = document.getElementById("queue-status-text");
    if (state.isRunning) {
      statusText.innerText = state.isPaused ? "Status: ⏸️ Paused" : `Status: ⚡ Generating (${state.currentIndex + 1}/${state.prompts.length})`;
    } else {
      statusText.innerText = "Status: Idle";
    }

    // Progress Bar
    const progressFill = document.getElementById("queue-progress-fill");
    if (state.prompts.length > 0) {
      const pct = Math.round(((state.currentIndex) / state.prompts.length) * 100);
      progressFill.style.width = `${pct}%`;
    } else {
      progressFill.style.width = "0%";
    }

    // Queue Items List
    const queueContainer = document.getElementById("queue-items-container");
    if (state.prompts.length === 0) {
      queueContainer.innerHTML = `<p class="empty-state">No active queue. Paste prompts in Control tab and click Start!</p>`;
    } else {
      queueContainer.innerHTML = state.prompts.map((p, i) => {
        let badge = "⏳ Queued";
        if (i < state.currentIndex) badge = "✅ Done";
        if (i === state.currentIndex && state.isRunning) badge = "⚡ Processing";
        return `
          <div style="padding: 6px; border-bottom: 1px solid #2d3345; font-size: 11px; display: flex; justify-content: space-between;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px;">${i + 1}. ${p}</span>
            <span style="font-weight: bold; color: ${i < state.currentIndex ? '#10b981' : i === state.currentIndex ? '#3b82f6' : '#94a3b8'}">${badge}</span>
          </div>
        `;
      }).join("");
    }

    // Render Gallery Grid
    const galleryContainer = document.getElementById("gallery-grid-container");
    if (state.gallery && state.gallery.length > 0) {
      galleryContainer.innerHTML = state.gallery.map(item => `
        <div style="background: #212530; border-radius: 6px; padding: 6px; margin-bottom: 8px;">
          <img src="${item.url}" style="width: 100%; border-radius: 4px; display: block;">
          <p style="font-size: 10px; color: #94a3b8; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.prompt}</p>
        </div>
      `).join("");
    }
  }
});
