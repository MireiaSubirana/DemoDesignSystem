/**
 * About
 * Mirrors the Figma component set "About" (node 2:402).
 *
 * WHAT THIS IS
 * A two-column block: words on one side, an image on the other, with an
 * optional button at the end of the text. On narrow screens it becomes one
 * column with the image ON TOP.
 *
 * The markup below always puts the text first, because that is the reading
 * order a screen reader should follow. The CSS moves the image above it
 * visually on narrow screens using `order` - About.module.css explains why
 * that is safe here, and when it would stop being safe.
 *
 * ABOUT THE `media` PROP
 * In Figma, `media` is a SLOT - a hole in the design that you drop any image
 * or component into. The React equivalent is a prop that accepts JSX, so you
 * can pass an <img>, a video, or anything else. If you pass nothing, a plain
 * placeholder box is shown so the layout still makes sense.
 */

import type { ReactNode } from 'react';
import { Button } from '../Button';
import styles from './About.module.css';

export interface AboutProps {
  /** The section headline. Figma's `headline` text property. */
  headline?: string;
  /** The body paragraph. Figma's `description` text property. */
  description?: string;
  /**
   * The image or other visual. This is Figma's `media` SLOT. Pass any JSX,
   * e.g. `media={<img src="..." alt="..." />}`. Leave it out to get a
   * placeholder box.
   */
  media?: ReactNode;
  /**
   * Whether to show the button under the text.
   *
   * NOTE: the name is spelled `hadButton` because that is the exact spelling
   * of the Figma property. It is almost certainly meant to be `hasButton` -
   * see gaps.md. The name is kept as-is so code and design stay in step.
   */
  hadButton?: boolean;
  /** The button's text. Not a Figma property - the design hardcodes "Contact". */
  buttonLabel?: string;
  /** Called when the button is clicked. */
  onButtonClick?: () => void;
}

export function About({
  headline = 'About me',
  description = "Welcome to my portfolio! I'm Kim, a graphic UI designer dedicated to crafting visual experiences that resonate with users. My goal is to design interfaces that not only grab attention but also make navigation feel effortless.",
  media,
  hadButton = true,
  buttonLabel = 'Contact',
  onButtonClick,
}: AboutProps) {
  const content = (
    <div className={styles.content}>
      <h2 className={styles.headline}>{headline}</h2>
      <p className={styles.description}>{description}</p>
      {/* `&&` means "only render this if hadButton is true". */}
      {hadButton && (
        <Button label={buttonLabel} variant="secondary" onClick={onButtonClick} />
      )}
    </div>
  );

  const mediaBlock = (
    <div className={styles.media}>
      {/* `??` means "use the left side unless it is missing, then use the
        * right". So a placeholder appears only when no media was passed. */}
      {media ?? <div className={styles.mediaPlaceholder} aria-hidden="true" />}
    </div>
  );

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        {content}
        {mediaBlock}
      </div>
    </section>
  );
}
