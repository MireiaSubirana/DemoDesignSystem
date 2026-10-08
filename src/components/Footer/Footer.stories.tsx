import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The strip at the bottom of the page, from the Figma component set **Footer**:
a copyright line plus a couple of links. A centred row on desktop and tablet;
stacked and left-aligned on mobile.

This is the only component that uses the **inverse** tokens -
\`surface/inverse\` and \`text/inverse\`. That means it is dark with light text
in light mode, and light with dark text in dark mode. Switch the Theme
dropdown in the toolbar to watch it flip; nothing in the component's own code
knows about dark mode.
        `,
      },
    },
  },
  argTypes: {
    copyright: {
      description: 'The copyright line. Fixed text in Figma; exposed as a prop here.',
      control: 'text',
    },
    links: {
      description: 'The links after the copyright, as `{ label, href }` objects.',
    },
    breakpoint: {
      description:
        '`desktop` and `tablet` show a centred row; `mobile` stacks the items and left-aligns them.',
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      table: { defaultValue: { summary: 'desktop' } },
    },
  },
  args: {
    copyright: '© 2026 Kim Jones',
    links: [
      { label: 'Imprint', href: '#imprint' },
      { label: 'Contact', href: '#contact' },
    ],
  },
} satisfies Meta<typeof Footer>;

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
};

export const DarkMode: Story = {
  name: 'Desktop / dark mode',
  args: { breakpoint: 'desktop' },
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
  parameters: {
    docs: {
      description: {
        story:
          'The same component with the Theme global set to dark. The inverse tokens swap round, so the footer becomes light - the opposite of what it does in light mode. This is intentional: the footer is always the inverse of the page.',
      },
    },
  },
};
