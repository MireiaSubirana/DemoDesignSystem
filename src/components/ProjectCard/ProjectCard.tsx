/**
 * ProjectCard
 * Mirrors the Figma component set "ProjectCard" (node 2:167).
 *
 * WHAT THIS IS
 * A card showing one piece of work: an image, a title, a description and a
 * "find out more" link. Image and text stack when the card is narrow and sit
 * side by side when it is wide.
 *
 * NOTE this card responds to ITS OWN width, not the window's - so it lays
 * itself out correctly in a sidebar or a grid, not just full width down the
 * page. That is done with a CSS container query; ProjectCard.module.css
 * explains it at the top. Nothing is passed in.
 *
 * The `hasBG` prop reproduces a layer in Figma called "bg" that sits behind
 * the card and can be switched off. In code that is simply a background
 * colour we either apply or do not.
 */

import type { ReactNode } from 'react';
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
}

export function ProjectCard({
  headline = 'Moonlearning',
  description = 'I run moonlearning.io, a hands-on learning platform for UI design, Figma, and AI-powered product building. I cut through the noise and help people move from overthinking to designing and building.',
  media,
  hasBG = true,
  linkLabel = 'find out more →',
  linkHref = '#',
}: ProjectCardProps) {
  return (
    <article
      // Two classes: the base card, and - only if hasBG is true - the
      // background. `.filter(Boolean).join(' ')` drops the empty slot when
      // hasBG is false, so we never end up with a stray double space.
      className={[styles.card, hasBG && styles.withBg].filter(Boolean).join(' ')}
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
