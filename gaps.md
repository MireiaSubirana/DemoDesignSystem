# Gaps, judgement calls and things to know

Everything in this file is something I could not take straight from Figma: a
value that was missing, a name that looked wrong, or a decision I had to make
on your behalf. Nothing here is blocking — the design system works as it is —
but these are the things worth a look before you rely on it.

Read on: **8 October 2026**, from Figma file
*01 - Step 1: Hand made Figma to Code (Community) (Copy)* (`VbGI9r1HSRAHoq47wXaYCn`).
I only ever read the file. Nothing in Figma was changed.

---

## 1. Likely mistakes in the Figma file

These are the ones I'd actually go and look at.

### 1.1 `text/default` in dark mode is a warm cream, not grey
- **What Figma says:** the description reads *"→ alias to color/neutral/100 (dark)"*.
- **What it actually does:** aliases `color/brand/100` (`#ffede5`).
- **Effect:** all body text in dark mode is pale peach rather than near-white.
  You can see it in the Storybook dark-mode stories — it's subtle but it's there.
- **I followed the real value, not the description.** If it was a slip,
  change it in Figma and re-run `npm run build:tokens`.

### 1.2 Four more descriptions disagree with their own values
Same pattern — the description says one thing, the alias does another. These
look more like stale notes than bugs, so they matter less, but they make the
variable panel misleading.

| Token | Description says | Actually aliases |
|---|---|---|
| `border/strong` (light) | `neutral/600` | `neutral/900` |
| `action/secondary/hover` (light) | `neutral/100` | `neutral/200` |
| `action/secondary/border` (light) | `neutral/300` | `neutral/800` |
| `text/accent` (dark) | `brand/400` | `brand/500` |

In every case **the code uses the real value.**

### 1.3 `Menu` has a property called "Property 1"
The property was never renamed, so its name carries no meaning. Worse, a React
prop cannot contain a space, so `Property 1` is literally unusable in code.

- **What I did:** called it `state` in React. The **options are unchanged**
  (`close` / `open`), so the mapping is still one-to-one.
- **Suggested fix in Figma:** rename it to `state`.

### 1.4 The `Menu` options look swapped
`close` draws the two stacked bars — the icon you press to **open** a menu.
`open` draws the X — the icon you press to **close** it.

- **What I did:** reproduced Figma exactly, rather than quietly fixing it, so
  code and design still match. The component also takes a separate `expanded`
  prop, and *that* is what gets announced to screen readers — so the confusing
  names never reach a real user.
- **Suggested fix in Figma:** swap the two names.

### 1.5 `About` has a property spelled `hadButton`
Almost certainly meant to be `hasButton`.

- **What I did:** kept the exact Figma spelling, since it's a valid prop name
  and renaming it would break the link between design and code.
- **Suggested fix in Figma:** rename to `hasButton`, then rename it here too.

---

## 2. States and variants that don't exist in Figma

I built these because leaving them out would produce a library you can't ship.
Each one is marked in its Storybook story.

| What's missing | Where | What I did |
|---|---|---|
| **Disabled button** | `Button` | Figma has no disabled variant — but it *does* define `action/primary/disabled` and `text/disabled` tokens, so the intent was clearly there. Built from those tokens. |
| **Link hover states** | `Navigation`, `Footer`, `ProjectCard` | No hover variants in Figma. Links with no hover feedback feel broken in a browser. I used an **underline**, not a colour change — underlines work for colour-blind users too. |
| **Keyboard focus on links** | all links | Figma only drew a focus ring for `Button`. I applied the same ring (`border/focus`, 2px, 2px offset) to every link, because a keyboard user has to be able to see where they are. |
| **The opened mobile menu** | `Navigation` | Figma has the two hamburger *icons* but never draws the panel that appears when you tap it. So `Navigation` tells you the menu was clicked (`onMenuClick`) and switches the icon — **but there is no menu panel to show.** You'll need to design that. This is the biggest genuine hole. |
| **Hover/focus on `Menu`** | `Menu` | No variants in Figma; I added a focus ring only. |

---

## 3. Values with no token behind them

These are hardcoded in the CSS because Figma had no variable for them. Each is
a candidate for a new token.

| Value | Where | Note |
|---|---|---|
| **3px** button border | `Button` secondary | No stroke-width tokens exist in the file. Suggest `border-width/md`. |
| **1px** top rule | `SkillItem` | Same — no stroke-width token. |
| **2px** icon bars | `Menu` | Same. |
| **48 x 48px** logo | `Logo` | No size tokens exist. Suggest `size/logo`. |
| **2px / 2px offset** focus ring | all | The ring *colour* is tokenised (`border/focus`); its thickness isn't. |
| **Line heights and letter spacing** | all text | These live on the Figma text *styles*, not on variables, so they're baked into the generated CSS classes rather than being adjustable tokens. That's normal, just worth knowing. |

### Inner gaps that aren't on the spacing scale
Three measurements in Figma don't match any `space/*` token:

- `About` desktop inner gap: **95px** (nearest token: `space/900` = 80px)
- `About` tablet inner gap: **56px** (nearest: `space/800` = 64px)
- `About` mobile inner gap: **27px** (nearest: `space/500` = 24px)

**I used the nearest token in each case**, because a design system where three
numbers sit off the scale isn't really a system. The visual difference is a
few pixels. If those exact numbers were deliberate, tell me and I'll match them.

### Variables from another library
`About` and `Skills` have some paddings and widths bound to variables that
**aren't in this file** — they come from a library this file links to. I
couldn't read their names, only their resolved values (24px, 48px, 64px,
1280px). I mapped each to the local token with the same value. If that library
ever changes, this mapping silently goes stale.

---

## 4. Accessibility

Things I fixed, and things I couldn't.

### Fixed
- **Real HTML elements throughout** — `<nav>`, `<footer>`, `<article>`,
  `<button>`, `<ul>`, proper `<h1>`–`<h3>`. Figma has no concept of these, so
  they're all judgement calls, but they're what lets a screen reader user
  navigate at all.
- **Heading order steps down one at a time** — `Hero` is `h1`, section
  headlines are `h2`, `SkillItem` and `ProjectCard` titles are `h3`.
  `Hero` takes an `as` prop in case you use it somewhere that isn't the top of
  a page.
- **Focus rings everywhere**, using `:focus-visible` so they show for keyboard
  users but not on mouse clicks.
- **`Menu` touch target raised to 44px tall.** Figma draws it 36 x 29px. 44px
  is the WCAG minimum for something you tap with a finger; 29px is genuinely
  too small. The visible bars are unchanged — only the clickable area grew.
- **`aria-expanded` on `Menu`** so the open/closed state is announced.
- **Hover feedback uses underlines, not colour** (see §2).

### Not fixed — needs your decision

**Two colour-contrast problems, both measured rather than guessed.**

I calculated the WCAG contrast ratio for every important colour pair in the
system. Most are comfortably fine — `text/default` is 18.1:1 in light mode and
15.9:1 in dark, and both buttons are around 14:1. Two are not:

| Pair | Ratio | Needs | Verdict |
|---|---|---|---|
| `text/accent` (orange) on `surface/default` (white) | **2.97:1** | 4.5:1 | **Fails** |
| `border/focus` (orange) on `surface/default` (white) | **2.97:1** | 3:1 | **Fails, just** |

1. **Brand orange text on white is not readable enough.** `text/accent`
   (`#ff6330`) is described in Figma as *"brand-coloured text, used sparingly"* —
   but at 2.97:1 it fails AA for body text. It would pass for large text
   (24px+), so it's fine as a big headline accent and not fine for anything
   small. **No component currently uses it for text**, so nothing is broken
   today — but it's a trap waiting for whoever reaches for it next.
   *Fix:* darken it. `brand/600` (`#e54d1a`) gets you to about 3.9:1;
   `brand/700` (`#b33b14`) to about 6.5:1 and a clear pass.

2. **The focus ring is marginal.** WCAG 2.2 wants a focus indicator to reach
   3:1 against its background; the orange hits 2.97:1 on white. That is a
   rounding error away from passing, but it is the wrong side of the line, and
   focus rings are exactly the thing a keyboard user depends on.
   *Fix:* either darken `border/focus` the same way, or keep the orange and
   add a thin dark outer ring so the indicator works on any background.

**Both of these are Figma-side decisions, so I have not changed them.** The
tokens are reproduced exactly as they are in the file.

**Disabled text fails too, which is expected.** `text/disabled` is 2.61:1 in
light mode and 2.32:1 in dark. WCAG explicitly exempts disabled controls, so
this is conventional rather than wrong — but it does mean a disabled button is
genuinely hard to read, so it's worth being a deliberate choice.

**Alt text can't come from Figma.** The `media` slots in `About` and
`ProjectCard` take whatever JSX you pass, so *you* have to write the alt text.
The Storybook stories show examples of good alt text ("Kim, smiling,
photographed against a plain wall") rather than bad ("image of a person").

**No reduced-motion handling yet.** I added short CSS transitions to the
button and the menu icon. If you want to be thorough, these should be switched
off for people who've asked for reduced motion. Say the word and I'll add it.

---

## 5. Fonts

The whole system is **Poppins**, in three weights (400, 600, 700).

- Storybook loads it from **Google Fonts**, via `.storybook/preview-head.html`.
- **This means Storybook needs an internet connection the first time.** Without
  it, everything falls back to your system's default sans-serif and the
  spacing will look subtly wrong.
- For a real production site you'd normally self-host the font files instead,
  so there's no dependency on Google and no third-party request. Not done here.

---

## 6. Things I changed after comparing against Figma screenshots

I screenshotted each Figma component and compared it against the matching
story. Three real mismatches turned up, all now fixed:

1. **`Hero` text is centred**, at every breakpoint. I had built it
   left-aligned. Fixed.
2. **`Footer` text is centred on mobile** (left-aligned on desktop and tablet).
   Fixed.
3. **`ProjectCard`'s panel and both media slots have square corners.** I had
   rounded them with `radius/md`. In this design system `radius/md` is used
   **only** on buttons. Fixed.

---

## 7. Building the page (the Figma "✏️ Design" page)

The page is built at `src/HomePage.tsx` and runs with `npm run dev`. Its
height comes out at **3109px against Figma's 3090px** — under 1% off, with
every section landing within a few pixels of its Figma frame.

Three things about the Figma page worth knowing:

- **The mobile frame has two Footers stacked.** One is the `tablet` variant,
  one is `mobile`. Almost certainly a leftover — I built one Footer.
- **The frame names have the comparisons backwards.** `">800 (Mobile)"` is the
  375px frame, and `"<1280 (Desktop)"` is the widest. Reading them literally
  gets you the opposite of what they are. The frames themselves are fine.
- **Only the mobile frame has real project titles** (moonblocks, Alpine
  Tracker, Soft Agents, Web Template). Desktop and tablet all say "Headline".
  I used the real titles everywhere.

**The page chooses its own layout.** Individual components still take a
`breakpoint` prop — that is how Figma models it, and it is what lets Storybook
show all three at once. But a real page cannot ask a person to pick, so
`src/useBreakpoint.ts` reads the actual window width and feeds the right value
to every component. The thresholds match both the Figma frames and the
font-size modes, so layout and type scale always change together.

**Real images are still missing.** The Figma design has actual screenshots and
a portrait photo; the code renders neutral placeholder boxes, because the
images live in Figma and were never exported. Dropping real ones in is a
one-line change per card — see §7.1 below.

### 7.1 How to add the real images

Export them from Figma (select the image, Export, PNG or WebP), save them into
`src/assets/`, then pass each one in:

```tsx
import moonblocks from './assets/moonblocks.png';

<ProjectCard
  headline="moonblocks"
  media={<img src={moonblocks} alt="The moonblocks site, showing a grid of UI blocks" />}
/>
```

The `alt` text matters — it is what someone using a screen reader hears
instead of the picture. Describe what the image *shows*, not that it is an
image.

---

## 8. Smaller judgement calls

- **Text that's fixed in Figma is a prop here.** `Hero`'s subtitle, `Skills`'
  headline, `Footer`'s copyright and `ProjectCard`'s link label are all
  hardcoded in the design but obviously need changing in real use, so each is
  a prop with the Figma text as its default.
- **`breakpoint` is a prop, not a media query.** In a finished site, CSS would
  normally pick the layout from the window width automatically. Figma models it
  as an explicit choice, and keeping it as a prop means Storybook can show all
  three layouts at once. If you'd rather it were automatic, that's a small
  change — ask.
- **`font-size/500` is unused.** No text style references it. It's still
  exported as `--font-size-500` in case you need it.
- **Only one radius token exists** (`radius/md`, 8px), so everything rounded in
  the system is rounded the same amount.
- **No colour, effect or grid styles in the file** — colour is handled entirely
  by variables, which is the cleaner approach. Only text styles exist (11).
- **Transitions are my addition.** 120ms on button colours, 180ms on the menu
  icon. Figma can't describe motion.
- **`ProjectCard` media is 16:9, `About` media is 1:1.** Measured from the
  Figma frames rather than tokenised, since there are no ratio tokens.

---

## 9. Known setup issue

**Playwright browsers failed to install** during Storybook setup. This only
affects `@storybook/addon-vitest` (running stories as automated tests). The
Storybook UI, the accessibility panel and the MCP addon all work fine without
it.

If you want the test runner later:

```bash
npx playwright install chromium --with-deps
```
