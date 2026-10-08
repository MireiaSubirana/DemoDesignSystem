/**
 * Button
 * Mirrors the Figma component set "Button" (node 2:358).
 *
 * WHAT THIS IS
 * A clickable button with two looks (primary = solid, secondary = outlined)
 * and four visual states that come straight from Figma.
 *
 * HOW STATES WORK - the one slightly tricky idea in this file
 * In Figma, "hover" is a separate variant you switch to by hand, because a
 * static design can't actually be hovered. In a real browser, hover happens
 * on its own. So this component does BOTH:
 *   - Normally, leave `state` alone. The CSS reacts to the real mouse and
 *     keyboard, exactly like a normal button.
 *   - Pass `state="hover"` to FORCE that look. This is what the Storybook
 *     stories do, so you can see all four states side by side on one page -
 *     which is impossible with real hover.
 * Both paths use the same colours, so they can never drift apart.
 */

import styles from './Button.module.css';

/** The two looks a button can have. Matches the Figma `variant` property. */
export type ButtonVariant = 'primary' | 'secondary';

/** The four states in Figma's `state` property. */
export type ButtonState = 'default' | 'hover' | 'active' | 'focused';

export interface ButtonProps {
  /** The text inside the button. In Figma this is the `label` text property. */
  label: string;
  /**
   * Which look to use. `primary` is the solid dark button for the main action
   * on a screen; `secondary` is the outlined button for lesser actions.
   * There should normally be only one primary button in view at a time.
   */
  variant?: ButtonVariant;
  /**
   * Force a visual state for documentation purposes. Leave this as `default`
   * in a real app - the browser handles hover, press and focus by itself.
   */
  state?: ButtonState;
  /** Greys the button out and stops it responding. Has no Figma variant - see gaps.md. */
  disabled?: boolean;
  /** What should happen when the button is clicked. */
  onClick?: () => void;
  /**
   * The button's purpose in a form. `button` (the default) is a plain button;
   * `submit` sends the surrounding form. Set deliberately so a button never
   * submits a form by accident.
   */
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  label,
  variant = 'primary',
  state = 'default',
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      // Two classes: the shared shape, plus the colours for this variant.
      className={`${styles.button} ${styles[variant]}`}
      // `data-state` is how the forced state reaches the CSS. When it is
      // "default" we leave the attribute off entirely, so nothing is forced
      // and the real browser states take over.
      data-state={state === 'default' ? undefined : state}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
