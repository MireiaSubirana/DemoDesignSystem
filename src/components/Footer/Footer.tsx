/**
 * Footer
 * Mirrors the Figma component set "Footer" (node 2:511).
 *
 * WHAT THIS IS
 * The dark strip at the bottom of the page: a copyright line plus a couple of
 * links. Stacked and centred on narrow screens, a single centred row from
 * 800px up. That switch is pure CSS - see Footer.module.css.
 *
 * Note it uses the "inverse" tokens - a dark background with light text in
 * light mode, and the reverse in dark mode. That swap is automatic.
 */

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
}

export function Footer({
  copyright = '© 2026 Your Name',
  links = [
    { label: 'Imprint', href: '#imprint' },
    { label: 'Contact', href: '#contact' },
  ],
}: FooterProps) {
  return (
    // <footer> is a landmark element, like <nav> - assistive technology can
    // jump straight to it.
    <footer className={styles.footer}>
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
