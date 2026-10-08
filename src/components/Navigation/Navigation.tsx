/**
 * Navigation
 * Mirrors the Figma component set "Navigation" (node 1:64).
 *
 * WHAT THIS IS
 * The bar across the top of the page: logo on the left, and on the right
 * either some links plus a Contact button (800px and up) or a hamburger icon
 * (narrower).
 *
 * THIS IS THE ONE COMPONENT WHERE THE TWO VERSIONS ARE DIFFERENT CONTENT,
 * not the same content rearranged. CSS can move and restyle elements but it
 * cannot create or delete them - so we render BOTH arrangements and let
 * Navigation.module.css hide whichever one does not apply, with
 * `display: none`. That particular way of hiding also takes the element out
 * of the accessibility tree, so a screen reader is never read two sets of
 * navigation links. The CSS file explains this in more detail.
 */

import { Logo } from '../Logo';
import { Button } from '../Button';
import { Menu } from '../Menu';
import styles from './Navigation.module.css';

/** One link in the nav bar. */
export interface NavLink {
  /** The visible text, e.g. "about." */
  label: string;
  /** Where it goes. */
  href: string;
}

export interface NavigationProps {
  /** The navigation links. Defaults to the three in the Figma design. */
  links?: NavLink[];
  /** The text on the call-to-action button. Hidden below 800px. */
  ctaLabel?: string;
  /** Called when the call-to-action button is clicked. */
  onCtaClick?: () => void;
  /** Called when the hamburger icon is clicked. */
  onMenuClick?: () => void;
  /** Whether the narrow-screen menu is open - switches the icon to an X. */
  menuOpen?: boolean;
}

export function Navigation({
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
  return (
    // <nav> rather than <div>: it tells screen readers "this is the site
    // navigation", which lets people jump straight to it.
    <nav className={styles.nav} aria-label="Main">
      <Logo />

      {/* Shown below 800px, hidden above. The wrapping <div> exists only so
        * the CSS has something of its own to hide - Menu renders a <button>
        * whose display we should not be overriding from outside. */}
      <div className={styles.menuSlot}>
        <Menu
          state={menuOpen ? 'open' : 'close'}
          expanded={menuOpen}
          onClick={onMenuClick}
          label="Open navigation menu"
        />
      </div>

      {/* Hidden below 800px, shown above. */}
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
    </nav>
  );
}
