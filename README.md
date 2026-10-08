# my-design-system

A small React design system built directly from a Figma file, where every
colour, size and font comes from the Figma variables rather than being typed
in by hand.

**Read `gaps.md` too.** It lists everything that didn't translate cleanly from
Figma, and a few things worth fixing in the design file.

---

## Starting Storybook

Storybook is the catalogue: every component, every variant, on one page.

```bash
npm run storybook
```

It opens **http://localhost:6006** in your browser automatically. If it
doesn't, type that address in yourself. Press `Ctrl+C` in the terminal to stop
it.

Three things to try once it's open:

1. **The Theme dropdown in the top toolbar** — flip the whole library between
   light and dark. Nothing in the component code knows about dark mode; it all
   comes from the tokens.
2. **The viewport dropdown** — switch between the Mobile (375px), Tablet
   (800px) and Desktop (1280px) widths, which are the exact Figma frame sizes.
3. **The Accessibility tab** at the bottom of a story — it checks each
   component against the same rules a real audit would use.

---

## Seeing the actual page

The portfolio page from the Figma **✏️ Design** page is built and ready:

```bash
npm run dev
```

Open **http://localhost:5173**. Resize the browser window and watch the layout
change by itself — narrow it past 1280px and it becomes the tablet design,
past 800px the mobile one, with the navigation collapsing to a hamburger.

It is also in Storybook under **Pages → HomePage**, with the three Figma
widths and a dark-mode version.

Have a look at `src/HomePage.tsx`. It contains **no styling at all** — no
colours, no spacing, no layout. It is just the components stacked in order,
each handed its text. That is the whole payoff of building the design system
first.

Two servers, two jobs:

| Command | Address | What it's for |
|---|---|---|
| `npm run dev` | localhost:5173 | The real website |
| `npm run storybook` | localhost:6006 | The component catalogue |

---

## How the pieces fit together

```
tokens.json            Every value read out of Figma. The source of truth.
      │
      │  npm run build:tokens
      ▼
src/styles/tokens.css  Auto-generated. Never edit this by hand.
      │
      ▼
src/components/*       Each component's CSS uses var(--token) and nothing else.
```

**If a colour or size needs to change**, change it in Figma, update
`tokens.json`, then run:

```bash
npm run build:tokens
```

That one command regenerates the CSS, and every component picks the change up
at once. That's the whole point of the setup: no value is written down twice.

---

## What's in here

**10 components**, one per Figma component set, plus two helpers that other
components use:

| Component | From Figma set | Main props |
|---|---|---|
| `Button` | Button | `label`, `variant`, `state` |
| `Menu` | Menu | `state`, `expanded` |
| `Navigation` | Navigation | `breakpoint`, `links`, `ctaLabel` |
| `Hero` | Hero | `headline`, `subtitle`, `breakpoint` |
| `About` | About | `headline`, `description`, `media`, `hadButton` |
| `ProjectCard` | ProjectCard | `headline`, `description`, `media`, `hasBG` |
| `Skills` | Skills | `headline`, `items`, `breakpoint` |
| `Footer` | Footer | `copyright`, `links`, `breakpoint` |
| `Logo` | Logo (standalone) | `label` |
| `SkillItem` | SkillItem (standalone) | `headline`, `content` |

**63 tokens** across 5 collections, and **11 typography classes** from the
Figma text styles.

---

## Using a component in an app

```tsx
import { Button, Hero } from './src';
import './src/styles/tokens.css'; // once, at the top level of your app

function Page() {
  return (
    <>
      <Hero headline={'UX. UI. \nAgentic AI.'} subtitle="Kim Jones" />
      <Button label="Get in touch" variant="primary" />
    </>
  );
}
```

To switch the whole page to dark mode, put `data-theme="dark"` on a wrapping
element (usually `<html>`). Nothing else needs to change.

---

## All the commands

| Command | What it does |
|---|---|
| `npm run storybook` | Start the component catalogue at localhost:6006 |
| `npm run build:tokens` | Regenerate `tokens.css` from `tokens.json` |
| `npm run build-storybook` | Build a shareable static copy of Storybook |
| `npm run dev` | Start the real website at localhost:5173 |
| `npm run build` | Type-check and build |

---

## The Storybook MCP addon

`@storybook/addon-mcp` is installed and running. It lets an AI assistant read
this library's real components and props — so when you ask one to build a
page, it uses your actual components with their actual options instead of
inventing them.

It's served at **http://localhost:6006/mcp** whenever Storybook is running.
That's the address you'd give an AI tool that asks for an MCP server URL.

This is why every prop in every story has a written description: those
descriptions are what the assistant reads.
