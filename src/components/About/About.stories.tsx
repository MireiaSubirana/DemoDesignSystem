import type { Meta, StoryObj } from '@storybook/react-vite';
import { About } from './About';
import { samplePortrait } from '../storyAssets';

const meta = {
  title: 'Components/About',
  component: About,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A two-column block from the Figma component set **About**: words on one side,
an image on the other, with an optional button at the end of the text.

**The image moves on narrow screens.** From 800px up the text comes first with
the image to its right. Below that the image moves to the *top*, above the
text, as the Figma mobile frame shows.

Only the *visual* order changes. The markup always puts the text first, and
CSS \`order\` moves the image up - so a screen reader user always meets the
content in the same, sensible sequence. (That trick is safe here because the
image block has nothing you can click or Tab to. If it ever gained a link,
the visual and keyboard orders would disagree and the markup itself would need
reordering instead.)

The \`media\` prop is Figma's \`media\` SLOT: pass any JSX you like. If you pass
nothing you get a plain placeholder box, so the layout never collapses.
        `,
      },
    },
  },
  argTypes: {
    headline: { description: 'The section headline.', control: 'text' },
    description: {
      description: 'The body paragraph. A few sentences - this is the longest text block in the system.',
      control: 'text',
    },
    media: {
      description:
        'The image or other visual - Figma\'s `media` SLOT. Pass JSX, e.g. `<img src="..." alt="..." />`. Always write real alt text. Omit for a placeholder.',
      control: false, // Not editable from the controls panel - it is JSX, not text.
    },
    hadButton: {
      description:
        'Whether to show the button under the text. Spelled exactly as in Figma, where it is almost certainly a typo for `hasButton` - see gaps.md.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    buttonLabel: {
      description: 'The button\'s text. Not a Figma property - the design hardcodes "Contact".',
      control: 'text',
      table: { defaultValue: { summary: 'Contact' } },
    },
    onButtonClick: { description: 'Runs when the button is clicked.' },
  },
  args: {
    headline: 'About me',
    description:
      "I'm Kim, a product designer who likes the unglamorous half of the job: naming things consistently, keeping a component library honest, and making sure the thing that ships matches the thing that was agreed. Before design I worked in editorial, which is probably why I care so much about what the words on a button say.",
    media: samplePortrait,
    buttonLabel: 'Contact',
  },
} satisfies Meta<typeof About>;

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
  parameters: {
    docs: {
      description: {
        story: 'Image on top, text below, and the button goes full width.',
      },
    },
  },
};

export const WithoutButton: Story = {
  name: 'Desktop / hadButton off',
  args: { hadButton: false },
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'The same block with the button switched off - for when the call to action lives elsewhere on the page.',
      },
    },
  },
};

export const WithoutMedia: Story = {
  name: 'Desktop / no media passed',
  args: { media: undefined },
  globals: { viewport: { value: 'desktop' } },
  parameters: {
    docs: {
      description: {
        story:
          'What you get if the `media` slot is left empty: a neutral placeholder holding the right amount of space, so the layout is still readable.',
      },
    },
  },
};
