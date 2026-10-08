/**
 * ProjectCard
 * Mirrors the Figma component set "ProjectCard" (node 2:167).
 *
 * WHAT THIS IS
 * A card showing one piece of work: an image, a title, a description and a
 * "find out more" link. Image and text sit side by side on desktop and
 * tablet, and stack on mobile.
 *
 * The `hasBG` prop reproduces a layer in Figma called "bg" that sits behind
 * the card and can be switched off. In code that is simply a background
 * colour we either apply or do not.
 */

import type { ReactNode } from 'react';
import type { Breakpoint } from '../breakpoint';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  /** The project title. Figma's `headline` text property. */
  headline?: string;
  /** The project description. Figma's `description` text property. */
  description?: string;
  /**
   * The project image. This is Figma's `media` SLOT, so it takes any JSX -
   * e.g. `media={<img src="..." alt="Screenshot of the app" />}`.
   * Leave it out for a placeholder box.
   */
  media?: ReactNode;
  /**
   * Whether to draw the tinted panel behind the card. Matches Figma's `hasBG`
   * property. Turn it off when the card sits on an already-tinted section.
   */
  hasBG?: boolean;
  /** The link text. Not a Figma property - the design hardcodes it. */
  linkLabel?: string;
  /** Where the link goes. */
  linkHref?: string;
  /** `desktop` and `tablet` show image and text side by side; `mobile` stacks. */
  breakpoint?: Breakpoint;
}

export function ProjectCard({
  headline = 'Moonlearning',
  description = 'I run moonlearning.io, a hands-on learning platform for UI design, Figma, and AI-powered product building. I cut through the noise and help people move from overthinking to designing and building.',
  media,
  hasBG = true,
  linkLabel = 'find out more →',
  linkHref = '#',
  breakpoint = 'desktop',
}: ProjectCardProps) {
  return (
    <article
      // Three classes, built up in order: the base card, the breakpoint
      // layout, and - only if hasBG is true - the background.
      // `.filter(Boolean).join(' ')` drops the empty slot when hasBG is false,
      // so we never end up with a stray double space in the class list.
      className={[styles.card, styles[breakpoint], hasBG && styles.withBg]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.container}>
        <div className={styles.media}>
          {media ?? <div className={styles.mediaPlaceholder} aria-hidden="true" />}
        </div>
        <div className={styles.content}>
          <h3 className={styles.headline}>{headline}</h3>
          <p className={styles.description}>{description}</p>
          <a className={styles.link} href={linkHref}>
            {linkLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
