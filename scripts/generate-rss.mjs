import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'https://dmds.dev';

// Parse notebooks from src/content/index.js without importing React icons
function getNotebooks() {
  const contentPath = path.join(ROOT_DIR, 'src/content/index.js');
  const content = fs.readFileSync(contentPath, 'utf-8');

  // Extract the notebooks array using regex
  const match = content.match(/export const notebooks = (\[[\s\S]*?\n\]);/);
  if (!match) {
    console.warn('Could not parse notebooks from content file');
    return [];
  }

  // Use eval to parse the array (it's a simple data array with no function calls)
  const arrayStr = match[1];
  // eslint-disable-next-line no-eval
  const notebooks = eval(`(${arrayStr})`);
  return notebooks;
}

// Strip markdown syntax from text
function stripMarkdown(md) {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, '')       // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links - keep text
    .replace(/#{1,6}\s+/g, '')             // headings
    .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, '$2') // bold/italic
    .replace(/`{1,3}[^`]*`{1,3}/g, '')     // inline code
    .replace(/>\s+/g, '')                   // blockquotes
    .replace(/[-*+]\s+/g, '')               // unordered list markers
    .replace(/\d+\.\s+/g, '')               // ordered list markers
    .replace(/---+/g, '')                   // horizontal rules
    .replace(/\n{2,}/g, ' ')                // multiple newlines
    .replace(/\n/g, ' ')                    // single newlines
    .trim();
}

// Convert date string to RFC 822 format
function toRFC822(dateStr) {
  const date = new Date(dateStr);
  return date.toUTCString();
}

// Escape XML special characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSS() {
  const notebooks = getNotebooks();

  const items = notebooks.map((notebook) => {
    // Read the markdown content file
    const contentPath = path.join(ROOT_DIR, 'public', notebook.content);
    let description = '';
    if (fs.existsSync(contentPath)) {
      const mdContent = fs.readFileSync(contentPath, 'utf-8');
      const stripped = stripMarkdown(mdContent);
      description = stripped.substring(0, 300);
      if (stripped.length > 300) {
        description += '...';
      }
    }

    const link = `${BASE_URL}/notebooks/${notebook.slug}`;
    const pubDate = toRFC822(notebook.date);

    const categoryTags = (notebook.tags || [])
      .map((tag) => `      <category>${escapeXml(tag)}</category>`)
      .join('\n');

    return `    <item>
      <title>${escapeXml(notebook.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
${categoryTags}
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dimas Maulana Dwi Saputra</title>
    <link>${BASE_URL}</link>
    <description>Secuil catatan yang perlu disimpan dan dibagikan</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>`;

  const outputPath = path.join(ROOT_DIR, 'public', 'rss.xml');
  fs.writeFileSync(outputPath, rss, 'utf-8');
  console.log(`RSS feed generated at public/rss.xml with ${notebooks.length} items`);
}

generateRSS();
