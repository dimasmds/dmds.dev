let hljsLoaded = false;

/**
 * Dynamically loads highlight.js and its CSS only when needed.
 * Detects if the content contains code blocks before loading.
 *
 * @param {string} content - The markdown/HTML content to check for code blocks
 */
export async function loadHighlightJs(content) {
  const hasCodeBlocks =
    content.includes('```') ||
    content.includes('<code') ||
    content.includes('<pre');

  if (!hasCodeBlocks) return;

  if (!hljsLoaded) {
    // Inject highlight.js CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css';
    document.head.appendChild(link);
    hljsLoaded = true;
  }

  const hljsModule = await import('highlight.js');
  hljsModule.default.highlightAll();
}
