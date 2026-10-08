/**
 * Skills
 * Mirrors the Figma component set "Skills" (node 2:673).
 *
 * WHAT THIS IS
 * A section with a "Skills" headline and three SkillItems underneath. On
 * desktop and tablet the three sit in a row; on mobile they stack.
 */

import { SkillItem, type SkillItemProps } from '../SkillItem';
import type { Breakpoint } from '../breakpoint';
import styles from './Skills.module.css';

export interface SkillsProps {
  /** The section headline. Fixed text in Figma, exposed here - see gaps.md. */
  headline?: string;
  /**
   * The skills to list. Figma always shows exactly three, but an array means
   * you are not stuck with three in real use.
   */
  items?: SkillItemProps[];
  /** `desktop` and `tablet` lay the items out in a row; `mobile` stacks them. */
  breakpoint?: Breakpoint;
}

export function Skills({
  headline = 'Skills',
  items = [
    {
      headline: 'Design systems',
      content:
        'Building token-driven component libraries in Figma that developers can actually ship from.',
    },
    {
      headline: 'Prototyping',
      content:
        'Turning rough ideas into clickable flows fast, so decisions get made on evidence rather than opinion.',
    },
    {
      headline: 'Front-end basics',
      content:
        'A working knowledge of HTML and CSS, which makes handover conversations with developers much shorter.',
    },
  ],
  breakpoint = 'desktop',
}: SkillsProps) {
  return (
    <section className={`${styles.skills} ${styles[breakpoint]}`}>
      <div className={styles.container}>
        <h2 className={styles.headline}>{headline}</h2>
        <div className={styles.group}>
          {items.map((item, index) => (
            // `key` lets React tell the items apart when the list changes.
            // The skill name is a better key than the position in the list.
            <SkillItem key={item.headline ?? index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
