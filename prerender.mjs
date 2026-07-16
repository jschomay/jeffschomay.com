// ──────────────────────────────────────────────────────────────────
// Build-time prerender. Runs after `vite build` (see package.json):
//   1. vite build            → dist/ (client bundle, empty #root)
//   2. vite build --ssr ...  → dist-ssr/entry-server.js
//   3. node prerender.mjs    → injects rendered HTML into dist/index.html
// The HTML comes from the same App.jsx + data.js the browser runs,
// so crawlers see exactly what visitors see.
// ──────────────────────────────────────────────────────────────────
import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from './dist-ssr/entry-server.js';
import { PROFILE, SOCIAL_LINKS, FOOTER_LINKS } from './src/data.js';

const htmlPath = new URL('./dist/index.html', import.meta.url);
const marker = '<div id="root"></div>';

const template = await readFile(htmlPath, 'utf8');
if (!template.includes(marker)) {
  throw new Error(`prerender: marker ${marker} not found in dist/index.html`);
}

// Person card for search engines / recruiter software, built from the
// same data.js the page renders from.
const sameAs = [...new Set([...SOCIAL_LINKS, ...FOOTER_LINKS].map(([, href]) => href))].filter(
  (href) => href.startsWith('http')
);
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  url: PROFILE.url,
  image: new URL('assets/headshot.jpg', PROFILE.url).href,
  jobTitle: PROFILE.jobTitle,
  description: PROFILE.description,
  knowsAbout: PROFILE.knowsAbout,
  sameAs,
};
const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

const appHtml = render();
const out = template
  .replace(marker, `<div id="root">${appHtml}</div>`)
  .replace('</head>', `  ${jsonLdTag}\n  </head>`);
await writeFile(htmlPath, out);
await rm(new URL('./dist-ssr/', import.meta.url), { recursive: true, force: true });

console.log(`✓ prerendered dist/index.html (+${(appHtml.length / 1024).toFixed(1)} kB static HTML + JSON-LD)`);
