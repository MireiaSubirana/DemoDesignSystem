import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';
import { sampleProjectShot, sampleProjectShotAlt } from '../storyAssets';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A card showing one piece of work, from the Figma component set
**ProjectCard**: image, title, description and a "find out more" link.
Side by side on desktop and tablet; stacked on mobile, image always first.

\`hasBG\` reproduces a layer in Figma called "bg" that sits behind the card
and can be switched off. Turn it off when the card already sits on a tinted
section, so you do not get a panel on a panel.

Rendered as an \`<article>\`, which is the right element for a
self-contained piece of content that would still make sense on its own.
        `,
      },
    },
  },
  argTypes: {
    headline: { description: 'The project title.', control: 'text' },
    description: {
      description: 'What the project was and what you did. Two or three sentences.',
      control: 'text',
    },
    media: {
      description:
        'The project image - Figma\'s `media` SLOT. Pass JSX with real alt text describing what the screenshot shows. Omit for a placeholder.',
      control: false,
    },
    hasBG: {
      description:
        'Whether to draw the tinted panel behind the card. Matches Figma\'s `hasBG` property.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    linkLabel: {
      description:
        'The link text. Not a Figma property. Note the arrow is part of the text in the design.',
      control: 'text',
      table: { defaultValue: { summary: 'find out more →' } },
    },
    linkHref: { description: 'Where the link goes.', control: 'text' },
    breakpoint: {
      description:
        '`desktop` and `tablet` show image and text side by side (different padding); `mobile` stacks them.',
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      table: { defaultValue: { summary: 'desktop' } },
    },
  },
  args: {
    headline: 'Moonlearning',
    description:
      'I run moonlearning.io, a hands-on learning platform for UI design, Figma and AI-powered product building. I cut through the noise and help people move from overthinking to actually designing and building.',
    media: sampleProjectShot,
    linkLabel: 'find out more →',
    linkHref: '#moonlearning',
  },
} satisfies Meta<typeof ProjectCard>;

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

export const WithoutBackground: Story = {
  name: 'Desktop / hasBG off',
  args: { breakpoint: 'desktop', hasBG: false },
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'The tinted panel removed, so the card sits flat on the page background. Use this when the surrounding section is already tinted.',
      },
    },
  },
};

export const TwoCards: Story = {
  name: 'Two cards in a list',
  args: { breakpoint: 'desktop' },
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'How the card behaves when repeated - the realistic case. Different text lengths make the two cards different heights, which is expected.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-600)' }}>
      <ProjectCard {...args} />
      <ProjectCard
        {...args}
        headline="Checkout redesign"
        description="A six-week project cutting the checkout from five steps to two. Cart abandonment dropped by a third, and the support queue lost its single most common question."
        media={sampleProjectShotAlt}
        linkHref="#checkout"
      />
    </div>
  ),
};
