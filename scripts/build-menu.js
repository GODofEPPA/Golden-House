#!/usr/bin/env node
// Regenerates the menu markup in meny.html (and the three synced prices in
// index.html's "Menyhøydepunkter" section) from data/menu.json.
//
// Run this after editing data/menu.json by hand, or after Pages CMS commits
// a change to it. In this repo it also runs automatically in CI — see
// .github/workflows/build-menu.yml — so a Pages CMS save is enough on its
// own; you only need to run it locally when testing.
//
//   node scripts/build-menu.js        (or: npm run build:menu)
//
// Why this exists instead of fetching data/menu.json in the browser: this is
// a plain static site with no build step, and rendering the menu with
// client-side JavaScript would mean Google mostly sees an empty menu page.
// This script keeps the real HTML (good for SEO and no-JS visitors) while
// still letting the menu be edited as structured data.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MENU_JSON = path.join(ROOT, 'data', 'menu.json');
const MENY_HTML = path.join(ROOT, 'meny.html');
const INDEX_HTML = path.join(ROOT, 'index.html');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Replaces everything between startMarker and endMarker (exclusive of both)
// with `replacement`, re-indenting endMarker with `endIndent` spaces since
// its original leading whitespace was part of the content being discarded.
function replaceBetweenMarkers(source, startMarker, endMarker, replacement, endIndent) {
  const startIdx = source.indexOf(startMarker);
  const endIdx = source.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(`Fant ikke markørene ${startMarker} / ${endMarker}`);
  }
  const before = source.slice(0, startIdx + startMarker.length);
  const after = source.slice(endIdx);
  return `${before}\n${replacement}\n${' '.repeat(endIndent)}${after}`;
}

function buildJumpNav(categories) {
  return categories
    .map((cat) => `        <a href="#${cat.id}">${escapeHtml(cat.title)}</a>`)
    .join('\n');
}

function buildItem(item) {
  const hasNr = typeof item.nr === 'number';
  const nrSpan = hasNr ? `<span class="menu-item-nr">${item.nr}</span>` : '';
  const badge = item.new ? '<span class="menu-badge-new">Nyhet</span>' : '';
  const nameClass = hasNr ? 'menu-item-name has-nr' : 'menu-item-name';
  return `          <div class="menu-item">
            <div>
              <p class="${nameClass}">${nrSpan}${escapeHtml(item.name)}${badge}</p>
            </div>
            <span class="menu-item-price">${item.price} kr</span>
          </div>`;
}

function buildCategory(cat) {
  const items = cat.items.map(buildItem).join('\n');
  return `      <div class="menu-category" id="${cat.id}">
        <h2>${escapeHtml(cat.title)}</h2>
        <div class="menu-items">
${items}
        </div>
      </div>`;
}

function buildCategories(categories) {
  return categories.map(buildCategory).join('\n\n');
}

function findItemByNr(categories, nr) {
  for (const cat of categories) {
    const found = cat.items.find((item) => item.nr === nr);
    if (found) return found;
  }
  return null;
}

function main() {
  const { categories } = JSON.parse(fs.readFileSync(MENU_JSON, 'utf8'));

  // --- meny.html: menu-jump nav + full category listing ---
  let meny = fs.readFileSync(MENY_HTML, 'utf8');
  meny = replaceBetweenMarkers(
    meny,
    '<!-- MENU:JUMP:START (generert av scripts/build-menu.js fra data/menu.json — ikke rediger for hånd, kjør "npm run build:menu" etter endring) -->',
    '<!-- MENU:JUMP:END -->',
    buildJumpNav(categories),
    8
  );
  meny = replaceBetweenMarkers(
    meny,
    '<!-- MENU:CATEGORIES:START (generert av scripts/build-menu.js fra data/menu.json — ikke rediger for hånd, kjør "npm run build:menu" etter endring) -->',
    '<!-- MENU:CATEGORIES:END -->',
    buildCategories(categories),
    6
  );
  fs.writeFileSync(MENY_HTML, meny);

  // --- index.html: keep the three "Menyhøydepunkter" prices in sync ---
  let index = fs.readFileSync(INDEX_HTML, 'utf8');
  index = index.replace(
    /(<span class="price" data-menu-nr="(\d+)">)\d+( kr<\/span>)/g,
    (full, prefix, nrStr, suffix) => {
      const item = findItemByNr(categories, Number(nrStr));
      if (!item) {
        console.warn(`Advarsel: fant ingen rett med nr ${nrStr} i data/menu.json (index.html)`);
        return full;
      }
      return `${prefix}${item.price}${suffix}`;
    }
  );
  fs.writeFileSync(INDEX_HTML, index);

  const itemCount = categories.reduce((sum, c) => sum + c.items.length, 0);
  console.log(`Bygget meny: ${categories.length} kategorier, ${itemCount} retter.`);
}

main();
