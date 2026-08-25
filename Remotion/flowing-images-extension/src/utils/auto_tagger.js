/**
 * Auto-Tagger Utility for Flowing Images
 * Parses tags in prompt text (e.g. #hero, #landscape, [character]) and matches against library tags.
 */

const AutoTagger = {
  /**
   * Extract tags from prompt text.
   * Matches both #tag format and [tag] format.
   */
  extractTags(promptText) {
    if (!promptText) return [];
    const hashTags = (promptText.match(/#([a-zA-Z0-9_-]+)/g) || []).map(t => t.substring(1));
    const bracketTags = (promptText.match(/\[([a-zA-Z0-9_-]+)\]/g) || []).map(t => t.substring(1, t.length - 1));
    return Array.from(new Set([...hashTags, ...bracketTags]));
  },

  /**
   * Remove tags from prompt text to clean it for submission.
   */
  cleanPromptText(promptText) {
    if (!promptText) return "";
    return promptText
      .replace(/#([a-zA-Z0-9_-]+)/g, "")
      .replace(/\[([a-zA-Z0-9_-]+)\]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  },

  /**
   * Match extracted tags with reference library images.
   * @param {Array<string>} tags - List of extracted tag names
   * @param {Array<Object>} libraryImages - List of library items { tag, dataUrl/file }
   */
  matchReferences(tags, libraryImages) {
    if (!tags.length || !libraryImages || !libraryImages.length) return [];
    const matched = [];
    for (const tag of tags) {
      const found = libraryImages.find(img => img.tag.toLowerCase() === tag.toLowerCase());
      if (found) {
        matched.push(found);
      }
    }
    return matched;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AutoTagger;
} else if (typeof window !== 'undefined') {
  window.AutoTagger = AutoTagger;
}
