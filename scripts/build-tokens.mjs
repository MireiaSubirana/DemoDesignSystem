/**
 * build-tokens.mjs
 *
 * WHAT THIS DOES
 * Reads tokens.json (the values copied out of Figma) and writes src/styles/tokens.css,
 * where every token becomes a CSS variable like `--color-brand-500: #ff6330;`.
 *
 * WHY IT EXISTS
 * We never want to type a colour or a size twice. tokens.json is the one place values
 * live; this script mechanically derives the CSS from it. If Figma changes, you update
 * tokens.json and re-run `npm run build:tokens` - you never hand-edit tokens.css.
 * (That is also why tokens.css starts with a "do not edit" warning.)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Work out where this script lives, so the paths below work no matter where you run it from.
const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, '..');

const tokens = JSON.parse(readFileSync(join(projectRoot, 'tokens.json'), 'utf8'));

/**
 * Turns a Figma token name into a CSS variable name.
 * Figma uses slashes to group things ("color/brand/500"); CSS variables use dashes
 * and must start with two of them. So: color/brand/500  ->  --color-brand-500
 */
function toCssVarName(figmaName) {
  return '--' + figmaName.replace(/\//g, '-');
}

/**
 * Turns one token value into the text that goes on the right of the colon in CSS.
 * Three cases:
 *  1. An alias ({ alias: "color/neutral/900" }) becomes var(--color-neutral-900).
 *     This is the important one: because it stays a reference rather than being
 *     flattened to a hex code, switching to dark mode only has to change the
 *     semantic token - everything pointing at it updates for free.
 *  2. A number gets the collection's unit appended (16 -> "16px").
 *  3. Anything else (a colour hex, a font name) is used as-is.
 */
function toCssValue(value, unit) {
  if (value && typeof value === 'object' && 'alias' in value) {
    return `var(${toCssVarName(value.alias)})`;
  }
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }
  return String(value);
}

// We collect CSS declarations into buckets, keyed by the selector or media query
// they belong to. Using a Map keeps the insertion order predictable.
const buckets = new Map();

function addTo(selector, line) {
  if (!buckets.has(selector)) buckets.set(selector, []);
  buckets.get(selector).push(line);
}

// ---- Step 1: every variable from every collection -------------------------
for (const [collectionName, collection] of Object.entries(tokens.collections)) {
  for (const [tokenName, token] of Object.entries(collection.tokens)) {
    // A token can override the collection's unit (e.g. font-weight is a plain
    // number even though the rest of "text primitives" is measured in px).
    const unit = token.unit !== undefined ? token.unit : collection.unit;

    for (const [modeName, rawValue] of Object.entries(token.values)) {
      const selector = collection.cssStrategy[modeName];
      if (!selector) {
        throw new Error(
          `No cssStrategy for mode "${modeName}" in collection "${collectionName}". ` +
          `Add one to tokens.json so the script knows which selector it belongs in.`
        );
      }
      addTo(selector, `  ${toCssVarName(tokenName)}: ${toCssValue(rawValue, unit)};`);
    }
  }
}

// ---- Step 2: the typography recipes become real CSS classes ---------------
// A Figma text style bundles several properties together. Rather than make every
// component repeat them, we emit one class per style and components just use it.
const typographyClasses = [];

for (const [styleName, style] of Object.entries(tokens.typographyStyles.styles)) {
  // font/display/md  ->  .font-display-md
  const className = '.' + styleName.replace(/\//g, '-');

  const declarations = [
    `  font-family: var(${toCssVarName(style.fontFamily)}), sans-serif;`,
    `  font-size: var(${toCssVarName(style.fontSize)});`,
    `  font-weight: var(${toCssVarName(style.fontWeight)});`,
    `  line-height: ${style.lineHeight};`,
    `  letter-spacing: ${style.letterSpacing};`,
  ];
  // These two are optional - only some styles have them.
  if (style.textTransform) declarations.push(`  text-transform: ${style.textTransform};`);
  if (style.textDecoration) declarations.push(`  text-decoration: ${style.textDecoration};`);

  typographyClasses.push(
    `/* ${styleName} - ${style.description} */\n` +
    `${className} {\n${declarations.join('\n')}\n}`
  );
}

// ---- Step 3: assemble the file -------------------------------------------
const header = `/* =============================================================================
 * tokens.css - GENERATED FILE, DO NOT EDIT BY HAND
 * =============================================================================
 * Generated from tokens.json by scripts/build-tokens.mjs.
 * To change a value: edit tokens.json, then run \`npm run build:tokens\`.
 *
 * Source: Figma file "${tokens.$about.source.figmaFile}"
 * Read on: ${tokens.$about.source.readOn}
 * ${tokens.$about.source.totalVariables} variables across ${tokens.$about.source.totalCollections} collections, plus ${Object.keys(tokens.typographyStyles.styles).length} text styles.
 *
 * HOW DARK MODE WORKS
 *   Light is the default. Add data-theme="dark" to the <html> element (or any
 *   wrapper) and every semantic colour below re-points itself at a different
 *   primitive. Components need no dark-mode code at all.
 *
 * HOW RESPONSIVE TYPE WORKS
 *   Font sizes are written mobile-first. The base values are the small-screen
 *   ones; the media queries at the bottom enlarge them on wider screens.
 * ============================================================================= */
`;

const sections = [];
for (const [selector, lines] of buckets) {
  if (selector.startsWith('@media')) {
    // A media query has to wrap a :root block inside itself.
    sections.push(`${selector} {\n  :root {\n  ${lines.join('\n  ')}\n  }\n}`);
  } else {
    sections.push(`${selector} {\n${lines.join('\n')}\n}`);
  }
}

const output = [
  header,
  sections.join('\n\n'),
  '\n/* =============================================================================\n * TYPOGRAPHY CLASSES\n * One class per Figma text style. Put the class on an element and it gets the\n * whole recipe - size, weight, family, line height, letter spacing, casing.\n * ============================================================================= */\n',
  typographyClasses.join('\n\n'),
  '',
].join('\n');

mkdirSync(join(projectRoot, 'src/styles'), { recursive: true });
writeFileSync(join(projectRoot, 'src/styles/tokens.css'), output, 'utf8');

// A short report so you can see it worked.
let variableCount = 0;
for (const c of Object.values(tokens.collections)) variableCount += Object.keys(c.tokens).length;
console.log(`tokens.css written.`);
console.log(`  ${variableCount} variables -> CSS custom properties`);
console.log(`  ${Object.keys(tokens.typographyStyles.styles).length} text styles -> CSS classes`);
console.log(`  ${buckets.size} selectors/media queries: ${[...buckets.keys()].join(', ')}`);
