import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

// NOTE on the comment style here: this is a plain `//` comment on purpose.
// A /** JSDoc */ block directly above `meta` gets treated as the component's
// description and shows up in the docs instead of the proper text below.
//
// What `meta` does: it tells Storybook where this component sits in the
// sidebar and what each of its props means. The `description` fields are not
// decoration - they are exactly what the Storybook MCP addon reads when an AI
// assistant is asked to build something from this library.
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
The standard clickable button, from the Figma component set **Button**.

**When to use which variant**
- \`primary\` - the single most important action on the screen. Aim for one per view.
- \`secondary\` - everything else: "Cancel", "Learn more", a second option alongside a primary.

**About the \`state\` prop.** Figma models hover, active and focused as separate
variants because a static design cannot be interacted with. In the browser those
happen on their own, so in real code you should leave \`state\` alone and let it
be. The prop exists so this documentation can show all four looks at once.
        `,
      },
    },
  },
  argTypes: {
    label: {
      description:
        'The text inside the button. Keep it short and start with a verb - "Send message" rather than "Submit form".',
      control: 'text',
    },
    variant: {
      description:
        'The visual weight. `primary` is the solid dark button for the main action; `secondary` is outlined, for lesser actions.',
      control: 'radio',
      options: ['primary', 'secondary'],
      table: { defaultValue: { summary: 'primary' } },
    },
    state: {
      description:
        'Forces a visual state, for documentation only. Leave as `default` in a real app - the browser handles hover, press and focus by itself.',
      control: 'radio',
      options: ['default', 'hover', 'active', 'focused'],
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      description:
        'Greys the button out and stops it responding. Built from the `action/primary/disabled` and `text/disabled` tokens - Figma has the tokens but no disabled variant.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onClick: {
      description: 'Runs when the button is clicked.',
    },
    type: {
      description:
        'The button\'s role in a form. `button` does nothing on its own; `submit` sends the surrounding form. Defaults to `button` so nothing submits by accident.',
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      table: { defaultValue: { summary: 'button' } },
    },
  },
  args: {
    label: 'Send message',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
 * One story per Figma variant: 2 variants x 4 states = 8 stories.
 * The names match the Figma variant names so the two can be compared directly.
 * ------------------------------------------------------------------------- */

export const PrimaryDefault: Story = {
  name: 'Primary / default',
  args: { variant: 'primary', state: 'default' },
};

export const PrimaryHover: Story = {
  name: 'Primary / hover',
  args: { variant: 'primary', state: 'hover' },
};

export const PrimaryActive: Story = {
  name: 'Primary / active',
  args: { variant: 'primary', state: 'active' },
};

export const PrimaryFocused: Story = {
  name: 'Primary / focused',
  args: { variant: 'primary', state: 'focused' },
};

export const SecondaryDefault: Story = {
  name: 'Secondary / default',
  args: { variant: 'secondary', state: 'default', label: 'Learn more' },
};

export const SecondaryHover: Story = {
  name: 'Secondary / hover',
  args: { variant: 'secondary', state: 'hover', label: 'Learn more' },
};

export const SecondaryActive: Story = {
  name: 'Secondary / active',
  args: { variant: 'secondary', state: 'active', label: 'Learn more' },
};

export const SecondaryFocused: Story = {
  name: 'Secondary / focused',
  args: { variant: 'secondary', state: 'focused', label: 'Learn more' },
};

/* ---------------------------------------------------------------------------
 * Extra stories that go beyond Figma.
 * ------------------------------------------------------------------------- */

export const Disabled: Story = {
  name: 'Disabled (not in Figma)',
  args: { variant: 'primary', disabled: true, label: 'Send message' },
  parameters: {
    docs: {
      description: {
        story:
          'Figma has no disabled variant, but it does define `action/primary/disabled` and `text/disabled` tokens - so the intent was there. This is built from those tokens. See gaps.md.',
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All states together',
  parameters: {
    docs: {
      description: {
        story:
          'Every variant and state on one screen - the quickest way to compare this against the Figma component set side by side.',
      },
    },
  },
  // `render` lets a story draw whatever we like instead of a single component.
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-500)', padding: 'var(--space-500)' }}>
      {(['primary', 'secondary'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 'var(--space-400)', alignItems: 'center', flexWrap: 'wrap' }}>
          {(['default', 'hover', 'active', 'focused'] as const).map((state) => (
            <Button key={state} {...args} variant={variant} state={state} label={`${variant} / ${state}`} />
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 'var(--space-400)' }}>
        <Button {...args} label="disabled" disabled />
      </div>
    </div>
  ),
};
