# Gebeta style for the docs

The docs should look like the same product as [gebeta.app](https://gebeta.app). This folder carries the marketing site's design tokens, its Tailwind extensions and the rules behind them.

| File                 | What it is                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `gebeta-tokens.css`  | Colours, surfaces and shadows for light and dark mode                                                         |
| `tailwind-preset.js` | Tailwind classes for those tokens (`bg-ink`, `text-soft`, `shadow-card`, …), the Geist font and easing curves |
| `STYLE.md`           | This guide                                                                                                    |

## Setup

1. **Tokens.** In `app/global.css`, replace the existing `@layer base { :root { … } .dark { … } }` block with the contents of `gebeta-tokens.css`.

   Paste it there rather than `@import`-ing it at the top of the file. The `addVariablesForColors` plugin in `tailwind.config.js` writes a CSS variable for every Tailwind colour into Tailwind's base layer (for example `--ink: hsl(var(--ink))`). The tokens must come after that, and they only do when they sit below `@tailwind base`.

   Fumadocs reads the same variables (`--background`, `--primary`, `--muted-foreground`, …), so the sidebar, search, TOC and code blocks take the new colours with no further changes.

2. **Tailwind preset.** In `tailwind.config.js`:

   ```js
   import gebetaPreset from "./design-kit/tailwind-preset.js";

   export default {
     presets: [createPreset(), gebetaPreset],
     // …
   };
   ```

3. **Font.** Geist replaces Plus Jakarta Sans:

   ```bash
   pnpm add geist
   ```

   ```tsx
   // app/layout.tsx
   import { GeistSans } from "geist/font/sans";
   import { GeistMono } from "geist/font/mono";

   <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
   ```

   Then remove the `body { font-family: "Plus Jakarta Sans Variable", … }` rule and the `@fontsource` imports from `app/global.css`.

4. **Check** a docs page, the API reference and search in both light and dark mode.

## Colour

**Orange is for calls to action.** `primary` (orange) marks what to click: the main button on a page, plus at most one highlight per section, such as the recommended option in a comparison. Everything else stays neutral.

**Ink is the accent.** `ink` is a warm near-black (a warm off-white in dark mode) for strong emphasis that isn't a call to action: secondary buttons that still need weight, the active tab, a dark callout band.

| Use                           | Class                                                   |
| ----------------------------- | ------------------------------------------------------- |
| Body text                     | `text-foreground`                                       |
| Secondary text, descriptions  | `text-soft`                                             |
| Hints, captions, placeholders | `text-subtle`                                           |
| Page background               | `bg-background`                                         |
| Cards, code blocks, panels    | `bg-card shadow-card` or `bg-raised`                    |
| Hover background              | `hover:bg-hover`                                        |
| Borders                       | `border-border`, stronger: `border-line-strong`         |
| Primary button                | `bg-primary text-primary-foreground shadow-btn-primary` |
| Strong non-CTA button         | `bg-ink text-ink-foreground shadow-btn-ink`             |
| Status                        | `text-success`, `text-warning`, `text-danger`           |

Don't use raw hex values or Tailwind palette colours (`gray-600`, `blue-500`) in components; reach for a token so dark mode and future changes follow automatically.

## Type

Geist throughout, Geist Mono for code.

| Element                      | Style                                                                    |
| ---------------------------- | ------------------------------------------------------------------------ |
| Page title                   | `text-[44px] md:text-[64px] font-medium leading-[1] tracking-[-0.035em]` |
| Section heading (h2)         | `text-[26px] font-medium leading-[1.2] tracking-[-0.02em]`               |
| Sub-heading (h3)             | `text-[20px] font-medium leading-[1.3]`                                  |
| Body                         | `text-[16px]` to `text-[18px]`, `leading-[1.6]`                          |
| Lead paragraph under a title | `text-[18px] leading-[1.5] text-soft`                                    |
| Small print                  | `text-[13px] text-subtle`                                                |

Headings are medium weight (500), never bold. Keep one H1 per page.

## Links

Links in text are `text-foreground` with a thin underline: `underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground`. Navigation links hover to `text-soft` or underline. Links are never orange.

## Surfaces

- **Radius:** `rounded-lg` for cards and code blocks, `rounded-full` for buttons, tags and segmented controls.
- **Shadows:** `shadow-card` for cards, `shadow-overlay` for popovers, menus and dialogs. Avoid heavy drop shadows.
- **Buttons:** pill-shaped (`rounded-full`), medium weight, `px-4 py-2.5 text-[14px]` for regular size.

## Motion

- **Buttons, links and menu items never animate in.** They're there from the first frame, ready to use.
- **Text may rise in** on scroll (opacity and a small upward move), once.
- **Hover and state changes** take 150 ms with `ease-power3-out`.
- **Respect reduced motion:** anything decorative stops under `prefers-reduced-motion`.

## Example

```tsx
<section className="flex flex-col gap-4">
  <h1 className="text-[44px] md:text-[64px] font-medium leading-[1] tracking-[-0.035em] text-foreground">
    Directions API
  </h1>
  <p className="max-w-[48ch] text-[18px] leading-[1.5] text-soft">
    Turn-by-turn routes with distance and duration, in one request.
  </p>
  <div className="flex gap-3">
    <a
      href="/dashboard"
      className="rounded-full bg-primary px-5 py-3 text-[15px] font-medium text-primary-foreground shadow-btn-primary"
    >
      Get an API key
    </a>
    <a
      href="#reference"
      className="rounded-full bg-card px-5 py-3 text-[15px] font-medium text-foreground shadow-btn"
    >
      API reference
    </a>
  </div>
</section>
```
