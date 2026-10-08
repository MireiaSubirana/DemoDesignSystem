import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The introduction block at the top of a page, from the Figma component set
**Hero**: a small name or role, and under it the largest text on the site.

The headline uses the \`font/display/md\` style, which is **uppercase by
design** - you type normal sentence case and the CSS does the shouting. It is
also the most responsive piece of type in the system: 48px on mobile, 64px on
tablet, 80px on desktop, all driven by the \`font-size/600\` token.

All three breakpoints stack vertically; only the padding changes.
        `,
      },
    },
  },
  argTypes: {
    headline: {
      description:
        'The main headline. Line breaks you type are preserved, so you can control exactly where it wraps - the Figma default breaks after "UX. UI.".',
      control: 'text',
    },
    subtitle: {
      description:
        'The smaller line above the headline - usually a name or role. Fixed text in Figma; exposed as a prop here because it obviously needs changing.',
      control: 'text',
    },
    breakpoint: {
      description:
        'Which padding set to use. The layout is identical at all three - only the spacing differs.',
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      table: { defaultValue: { summary: 'desktop' } },
    },
    as: {
      description:
        'Which heading tag to render. Keep `h1` when the Hero is the top of a page - a page should have exactly one h1. Use `h2` if you reuse it further down.',
      control: 'radio',
      options: ['h1', 'h2'],
      table: { defaultValue: { summary: 'h1' } },
    },
  },
  args: {
    headline: 'UX. UI. \nAgentic AI.',
    subtitle: 'Kim Jones',
  },
} satisfies Meta<typeof Hero>;

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

export const SingleLineHeadline: Story = {
  name: 'Single-line headline',
  args: {
    breakpoint: 'desktop',
    headline: 'Designing for clarity',
    subtitle: 'Kim Jones - Product Designer',
  },
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'Without a typed line break, the headline wraps on its own. Worth checking, since the display size is large enough that wrapping changes the whole composition.',
      },
    },
  },
};
