/**
 * Logo
 * Mirrors the Figma component "Logo" (node 1:110).
 *
 * In Figma this is literally a 48x48 orange circle, used as a placeholder for
 * a real logo. It is kept as its own component so that when you do have a real
 * logo, you only have to change it in one place.
 */

import styles from './Logo.module.css';

export interface LogoProps {
  /**
   * The text a screen reader announces in place of the logo. Defaults to a
   * sensible value; change it to the site or person's name.
   */
  label?: string;
}

export function Logo({ label = 'Home' }: LogoProps) {
  return (
    // role="img" + aria-label tells a screen reader "this is a picture, and
    // here is what it means". Without it, a blind user hears nothing at all.
    <div className={styles.logo} role="img" aria-label={label} />
  );
}
