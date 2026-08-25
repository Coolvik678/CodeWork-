/**
 * Flowing Images — In-Page Overlay Script
 * Injects persistent dark UI panel onto Google Flow page.
 */

(function () {
  if (document.getElementById("flowing-images-root")) return;

  const root = document.createElement("div");
  root.id = "flowing-images-root";
  document.body.appendChild(root);

  // Render HTML structure
  root.innerHTML = `
    <button id="flowing-images-toggle-btn" title="Toggle Flowing Images Panel">⚡</button>
    <div id="flowing-images-panel" class="open">
      <div class="fi-header">
        <div class="fi-brand">
          <div class="fi-logo">⚡</div>
          <div>
            <h2>Flowing Images</h2>
            <p class="fi-subtitle">Google Flow Bulk Automator</p>
          </div>
        </div>
        <div class="fi-badge">UNLIMITED</div>
        <button class="fi-close-btn" id="fi-btn-close">✕</button>
      </div>

      <div class="fi-nav-tabs">
        <button class="fi-tab-btn active" data-tab="control">⚡ Control</button>
        <button class="fi-tab-btn" data-tab="queue">📋 Queue</button>
        <button class="fi-tab-btn" data-tab="gallery">🖼️ Gallery</button>
        <button class="fi-tab-btn" data-tab="settings">⚙️ Settings</button>
      </div>

      <!-- TAB 1: CONTROL -->
      <div id="fi-tab-control" class="fi-tab-content active">
        <div class="fi-card">
          <label class="fi-label">MODE</label>
          <div class="fi-pill-group">
            <button class="fi-pill-btn active" id="fi-mode-img">🖼️ Image</button>
            <button class="fi-pill-btn" id="fi-mode-vid">📹 Video</button>
          </div>

          <label class="fi-label" style="margin-top:8px;">SPEED</label>
          <div class="fi-pill-group">
            <button class="fi-pill-btn" data-speed="fast">⚡ Fast (3s)</button>
            <button class="fi-pill-btn active" data-speed="balanced">⚖️ Balanced (6s)</button>
            <button class="fi-pill-btn" data-speed="slow">⏳ Slow (15s)</button>
          </div>
        </div>

        <div class="fi-card">
          <label class="fi-label">MODEL</label>
          <select id="fi-select-model" class="fi-select">
            <option value="Nano Banana 2">🍌 Nano Banana 2</option>
            <option value="Veo 3.1">🎬 Veo 3.1 Video</option>
            <option value="Imagen 3">🎨 Imagen 3 HD</option>
          </select>

          <label class="fi-label" style="margin-top:8px;">ASPECT RATIO</label>
          <div class="fi-grid-5">
            <button class="fi-ratio-btn active" data-ratio="16:9">16:9</button>
            <button class="fi-ratio-btn" data-ratio="4:3">4:3</button>
            <button class="fi-ratio-btn" data-ratio="1:1">1:1</button>
            <button class="fi-ratio-btn" data-ratio="3:4">3:4</button>
            <button class="fi-ratio-btn" data-ratio="9:16">9:16</button>
          </div>
        </div>

        <div class="fi-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label class="fi-label">PROMPTS LIST</label>
            <span id="fi-prompt-count" style="font-size:10px; color:#f59e0b; font-weight:bold;">0 prompts</span>
          </div>
          <textarea id="fi-prompt-text" class="fi-textarea" placeholder="Paste your prompt list here or drag & drop a TXT/CSV file...&#10;Comments (# ZAPPIFLOW...) and Scene prefixes are cleaned automatically!"></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <div style="display:flex; gap:6px;">
              <label class="fi-pill-btn" style="cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                📁 Import TXT
                <input type="file" id="fi-file-import" accept=".txt,.csv" style="display:none;">
              </label>
              <button class="fi-pill-btn" id="fi-btn-clear">Clear</button>
            </div>
            <button class="fi-btn-primary" id="fi-btn-start">➡️ Start Queue</button>
          </div>
        </div>
      </div>

      <!-- TAB 2: QUEUE -->
      <div id="fi-tab-queue" class="fi-tab-content">
        <div class="fi-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span id="fi-queue-status" style="font-size:11px; font-weight:bold;">Status: Idle</span>
            <div>
              <button class="fi-pill-btn" id="fi-btn-pause">Pause</button>
              <button class="fi-pill-btn" id="fi-btn-stop" style="color:#ef4444;">Stop</button>
            </div>
          </div>
        </div>
        <div class="fi-card">
          <label class="fi-label">QUEUE PROGRESS</label>
          <div id="fi-queue-items" style="max-height: 300px; overflow-y: auto;">
            <p style="font-size:11px; color:#94a3b8; text-align:center; padding:10px;">No prompts running. Paste list in Control and click Start!</p>
          </div>
        </div>
      </div>

      <!-- TAB 3: GALLERY -->
      <div id="fi-tab-gallery" class="fi-tab-content">
        <div class="fi-card">
          <label class="fi-label">GENERATED IMAGES</label>
          <div id="fi-gallery-container" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:6px;">
            <p style="font-size:11px; color:#94a3b8; grid-column: span 2; text-align:center; padding:10px;">Generated images will appear here as they render!</p>
          </div>
        </div>
      </div>

      <!-- TAB 4: SETTINGS -->
      <div id="fi-tab-settings" class="fi-tab-content">
        <div class="fi-card">
          <label class="fi-label">DOWNLOAD SETTINGS</label>
          <div style="margin-top:6px;">
            <label style="font-size:10px; color:#94a3b8;">Save Subfolder</label>
            <input type="text" id="fi-save-folder" class="fi-input" value="flowing_images">
          </div>
          <div style="margin-top:8px;">
            <label style="font-size:10px; color:#94a3b8;">File Naming</label>
            <select id="fi-naming-scheme" class="fi-select">
              <option value="001">001, 002, 003 (Sequential)</option>
              <option value="prompt">Prompt-based</option>
            </select>
          </div>
        </div>
      </div>

      <div class="fi-footer">
        <span id="fi-footer-log">Ready. Open Google Flow project and click Start Queue.</span>
      </div>
    </div>
  `;

  // UI Interactivity logic
  const toggleBtn = document.getElementById("flowing-images-toggle-btn");
  const panel = document.getElementById("flowing-images-panel");
  const btnClose = document.getElementById("fi-btn-close");

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  btnClose.addEventListener("click", () => {
    panel.classList.remove("open");
  });

  // Tab switching
  const tabs = root.querySelectorAll(".fi-tab-btn");
  const contents = root.querySelectorAll(".fi-tab-content");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabs.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`fi-tab-${target}`).classList.add("active");
    });
  });

  // Aspect ratio picker
  let currentRatio = "16:9";
  root.querySelectorAll(".fi-ratio-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".fi-ratio-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentRatio = btn.getAttribute("data-ratio");
    });
  });

  // Speed picker
  let currentSpeed = "balanced";
  root.querySelectorAll("[data-speed]").forEach(btn => {
    btn.addEventListener("click", () => {
      root.querySelectorAll("[data-speed]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentSpeed = btn.getAttribute("data-speed");
    });
  });

  // Prompts count
  const promptTextarea = document.getElementById("fi-prompt-text");
  const promptCountSpan = document.getElementById("fi-prompt-count");

  function getCleanPrompts() {
    return promptTextarea.value
      .split("\n")
      .map(p => p.trim())
      .filter(p => {
        if (!p) return false;
        if (p.startsWith("# ZAPPIFLOW") || p.startsWith("# Total") || p.startsWith("# Audio") || p.startsWith("# Average")) return false;
        return true;
      })
      .map(p => p.replace(/^Scene\s+\d+:\s*(\[\d{2}:\d{2}\s*-\s*\d{2}:\d{2}\])?\s*/i, "").trim())
      .filter(p => p.length > 0);
  }

  promptTextarea.addEventListener("input", () => {
    const list = getCleanPrompts();
    promptCountSpan.innerText = `${list.length} prompt${list.length === 1 ? "" : "s"}`;
  });

  document.getElementById("fi-btn-clear").addEventListener("click", () => {
    promptTextarea.value = "";
    promptCountSpan.innerText = "0 prompts";
  });

  // File import button
  const fileInput = document.getElementById("fi-file-import");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        promptTextarea.value = evt.target.result;
        const list = getCleanPrompts();
        promptCountSpan.innerText = `${list.length} prompt${list.length === 1 ? "" : "s"}`;
      };
      reader.readAsText(file);
    });
  }

  // Drag and Drop support on promptTextarea
  promptTextarea.addEventListener("dragover", (e) => {
    e.preventDefault();
    promptTextarea.style.borderColor = "#3b82f6";
  });

  promptTextarea.addEventListener("dragleave", () => {
    promptTextarea.style.borderColor = "#2d3345";
  });

  promptTextarea.addEventListener("drop", (e) => {
    e.preventDefault();
    promptTextarea.style.borderColor = "#2d3345";
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        promptTextarea.value = evt.target.result;
        const list = getCleanPrompts();
        promptCountSpan.innerText = `${list.length} prompt${list.length === 1 ? "" : "s"}`;
      };
      reader.readAsText(files[0]);
    }
  });

  // Start Queue Button inside page
  document.getElementById("fi-btn-start").addEventListener("click", () => {
    const prompts = getCleanPrompts();
    if (prompts.length === 0) {
      alert("Please enter or paste at least one prompt!");
      return;
    }

    const settings = {
      speed: currentSpeed,
      model: document.getElementById("fi-select-model").value,
      aspectRatio: currentRatio,
      saveFolder: document.getElementById("fi-save-folder").value,
      namingScheme: document.getElementById("fi-naming-scheme").value,
      autoDownloadImages: true
    };

    // Switch to Queue tab
    root.querySelector('[data-tab="queue"]').click();

    // Send start message to background
    try {
      chrome.runtime.sendMessage({
        type: "START_QUEUE",
        prompts,
        settings
      }).catch(err => {
        console.error("Message error:", err);
        alert("Connection to Flowing Images background engine lost! Please refresh this page and try again.");
      });
    } catch (err) {
      alert("Extension was reloaded. Please refresh this page to reconnect Flowing Images!");
    }
  });

  document.getElementById("fi-btn-pause").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "PAUSE_QUEUE" });
  });

  document.getElementById("fi-btn-stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "STOP_QUEUE" });
  });

  // Sync state updates
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "STATE_UPDATED" && message.state) {
      const s = message.state;
      const statusEl = document.getElementById("fi-queue-status");
      const logEl = document.getElementById("fi-footer-log");
      const queueListEl = document.getElementById("fi-queue-items");

      if (s.logs && s.logs.length > 0) logEl.innerText = s.logs[0];
      if (s.isRunning) {
        statusEl.innerText = s.isPaused ? "Status: ⏸️ Paused" : `Status: ⚡ Generating (${s.currentIndex + 1}/${s.prompts.length})`;
      } else {
        statusEl.innerText = "Status: Idle";
      }

      if (s.prompts && s.prompts.length > 0) {
        queueListEl.innerHTML = s.prompts.map((p, i) => {
          let badge = "⏳ Queued";
          if (i < s.currentIndex) badge = "✅ Done";
          if (i === s.currentIndex && s.isRunning) badge = "⚡ Processing";
          return `
            <div style="padding: 4px 0; border-bottom: 1px solid #2d3345; font-size: 10px; display: flex; justify-content: space-between;">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px;">${i + 1}. ${p}</span>
              <span style="font-weight: bold; color: ${i < s.currentIndex ? '#10b981' : i === s.currentIndex ? '#3b82f6' : '#94a3b8'}">${badge}</span>
            </div>
          `;
        }).join("");
      }
    }
  });

})();
