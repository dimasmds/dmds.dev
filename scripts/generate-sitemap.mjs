import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'https://dmds.dev';
const TODAY = new Date().toISOString().split('T')[0];

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
  // We strip any icon imports by just evaluating the array literal
  const arrayStr = match[1];
  // eslint-disable-next-line no-eval
  const notebooks = eval(`(${arrayStr})`);
  return notebooks;
}

function buildUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const notebooks = getNotebooks();

  // Static routes
  const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: '0.8' },
    { path: '/about', changefreq: 'weekly', priority: '0.8' },
    { path: '/talks', changefreq: 'weekly', priority: '0.8' },
    { path: '/notebooks', changefreq: 'daily', priority: '0.9' },
  ];

  const urls = [];

  // Add static routes
  for (const route of staticRoutes) {
    urls.push(
      buildUrlEntry(
        `${BASE_URL}${route.path}`,
        TODAY,
        route.changefreq,
        route.priority
      )
    );
  }

  // Add notebook article routes
  for (const notebook of notebooks) {
    urls.push(
      buildUrlEntry(
        `${BASE_URL}/notebooks/${notebook.slug}`,
        notebook.date || TODAY,
        'monthly',
        '0.7'
      )
    );
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  const outputPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  console.log(`Sitemap generated at public/sitemap.xml with ${urls.length} URLs`);
}

generateSitemap();
