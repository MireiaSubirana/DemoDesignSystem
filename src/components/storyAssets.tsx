/**
 * Shared sample content for the Storybook stories.
 *
 * WHY THIS FILE EXISTS
 * Several stories need an image to drop into a `media` slot. Rather than
 * download real photos (which would break if you ever work offline, and bloat
 * the project), we draw a placeholder as an SVG and embed it directly in the
 * code as a "data URI" - a string that IS the image.
 *
 * This file is only used by stories. It is NOT exported from the design
 * system, so it never ends up in anyone's app.
 */

/**
 * Builds an SVG gradient as a data URI.
 * `encodeURIComponent` escapes the characters that are not safe inside a URL.
 */
function gradientDataUri(from: string, to: string, label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="url(#g)" />
      <text x="50%" y="50%" fill="rgba(255,255,255,0.85)" font-family="sans-serif"
            font-size="44" font-weight="600" text-anchor="middle">${label}</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * A stand-in portrait photo, in the brand orange.
 * Note the `alt` text: it describes the picture for someone who cannot see it.
 * Real alt text should describe the actual image, never say "image of".
 */
export const samplePortrait = (
  <img
    src={gradientDataUri('#ff8556', '#b33b14', 'Portrait')}
    alt="Kim, smiling, photographed against a plain wall"
  />
);

/** A stand-in screenshot for a project card. */
export const sampleProjectShot = (
  <img
    src={gradientDataUri('#2c2c2c', '#737373', 'Project')}
    alt="The Moonlearning course dashboard, showing a grid of lessons"
  />
);

/** A second, visually distinct project image. */
export const sampleProjectShotAlt = (
  <img
    src={gradientDataUri('#ffa585', '#80290d', 'Case study')}
    alt="Before and after screens from the checkout redesign"
  />
);
