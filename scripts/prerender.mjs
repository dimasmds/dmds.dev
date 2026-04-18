#!/usr/bin/env node

/**
 * Custom prerender script for dmds.dev
 *
 * This script creates static HTML files for each route in the SPA,
 * enabling proper SEO meta tags and direct URL access on GitHub Pages.
 *
 * Usage:
 *   node scripts/prerender.mjs          # Run after `npm run build`
 *   npm run build && node scripts/prerender.mjs
 *
 * What it does:
 *   1. Reads the built dist/index.html
 *   2. For each route, creates dist/<route>/index.html with:
 *      - Page-specific <title>
 *      - <meta name="description"> tag
 *      - <link rel="canonical"> tag
 *      - Open Graph meta tags (og:title, og:description, og:url, og:type)
 *      - Twitter card meta tags
 *      - A <script>var __INITIAL_ROUTE__ = "/path";</script> for instant route matching
 *   3. Also creates a dist/404.html as fallback for unmatched routes
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SITE_URL = 'https://dmds.dev';

// ---------------------------------------------------------------------------
// Static page definitions
// ---------------------------------------------------------------------------
const staticPages = [
  {
    route: '/',
    title: 'Dimas Maulana Dwi Saputra | Software Engineer',
    description:
      'Engineering Manager with 5+ years of experience in web development. AWS Certified, React Developer, Node.js enthusiast based in Bandung.',
    type: 'website',
  },
  {
    route: '/about',
    title: 'About | Dimas Maulana Dwi Saputra',
    description:
      'Learn more about Dimas Maulana Dwi Saputra - Engineering Manager, Software Engineer, and tech speaker based in Bandung.',
    type: 'website',
  },
  {
    route: '/notebooks',
    title: 'Notebooks | Dimas Maulana Dwi Saputra',
    description:
      'Secuil catatan yang perlu disimpan dan dibagikan - articles about software engineering, parenting, and life.',
    type: 'website',
  },
  {
    route: '/talks',
    title: 'Tech Talks | Dimas Maulana Dwi Saputra',
    description:
      'Tech talks and developer coaching sessions by Dimas Maulana Dwi Saputra.',
    type: 'website',
  },
];

// ---------------------------------------------------------------------------
// Notebook definitions (mirrors src/content/index.js -> notebooks)
// ---------------------------------------------------------------------------
const notebooks = [
  {
    slug: 'tiga-belas-tahun-di-makkah',
    title: 'Tiga Belas Tahun di Makkah: Pelajaran dari Seerah yang Mengubah Cara Saya Melihat Perjalanan Spiritual',
    tags: ['Islami', 'Seerah', 'Spiritual'],
    date: '2026-04-17',
    content: '/contents/notebooks/26/04/17_01.md',
  },
  {
    slug: 'lima-detik-yang-lebih-berharga-dari-lima-jam',
    title: 'Lima Detik yang Lebih Berharga dari Lima Jam',
    tags: ['Parenting', 'Fatherhood', 'Engineering Manager'],
    date: '2026-04-16',
    content: '/contents/notebooks/26/04/16_01.md',
  },
  {
    slug: 'mengenal-clawdbot-asisten-ai-pribadi',
    title: 'Mengenal ClawDBot: Asisten AI Pribadi',
    tags: ['AI', 'OpenClaw', 'Zai'],
    date: '2026-03-08',
    content: '/contents/notebooks/26/03/08_01.md',
  },
  {
    slug: 'seru-seruan-bareng-ai-pakai-node-js',
    title: 'Seru-seruan bareng AI pakai Node.js',
    tags: ['AI', 'Developer', 'Node.js'],
    date: '2024-02-28',
    content: '/contents/notebooks/24/02/28_01.md',
  },
  {
    slug: 'bulan-unordinary-woman-bab-1',
    title: 'Bulan, Unordinary Woman - Bab 1: Dahaga',
    tags: ['story', 'bulan'],
    date: '2022-02-24',
    content: '/contents/notebooks/22/02/24_01.md',
  },
  {
    slug: 'bulan-unordinary-woman-pengantar',
    title: 'Bulan, Unordinary Woman - Pengantar',
    tags: ['story', 'bulan'],
    date: '2022-02-23',
    content: '/contents/notebooks/22/02/23_01.md',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Try to read the first ~160 characters of a notebook's markdown content
 * to use as the meta description. Falls back to a generic description.
 */
function getDescriptionForNotebook(notebook) {
  const mdPath = resolve(ROOT, 'public', notebook.content.replace(/^\//, ''));
  try {
    if (!existsSync(mdPath)) {
      return `Baca "${notebook.title}" di dmds.dev.`;
    }
    const raw = readFileSync(mdPath, 'utf-8');
    // Strip front-matter (if any), markdown syntax, and extract plain text
    const plain = raw
      .replace(/^---[\s\S]*?---/m, '') // YAML front-matter
      .replace(/!\[.*?\]\(.*?\)/g, '') // images
      .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links → text
      .replace(/#{1,6}\s+/g, '') // headings
      .replace(/[*_~`>]/g, '') // emphasis / code / blockquote
      .replace(/\n{2,}/g, ' ') // newlines → space
      .trim();

    if (plain.length === 0) {
      return `Baca "${notebook.title}" di dmds.dev.`;
    }

    // First 160 chars, break at last space to avoid cutting a word
    if (plain.length <= 160) return plain;
    const truncated = plain.slice(0, 160);
    const lastSpace = truncated.lastIndexOf(' ');
    return `${truncated.slice(0, lastSpace)}…`;
  } catch {
    return `Baca "${notebook.title}" di dmds.dev.`;
  }
}

/**
 * Build the full set of page data objects (static + notebook pages).
 */
function buildAllPages() {
  const notebookPages = notebooks.map((nb) => ({
    route: `/notebooks/${nb.slug}`,
    title: `${nb.title} | Dimas Maulana Dwi Saputra`,
    description: getDescriptionForNotebook(nb),
    type: 'article',
    publishedTime: nb.date,
    tags: nb.tags,
  }));

  return [...staticPages, ...notebookPages];
}

/**
 * Generate the extra <head> inner HTML for a given page.
 */
function buildHeadExtras(page) {
  const url = `${SITE_URL}${page.route}`;
  const lines = [];

  // Title – replace the existing <title> later, but also add og:title
  lines.push(`    <meta property="og:title" content="${escapeAttr(page.title)}" />`);
  // Note: description meta is already replaced in step 2 of createRouteHtml, skip here
  lines.push(`    <meta property="og:description" content="${escapeAttr(page.description)}" />`);
  lines.push(`    <meta property="og:url" content="${url}" />`);
  lines.push(`    <meta property="og:type" content="${page.type || 'website'}" />`);
  lines.push(`    <meta property="og:site_name" content="Dimas Maulana Dwi Saputra" />`);
  lines.push(`    <link rel="canonical" href="${url}" />`);

  // Twitter card
  lines.push(`    <meta name="twitter:card" content="summary_large_image" />`);
  lines.push(`    <meta name="twitter:title" content="${escapeAttr(page.title)}" />`);
  lines.push(`    <meta name="twitter:description" content="${escapeAttr(page.description)}" />`);

  // Article-specific tags
  if (page.publishedTime) {
    lines.push(`    <meta property="article:published_time" content="${page.publishedTime}" />`);
  }
  if (page.tags && page.tags.length > 0) {
    for (const tag of page.tags) {
      lines.push(`    <meta property="article:tag" content="${escapeAttr(tag)}" />`);
    }
  }

  return lines.join('\n');
}

/**
 * Build the __INITIAL_ROUTE__ script block that goes right before the
 * main module script. This lets the app know which route was requested
 * so BrowserRouter can navigate instantly (no flash of wrong content).
 */
function buildRouteScript(route) {
  return `    <script>var __INITIAL_ROUTE__ = "${route}";</script>`;
}

/**
 * Escape a string for safe use inside an HTML attribute value enclosed
 * in double-quotes.
 */
function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Transform the base index.html into a route-specific version.
 */
function createRouteHtml(baseHtml, page) {
  let html = baseHtml;

  // 1. Replace the <title> tag
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttr(page.title)}</title>`,
  );

  // 2. Replace the existing meta description
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*\/?>/i,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
  );

  // 3. Inject extra head tags right before </head>
  const headExtras = buildHeadExtras(page);
  html = html.replace(
    '</head>',
    `${headExtras}\n  </head>`,
  );

  // 4. Inject __INITIAL_ROUTE__ script right before the main module script
  const routeScript = buildRouteScript(page.route);
  html = html.replace(
    /(<script\s+type="module")/,
    `${routeScript}\n$1`,
  );

  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const indexPath = resolve(DIST, 'index.html');

  if (!existsSync(indexPath)) {
    console.error(
      '❌ dist/index.html not found. Run `npm run build` first.',
    );
    process.exit(1);
  }

  console.log('📄 Reading dist/index.html …');
  const baseHtml = readFileSync(indexPath, 'utf-8');

  const pages = buildAllPages();

  let created = 0;

  for (const page of pages) {
    const routeHtml = createRouteHtml(baseHtml, page);

    // Determine output path
    // Route "/" → dist/index.html (overwrite with SEO-enhanced version)
    // Route "/about" → dist/about/index.html
    // Route "/notebooks/slug" → dist/notebooks/slug/index.html
    let outDir;
    if (page.route === '/') {
      outDir = DIST;
    } else {
      outDir = resolve(DIST, page.route.replace(/^\//, ''));
    }

    mkdirSync(outDir, { recursive: true });

    const outFile = resolve(outDir, 'index.html');
    writeFileSync(outFile, routeHtml, 'utf-8');
    created += 1;
    console.log(`  ✅ ${page.route} → ${resolve(DIST, page.route.replace(/^\//, '') || 'index.html')}`);
  }

  // Also create a 404.html (copy of the root index.html with route hint)
  // GitHub Pages serves 404.html for any unmatched path, which allows
  // the SPA to boot and handle the route via BrowserRouter.
  console.log('📄 Creating dist/404.html fallback …');
  const fallbackHtml = baseHtml.replace(
    /(<script\s+type="module")/,
    `${buildRouteScript('/404-fallback')}\n$1`,
  );
  writeFileSync(resolve(DIST, '404.html'), fallbackHtml, 'utf-8');
  console.log('  ✅ /404.html');

  console.log(`\n🎉 Prerender complete! ${created} route(s) + 404 fallback generated.\n`);
}

main();
