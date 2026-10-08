/**
 * useBreakpoint - works out which layout the page should be using.
 *
 * WHY THIS EXISTS
 * Every layout component takes a `breakpoint` prop ("desktop" / "tablet" /
 * "mobile"), because that is how Figma models it. That is perfect in
 * Storybook, where you want to SHOW all three side by side.
 *
 * But on a real website nobody picks the breakpoint by hand - it has to
 * follow the actual browser window as the visitor resizes it. This little
 * function does that: it watches the window width and tells you which of the
 * three you are currently in.
 *
 * WHAT A "HOOK" IS
 * A function starting with `use` that lets a component remember something and
 * react to changes. When the answer here changes, React automatically redraws
 * any component using it. You do not have to do anything.
 *
 * THE THRESHOLDS
 * These are the same numbers as the Figma frames and the font-size modes in
 * tokens.css, so the layout and the type scale always change together:
 *   under 800px        -> mobile
 *   800px to 1279px    -> tablet
 *   1280px and up      -> desktop
 */

import { useSyncExternalStore } from 'react';
import type { Breakpoint } from './components/breakpoint';

const TABLET_MIN = 800;
const DESKTOP_MIN = 1280;

/** Turns a pixel width into one of the three names. */
function widthToBreakpoint(width: number): Breakpoint {
  if (width >= DESKTOP_MIN) return 'desktop';
  if (width >= TABLET_MIN) return 'tablet';
  return 'mobile';
}

/**
 * Tells React how to listen for changes. React calls this with a `notify`
 * function; we promise to call `notify` whenever the answer might have
 * changed - here, whenever the window is resized.
 *
 * The returned function is the "clean up": React calls it to stop listening
 * when the component disappears, so we do not leak listeners.
 */
function subscribe(notify: () => void) {
  window.addEventListener('resize', notify);
  return () => window.removeEventListener('resize', notify);
}

/** Reads the current answer. */
function getSnapshot(): Breakpoint {
  return widthToBreakpoint(window.innerWidth);
}

/**
 * The answer to use when there is no browser window at all - which happens if
 * the page is ever rendered on a server. Desktop is the safe default.
 */
function getServerSnapshot(): Breakpoint {
  return 'desktop';
}

/**
 * Use it like this:
 *
 *   const breakpoint = useBreakpoint();
 *   return <Hero breakpoint={breakpoint} />;
 */
export function useBreakpoint(): Breakpoint {
  // useSyncExternalStore is React's built-in way to read something that lives
  // outside React - here, the browser window. It handles all the fiddly parts
  // (resizing, cleaning up, avoiding stale values) for us.
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
