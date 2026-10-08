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

**The order changes on mobile.** On desktop and tablet the text comes first and
the image sits to its right. On mobile the image moves to the *top*, above the
text. That is a real change in sequence, not just a wrap - so a screen reader
user meets the content in a different order too.

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
    breakpoint: {
      description:
        '`desktop` and `tablet` put text and image side by side (different gaps and padding); `mobile` stacks them with the image on top.',
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      table: { defaultValue: { summary: 'desktop' } },
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
        story: 'Image on top, text below, and the button goes full width.',
      },
    },
  },
};

export const WithoutButton: Story = {
  name: 'Desktop / hadButton off',
  args: { breakpoint: 'desktop', hadButton: false },
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
  args: { breakpoint: 'desktop', media: undefined },
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
