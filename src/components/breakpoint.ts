/**
 * Shared breakpoint type.
 *
 * Five of the Figma component sets (Navigation, Hero, About, ProjectCard,
 * Skills, Footer) have a `breakpoint` property with the same three options.
 * Rather than repeat that list in six files, it lives here once.
 *
 * WHY A PROP AND NOT JUST CSS MEDIA QUERIES?
 * In a finished website you would normally let CSS media queries pick the
 * layout automatically from the window width. But Figma models it as an
 * explicit choice, and for a design system that is genuinely useful: it lets
 * Storybook show the desktop, tablet and mobile layouts side by side on one
 * page, without resizing the browser. So the prop stays.
 *
 * The widths come from the Figma frames: mobile 375px, tablet 800px,
 * desktop 1280px - the same thresholds as the font-size modes in tokens.css.
 */
export type Breakpoint = 'desktop' | 'tablet' | 'mobile';
