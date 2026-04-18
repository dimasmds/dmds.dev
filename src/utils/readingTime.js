/**
 * Calculate estimated reading time for markdown text.
 * Uses 200 words per minute as average reading speed for Indonesian text.
 *
 * @param {string} text - Markdown content
 * @returns {string} Reading time estimate, e.g. "3 menit baca"
 */
export function readingTime(text) {
  if (!text || typeof text !== 'string') return '1 menit baca';

  // Strip markdown syntax
  const plainText = text
    .replace(/!\[.*?\]\(.*?\)/g, '')        // images
    .replace(/\[.*?\]\(.*?\)/g, '')          // links (keep link text? no, remove for cleaner count)
    .replace(/^#{1,6}\s+.*/gm, '')           // headings
    .replace(/```[\s\S]*?```/g, '')           // code blocks
    .replace(/`[^`]+`/g, '')                 // inline code
    .replace(/\*\*.*?\*\*/g, '')             // bold
    .replace(/_.*?_/g, '')                   // italic
    .replace(/~~.*?~~/g, '')                 // strikethrough
    .replace(/>\s+.*/gm, '')                 // blockquotes
    .replace(/[-*+]\s+/gm, '')               // unordered list markers
    .replace(/\d+\.\s+/gm, '')               // ordered list markers
    .replace(/---+/g, '')                    // horizontal rules
    .replace(/\|/g, '')                      // table pipes
    .replace(/[*_`~#>|]/g, '')               // remaining markdown chars
    .replace(/\n+/g, ' ')                    // newlines to spaces
    .trim();

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / 200);

  return `${Math.max(1, minutes)} menit baca`;
}
