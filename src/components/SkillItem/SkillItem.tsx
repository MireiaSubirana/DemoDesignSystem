/**
 * SkillItem
 * Mirrors the Figma component "SkillItem" (node 4002:1000).
 *
 * WHAT THIS IS
 * One entry in the Skills list: a short title with a paragraph under it, and a
 * thin rule along the top. Used three times inside the Skills component.
 */

import styles from './SkillItem.module.css';

export interface SkillItemProps {
  /** The skill name - the bold line at the top. Figma's `headline` property. */
  headline?: string;
  /** The explanation underneath. Figma's `content` property. */
  content?: string;
}

export function SkillItem({
  headline = 'Headline',
  content = 'A basic understanding of HTML and CSS helps you communicate with developers.',
}: SkillItemProps) {
  return (
    <div className={styles.item}>
      {/* h3 because this sits under the Skills section's h2 - heading levels
        * should step down one at a time so screen reader users can navigate
        * the page structure. */}
      <h3 className={styles.headline}>{headline}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
