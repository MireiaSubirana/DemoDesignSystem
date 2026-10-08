/**
 * Menu
 * Mirrors the Figma component set "Menu" (node 1:52).
 *
 * WHAT THIS IS
 * The little icon button that opens and closes navigation on small screens -
 * what people usually call a "hamburger" menu.
 *
 * TWO THINGS TO KNOW ABOUT THE FIGMA SOURCE (both in gaps.md)
 * 1. The Figma property is called "Property 1", which means nothing. A prop
 *    literally named "Property 1" is unusable in React (you cannot type a
 *    space in a prop name), so this component calls it `state`. The OPTIONS
 *    are unchanged: "close" and "open".
 * 2. The two options look swapped. In Figma, "close" draws the two stacked
 *    bars (the icon you press to OPEN a menu) and "open" draws the X (the icon
 *    you press to CLOSE it). This component reproduces Figma exactly rather
 *    than silently fixing it, so what you see here matches the design file.
 */

import styles from './Menu.module.css';

/** Matches the options of Figma's "Property 1". */
export type MenuState = 'close' | 'open';

export interface MenuProps {
  /**
   * Which icon to draw. `close` is the two-bar "hamburger" icon; `open` is the
   * X icon. (Yes, that reads backwards - it matches Figma. See gaps.md.)
   */
  state?: MenuState;
  /** Called when the icon is clicked - use it to show or hide your menu. */
  onClick?: () => void;
  /**
   * Whether the menu this button controls is currently open. This is what
   * actually gets announced to screen readers, so set it honestly even though
   * the Figma variant naming is confusing.
   */
  expanded?: boolean;
  /** What a screen reader announces for the button itself. */
  label?: string;
}

export function Menu({
  state = 'close',
  onClick,
  expanded = false,
  label = 'Menu',
}: MenuProps) {
  return (
    <button
      className={styles.menu}
      onClick={onClick}
      // aria-expanded is the standard way to tell assistive technology
      // "this button opens something, and it is currently open/closed".
      aria-expanded={expanded}
      aria-label={label}
      type="button"
    >
      {/* The icon is drawn with two <span>s rather than an image file, so it
        * picks up its colour from a token and stays crisp at any zoom level.
        * The CSS rotates them into an X for the "open" state. */}
      <span className={`${styles.bar} ${styles[state]}`} />
      <span className={`${styles.bar} ${styles[state]}`} />
    </button>
  );
}
