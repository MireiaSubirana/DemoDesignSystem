/**
 * Hero
 * Mirrors the Figma component set "Hero" (node 8:867).
 *
 * WHAT THIS IS
 * The big introduction block at the top of a page: a small name/subtitle, and
 * underneath it the largest piece of text on the whole site.
 *
 * All three breakpoints stack vertically - only the padding changes - so this
 * is the simplest of the layout components.
 */

import type { Breakpoint } from '../breakpoint';
import styles from './Hero.module.css';

export interface HeroProps {
  /**
   * The main headline - the biggest text on the page. In Figma this is the
   * `headline` text property, and its default contains a line break.
   * Line breaks you type here are preserved (see the CSS note about
   * `white-space`).
   */
  headline?: string;
  /**
   * The smaller line above the headline - typically a name or role.
   * Not a Figma property: in the design it is fixed text, but it is obviously
   * meant to be changed, so it is exposed as a prop. Noted in gaps.md.
   */
  subtitle?: string;
  /** Which padding set to use. The layout itself is identical at all three. */
  breakpoint?: Breakpoint;
  /**
   * The heading level this renders as. Defaults to `h1`, which is correct when
   * the Hero is the top of a page - every page should have exactly one h1.
   * Change it if you use a Hero somewhere further down the page.
   */
  as?: 'h1' | 'h2';
}

export function Hero({
  headline = 'UX. UI. \nAgentic AI.',
  subtitle = 'James Jones',
  breakpoint = 'desktop',
  as: Heading = 'h1',
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${styles[breakpoint]}`}>
      <div className={styles.container}>
        <p className={styles.subtitle}>{subtitle}</p>
        {/* `Heading` is a capitalised variable, which is how React renders a
          * tag chosen at runtime - here either <h1> or <h2>. */}
        <Heading className={styles.headline}>{headline}</Heading>
      </div>
    </section>
  );
}
