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
Image and text sit side by side when there is room and stack when there is not.

**This card measures itself, not the window.** It is the only component in the
system that uses a CSS *container* query rather than a media query, because a
card is a reusable piece: it might be full width down the page, three-up in a
grid, or in a narrow sidebar. Asking "how wide is the browser?" gets the
sidebar case wrong - on a 1280px screen a media-query card would lay itself
out side by side inside a 300px column and break. Asking "how much room have
I got?" is right everywhere. See the *In a narrow column* story below.

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
  globals: { viewport: { value: 'desktop' } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet' } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
};

export const WithoutBackground: Story = {
  name: 'Desktop / hasBG off',
  args: { hasBG: false },
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

export const InNarrowColumn: Story = {
  name: 'In a narrow column',
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'The payoff of the container query. The viewport here is the full 1280px desktop, but the card has been given a 320px column - and it correctly uses its stacked layout, because it is reading its own width rather than the window. A media-query version would show the side-by-side desktop layout squeezed into 320px.',
      },
    },
  },
  render: (args) => (
    // A deliberately narrow column, as if the card were in a sidebar.
    <div style={{ display: 'flex', gap: 'var(--space-600)', alignItems: 'start' }}>
      <div style={{ width: 320, flex: '0 0 auto' }}>
        <ProjectCard {...args} />
      </div>
      <div style={{ flex: 1 }}>
        <ProjectCard
          {...args}
          headline="The same card, full width"
          media={sampleProjectShotAlt}
        />
      </div>
    </div>
  ),
};
