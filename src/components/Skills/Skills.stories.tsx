import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skills } from './Skills';

const meta = {
  title: 'Components/Skills',
  component: Skills,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A section listing what you do, from the Figma component set **Skills**: a
headline with three **SkillItem** entries under it. Stacked on narrow screens,
in a row from 800px up - switch the **viewport** in the toolbar to see it.

Figma always shows exactly three items. Here \`items\` is an array, so you are
not stuck with three - but three is what the design was composed for, and
four will get cramped on tablet.
        `,
      },
    },
  },
  argTypes: {
    headline: {
      description: 'The section headline. Fixed text in Figma; exposed as a prop here.',
      control: 'text',
    },
    items: {
      description:
        'The skills to list, as `{ headline, content }` objects. Three matches the design.',
    },
  },
  args: {
    headline: 'Skills',
    items: [
      {
        headline: 'Design systems',
        content:
          'Building token-driven component libraries in Figma that developers can actually ship from, instead of rebuilding by hand.',
      },
      {
        headline: 'Prototyping',
        content:
          'Turning rough ideas into clickable flows quickly, so decisions get made on evidence rather than on whoever spoke last.',
      },
      {
        headline: 'Front-end basics',
        content:
          'A working knowledge of HTML and CSS, which makes handover conversations with developers much shorter and much calmer.',
      },
    ],
  },
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop' } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet' } },
  parameters: {
    docs: {
      description: {
        story:
          'Still a row, but each column is much narrower - the useful place to check that your skill descriptions are not too long.',
      },
    },
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
};

export const TwoSkills: Story = {
  name: 'Desktop / only two skills',
  args: {
    items: [
      {
        headline: 'Design systems',
        content: 'Token-driven component libraries that stay in step with the code.',
      },
      {
        headline: 'Prototyping',
        content: 'Clickable flows fast, so decisions get made on evidence.',
      },
    ],
  },
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'Not a Figma variant. Included because the array makes it possible, and the two items share the width evenly rather than leaving a gap.',
      },
    },
  },
};
