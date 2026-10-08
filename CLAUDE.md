# Figma to Design System

A React design system generated from a Figma file, plus the portfolio page
built from it. Everything lives in `my-design-system/`.

## Who you're working with

Mireia is a **designer, and a self-described total beginner at code.** She
reads design intent fluently and programming idiom not at all.

- Explain in plain English, and explain the **why**, not just the what.
- Comment generously in any code you write — especially non-obvious bits
  (build steps, generated files, why a prop exists, CSS like `aspect-ratio`
  or `white-space: pre-line`).
- When she asks about a topic, prefer pointing at the real file and walking
  through it over abstract explanation.

## The Figma source — READ ONLY

File: *01 - Step 1: Hand made Figma to Code (Community) (Copy)*
(fileKey `VbGI9r1HSRAHoq47wXaYCn`)

**Never write to Figma unless she explicitly asks.** Everything so far has
been read-only and she asked for it to stay that way.

Access it through the **figma-console MCP** (Desktop Bridge plugin), not the
REST API — the stored token lacks `files:read` scope, so REST-backed tools
like `figma_get_styles` return 403. Plugin-backed tools work fine. Check the
connection with `figma_diagnose`.

## How the project is wired

```
tokens.json              63 Figma variables + 11 text styles. Source of truth.
   │  npm run build:tokens   (scripts/build-tokens.mjs)
   ▼
src/styles/tokens.css    GENERATED. Never hand-edit.
   │
   ▼
src/components/<Name>/   Component + .module.css + .stories.tsx + index.ts
   │
   ▼
src/HomePage.tsx         The Figma "✏️ Design" page, assembled. No styling in it.
```

Key rule the codebase follows: **components use `var(--token)` and nothing
else.** The only literal values are stroke widths, focus-ring geometry and
the logo size — Figma has no tokens for those, and each is documented.

## Files worth knowing

| File | What it is |
|---|---|
| `my-design-system/gaps.md` | Everything that didn't translate cleanly from Figma — Figma-side mistakes, missing states, untokenised values, contrast findings. Read this before answering "why is X like this?" |
| `my-design-system/README.md` | Commands, how to run things |
| `src/components/breakpoint.ts` | The shared `desktop \| tablet \| mobile` type and why it's a prop |
| `src/useBreakpoint.ts` | Hook that makes the real page responsive |
| `scripts/build-tokens.mjs` | The token → CSS generator |

## Commands

| Command | Does |
|---|---|
| `npm run dev` | The real website, localhost:5173 |
| `npm run storybook` | Component catalogue, localhost:6006 |
| `npm run build:tokens` | Regenerate `tokens.css` from `tokens.json` |
| `npx tsc --noEmit` | Type-check |

Run these from `my-design-system/`, not the repo root.

## Conventions

- **CSS Modules**, not a CSS-in-JS library — plain CSS, scoped per component.
- Prop names match the Figma property names, including the odd ones
  (`hadButton` is a Figma typo kept deliberately; `Menu`'s `state` is renamed
  from Figma's unusable `"Property 1"`). `gaps.md` §1 explains each.
- Every component and prop has a written description in its story — the
  Storybook MCP addon reads these, so keep them accurate if you change a prop.
- Not a git repository. There is no version history to consult.
