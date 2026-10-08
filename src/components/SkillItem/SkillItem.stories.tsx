import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillItem } from './SkillItem';

const meta = {
  title: 'Components/SkillItem',
  component: SkillItem,
  parameters: {
    docs: {
      description: {
        component: `
One entry in a skills list, from the Figma component **SkillItem**: a short
title with a paragraph under it and a thin rule along the top.

You will usually not place this yourself - the **Skills** component arranges
three of them. It is documented separately because it is its own component in
Figma, and because seeing it alone makes the top rule and spacing easy to check.
        `,
      },
    },
  },
  argTypes: {
    headline: {
      description: 'The skill name - the bold line at the top. Two or three words works best.',
      control: 'text',
    },
    content: {
      description:
        'A sentence or two explaining the skill. Say what you can do with it, not just that you have it.',
      control: 'text',
    },
  },
} satisfies Meta<typeof SkillItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: 'Design systems',
    content:
      'Building token-driven component libraries in Figma that developers can actually ship from, instead of rebuilding by hand.',
  },
};

export const LongContent: Story = {
  name: 'With longer text',
  args: {
    headline: 'Research and testing',
    content:
      'Planning and running usability sessions, then turning what people actually did into a short list of changes the team agrees on. Includes writing the script, recruiting participants, moderating, and summarising findings in a way that survives contact with a roadmap meeting.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A deliberately long entry, to check the text wraps cleanly and the top rule stays put.',
      },
    },
  },
};
