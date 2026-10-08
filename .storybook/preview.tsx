import type { Preview, Decorator } from '@storybook/react-vite';

// Load the generated token stylesheet ONCE, here. Every story in Storybook
// then has all the CSS variables available, so no component has to import it.
import '../src/styles/tokens.css';

/**
 * A "decorator" is a wrapper Storybook puts around every story.
 *
 * This one does two jobs:
 *  1. It sets `data-theme` on a wrapping <div>, which is the switch that makes
 *     every semantic colour token flip to its dark-mode value. That is what
 *     powers the Theme toolbar dropdown.
 *  2. It paints the correct page background behind the story, so a component
 *     designed for a dark page does not sit on a white rectangle.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';

  return (
    <div
      data-theme={theme}
      style={{
        // These two tokens are the page's own background and text colour, so
        // the surrounding area always matches the theme being previewed.
        background: 'var(--surface-default)',
        color: 'var(--text-default)',
        minHeight: '100%',
        // Poppins, with the same fallback chain the components use.
        fontFamily: 'var(--font-family-sans), sans-serif',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],

  // `globalTypes` adds a dropdown to the Storybook toolbar. This one lets you
  // flip the whole library between light and dark mode in one click - which is
  // the fastest way to spot a colour that was hardcoded instead of tokenised.
  globalTypes: {
    theme: {
      description: 'Light or dark mode (switches the semantic colour tokens)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },

  parameters: {
    // Storybook normally paints its own background behind a story. We turn
    // that off because our decorator above already paints the right one.
    backgrounds: { disable: true },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // The accessibility addon checks each story against the same rules real
    // screen readers and audits use. 'todo' means "show me problems in the
    // Accessibility tab but don't fail anything".
    a11y: { test: 'todo' },

    // The three widths are the actual Figma frame widths, so selecting
    // "Tablet" here shows a component at exactly the size it was designed at.
    viewport: {
      options: {
        mobile: { name: 'Mobile (Figma 375px)', styles: { width: '375px', height: '900px' } },
        tablet: { name: 'Tablet (Figma 800px)', styles: { width: '800px', height: '1000px' } },
        desktop: { name: 'Desktop (Figma 1280px)', styles: { width: '1280px', height: '1000px' } },
      },
    },
  },
};

export default preview;
