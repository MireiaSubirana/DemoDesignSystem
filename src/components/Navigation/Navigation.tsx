/**
 * Navigation
 * Mirrors the Figma component set "Navigation" (node 1:64).
 *
 * WHAT THIS IS
 * The bar across the top of the page: logo on the left, and on the right
 * either some links plus a Contact button (desktop/tablet) or a hamburger
 * icon (mobile).
 *
 * The desktop and mobile versions are genuinely different arrangements, not
 * just the same thing resized - that is why the JSX below branches.
 */

import { Logo } from '../Logo';
import { Button } from '../Button';
import { Menu } from '../Menu';
import type { Breakpoint } from '../breakpoint';
import styles from './Navigation.module.css';

/** One link in the nav bar. */
export interface NavLink {
  /** The visible text, e.g. "about." */
  label: string;
  /** Where it goes. */
  href: string;
}

export interface NavigationProps {
  /**
   * Which layout to show. `desktop` and `tablet` show the links and the
   * Contact button; `mobile` replaces both with the hamburger icon.
   */
  breakpoint?: Breakpoint;
  /** The navigation links. Defaults to the three in the Figma design. */
  links?: NavLink[];
  /** The text on the call-to-action button. Not shown on mobile. */
  ctaLabel?: string;
  /** Called when the call-to-action button is clicked. */
  onCtaClick?: () => void;
  /** Called when the mobile hamburger icon is clicked. */
  onMenuClick?: () => void;
  /** Whether the mobile menu is currently open - switches the icon to an X. */
  menuOpen?: boolean;
}

export function Navigation({
  breakpoint = 'desktop',
  links = [
    { label: 'about.', href: '#about' },
    { label: 'work.', href: '#work' },
    { label: 'blog.', href: '#blog' },
  ],
  ctaLabel = 'Contact',
  onCtaClick,
  onMenuClick,
  menuOpen = false,
}: NavigationProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    // <nav> rather than <div>: it tells screen readers "this is the site
    // navigation", which lets people jump straight to it.
    <nav className={`${styles.nav} ${styles[breakpoint]}`} aria-label="Main">
      <Logo />

      {isMobile ? (
        // On mobile, everything collapses into the single icon button.
        <Menu
          state={menuOpen ? 'open' : 'close'}
          expanded={menuOpen}
          onClick={onMenuClick}
          label="Open navigation menu"
        />
      ) : (
        <div className={styles.navItems}>
          <ul className={styles.links}>
            {/* A list, because that is what a set of links is. Screen readers
              * announce "list of 3 items", which is genuinely helpful. The CSS
              * strips the bullets. */}
            {links.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button label={ctaLabel} variant="primary" onClick={onCtaClick} />
        </div>
      )}
    </nav>
  );
}
