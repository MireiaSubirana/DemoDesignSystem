import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: `
The icon button that opens and closes navigation on small screens, from the
Figma component set **Menu**.

**Two things to know about the Figma source:**

1. The Figma property is called \`Property 1\`. A React prop cannot contain a
   space, so this component calls it \`state\`. The two options are unchanged.
2. The two options read backwards. In Figma, \`close\` draws the two stacked
   bars (the icon you press to *open* a menu) and \`open\` draws the X (the icon
   you press to *close* it). This component reproduces Figma faithfully rather
   than quietly fixing it - so what you see here matches the design file.
   Both are listed in gaps.md as things worth renaming in Figma.

Because of that confusion, the \`expanded\` prop - not \`state\` - is what
actually gets announced to screen readers. Set it honestly.
        `,
      },
    },
  },
  argTypes: {
    state: {
      description:
        'Which icon to draw. `close` is the two-bar hamburger; `open` is the X. (Reads backwards - it matches Figma.)',
      control: 'radio',
      options: ['close', 'open'],
      table: { defaultValue: { summary: 'close' } },
    },
    expanded: {
      description:
        'Whether the menu this button controls is currently open. This becomes `aria-expanded`, which is what assistive technology actually reports - so it must reflect reality.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      description:
        'What a screen reader announces for the button, e.g. "Open navigation menu".',
      control: 'text',
      table: { defaultValue: { summary: 'Menu' } },
    },
    onClick: { description: 'Runs when the icon is clicked - use it to show or hide your menu.' },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  name: 'Property 1 = close (hamburger)',
  args: { state: 'close', expanded: false, label: 'Open navigation menu' },
  parameters: {
    docs: {
      description: {
        story: 'The resting state: the menu is shut, and this icon opens it.',
      },
    },
  },
};

export const Open: Story = {
  name: 'Property 1 = open (X)',
  args: { state: 'open', expanded: true, label: 'Close navigation menu' },
  parameters: {
    docs: {
      description: {
        story: 'The menu is showing, and this icon dismisses it.',
      },
    },
  },
};
