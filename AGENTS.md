# AGENTS.md

Project context for every ticket. Read it before changing anything.

## What this is

A one page About Me site for Giorgi Dalakishvili, AI Solution Engineer in Tbilisi.

## Stack

- Next.js App Router with static export
- TypeScript
- Plain CSS
- No UI libraries, no templates, no Kickstarts

## Layout

- Each section is its own file in `src/sections/`: Hero, Shipped, HowBuilt, FieldReport, Why, Life, Contact.
- `src/app/page.tsx` only composes the sections. It holds no content.
- A ticket edits only its own section, so parallel tickets do not conflict.
- Section styles live in that section's own CSS module.

## Look

The feel is an "engineer's notebook".

| Role | Value |
|---|---|
| Background | `#292522` |
| Text | `#ece1d7` |
| Muted | `#a8957f` |
| Accent | `#e49b5d` |
| Borders | `#4a433c` |
| Links | `#a3a9ce` |

- Warm dark palette only.
- Serif for headings. Monospace for details and numbers.
- One narrow column.

## Never

- Purple
- Gradients
- Glassmorphism
- Emoji icons
- Icon card grids
- "Hi, I'm Giorgi 👋"
- Stock illustrations
- Animated hero text

## Copy

- First person, plain words, short sentences.
- No dashes as punctuation.
- Every project line says what changed, with a real number.
- No invented facts.
- No phone number.

## Done means

- `npm run build` passes.
- No horizontal scroll at 320px.
- Lighthouse accessibility is 95 or higher.

## Decisions

Decision records live in `docs/decisions/`, named `YYYY-MM-DD-topic.md`.
