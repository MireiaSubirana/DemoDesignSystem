import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navigation } from './Navigation';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen', // No padding around the story - this is a full-width bar.
    docs: {
      description: {
        component: `
The bar across the top of the page, from the Figma component set **Navigation**.

Logo on the left; on the right either the links plus a Contact button
(desktop and tablet) or a single hamburger icon (mobile). The desktop and
mobile versions are genuinely different arrangements rather than the same
thing resized, which is why \`breakpoint\` matters here more than elsewhere.

Rendered as a real \`<nav>\` with a list of links inside, so screen reader
users can jump straight to the navigation and hear how many items it has.
        `,
      },
    },
  },
  argTypes: {
    breakpoint: {
      description:
        'Which layout to show. `desktop` and `tablet` show links + button (they differ only in padding); `mobile` replaces both with the hamburger icon.',
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      table: { defaultValue: { summary: 'desktop' } },
    },
    links: {
      description:
        'The navigation links, as `{ label, href }` objects. Three is what the design shows; more will fit on desktop but get tight on tablet.',
    },
    ctaLabel: {
      description: 'Text on the call-to-action button. Not shown on mobile.',
      control: 'text',
      table: { defaultValue: { summary: 'Contact' } },
    },
    menuOpen: {
      description:
        'Mobile only: whether the menu is currently open. Switches the hamburger to an X and sets `aria-expanded`.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onCtaClick: { description: 'Runs when the Contact button is clicked.' },
    onMenuClick: { description: 'Runs when the mobile hamburger is clicked.' },
  },
  args: {
    links: [
      { label: 'about.', href: '#about' },
      { label: 'work.', href: '#work' },
      { label: 'blog.', href: '#blog' },
    ],
    ctaLabel: 'Contact',
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: { breakpoint: 'desktop' },
  globals: { viewport: { value: 'desktop' } },
};

export const Tablet: Story = {
  args: { breakpoint: 'tablet' },
  globals: { viewport: { value: 'tablet' } },
};

export const Mobile: Story = {
  args: { breakpoint: 'mobile' },
  globals: { viewport: { value: 'mobile' } },
  parameters: {
    docs: {
      description: {
        story: 'The links and button are replaced by the hamburger icon.',
      },
    },
  },
};

export const MobileMenuOpen: Story = {
  name: 'Mobile / menu open',
  args: { breakpoint: 'mobile', menuOpen: true },
  globals: { viewport: { value: 'mobile' } },
  parameters: {
    docs: {
      description: {
        story:
          'The same bar with the menu showing - the icon has become an X. Figma has the two icon variants but does not show the opened panel itself, so there is nothing below the bar to render. See gaps.md.',
      },
    },
  },
};
