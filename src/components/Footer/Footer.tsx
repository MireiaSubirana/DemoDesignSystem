/**
 * Footer
 * Mirrors the Figma component set "Footer" (node 2:511).
 *
 * WHAT THIS IS
 * The dark strip at the bottom of the page: a copyright line plus a couple of
 * links. In a row on desktop and tablet, stacked on mobile.
 *
 * Note it uses the "inverse" tokens - a dark background with light text in
 * light mode, and the reverse in dark mode. That swap is automatic.
 */

import type { Breakpoint } from '../breakpoint';
import styles from './Footer.module.css';

/** One footer link. */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  /** The copyright line. Fixed text in Figma, exposed here - see gaps.md. */
  copyright?: string;
  /** The links shown after the copyright. Defaults to Figma's two. */
  links?: FooterLink[];
  /** `desktop` and `tablet` show a row; `mobile` stacks. */
  breakpoint?: Breakpoint;
}

export function Footer({
  copyright = '© 2026 Your Name',
  links = [
    { label: 'Imprint', href: '#imprint' },
    { label: 'Contact', href: '#contact' },
  ],
  breakpoint = 'desktop',
}: FooterProps) {
  return (
    // <footer> is a landmark element, like <nav> - assistive technology can
    // jump straight to it.
    <footer className={`${styles.footer} ${styles[breakpoint]}`}>
      <div className={styles.content}>
        <p className={styles.text}>{copyright}</p>
        {links.map((link) => (
          <a key={link.href} className={styles.link} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
