import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomePage } from './HomePage';

// Plain `//` comments here on purpose - a /** JSDoc */ block directly above
// `meta` would be used as the component description instead of the text below.
const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The complete page from the Figma **✏️ Design** page, assembled from the
design system components: Navigation, Hero, four ProjectCards, About, Skills
and Footer.

**Nothing on this page is told what size the screen is.** Every component
responds to the window through CSS media queries - except ProjectCard, which
responds to its own width through a container query. So to see the three Figma
layouts, change the **viewport** in the toolbar, or just resize your browser.

Because it is CSS rather than JavaScript, the right layout is correct on the
very first paint - there is no moment where the page renders wide and then
snaps.

Have a look at \`src/HomePage.tsx\`: there is no styling in it whatsoever. The
whole page is components stacked in order, each handed its text. That is the
point of building the design system first.
        `,
      },
    },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story: 'The page at 1280px - matching the Figma "<1280 (Desktop)" frame.',
      },
    },
  },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet' } },
  parameters: {
    docs: {
      description: {
        story: 'The page at 800px - matching the Figma "<800 (Tablet)" frame.',
      },
    },
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
  parameters: {
    docs: {
      description: {
        story:
          'The page at 375px. The navigation collapses to the hamburger icon, About puts the image on top, and Skills stacks into one column.',
      },
    },
  },
};

export const DarkMode: Story = {
  name: 'Desktop / dark mode',
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
  parameters: {
    docs: {
      description: {
        story:
          'The entire page in dark mode. Not a single component contains any dark-mode code - swapping the `data-theme` attribute re-points the 23 semantic colour tokens and everything follows.',
      },
    },
  },
};
