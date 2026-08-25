/**
 * File Namer Utility for Flowing Images
 * Formats filenames based on user settings (Numbering, Prompt-based, Custom prefix).
 */

const FileNamer = {
  /**
   * Format output filename
   * @param {Object} options
   * @param {number} options.index - Current item index (1-based)
   * @param {string} options.prompt - Prompt text
   * @param {string} options.namingScheme - "001", "prompt", or "custom"
   * @param {string} options.customPrefix - Optional prefix string
   * @param {number} options.startNumber - Starting number integer (default 1)
   * @param {string} options.extension - File extension (e.g. "jpg", "png", "mp4")
   */
  formatFilename(options) {
    const {
      index = 1,
      prompt = "",
      namingScheme = "001",
      customPrefix = "flowing",
      startNumber = 1,
      extension = "jpg"
    } = options;

    const num = index + (startNumber - 1);
    const paddedNum = String(num).padStart(3, "0");

    if (namingScheme === "prompt") {
      const slug = prompt
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .substring(0, 50);
      return `${paddedNum}_${slug}.${extension}`;
    } else if (namingScheme === "custom") {
      const cleanPrefix = (customPrefix || "scene").replace(/[^a-zA-Z0-9_-]/g, "");
      return `${cleanPrefix}_${paddedNum}.${extension}`;
    } else {
      // Default: "001, 002, 003"
      return `${paddedNum}.${extension}`;
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FileNamer;
} else if (typeof window !== 'undefined') {
  window.FileNamer = FileNamer;
}
