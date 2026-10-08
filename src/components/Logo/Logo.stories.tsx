import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component: `
The site mark, from the Figma component **Logo**.

In Figma this is a plain 48x48 orange circle - a placeholder standing in for a
real logo. It is kept as its own component so that replacing it later is a
one-file change rather than a hunt through every header.

It takes its colour from the \`text/accent\` token, so it follows the brand
colour automatically.
        `,
      },
    },
  },
  argTypes: {
    label: {
      description:
        'What a screen reader announces in place of the logo. Usually the site or person\'s name. If the logo is a link home, "Home" is also fine.',
      control: 'text',
      table: { defaultValue: { summary: 'Home' } },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Kim Jones - home' },
};
