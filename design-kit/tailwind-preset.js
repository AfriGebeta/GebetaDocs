/**
 * Gebeta Tailwind preset, matching the marketing site (GebetaNew/tailwind.config.js).
 * Add it after Fumadocs' preset in tailwind.config.js:  presets: [createPreset(), gebetaPreset]
 * The colours read the variables in design-kit/gebeta-tokens.css.
 */
const ds = (name) => `hsl(var(--ds-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
const gebetaPreset = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "hsl(var(--ink) / <alpha-value>)",
          foreground: "hsl(var(--ink-foreground) / <alpha-value>)",
        },
        soft: ds("soft"),
        subtle: ds("subtle"),
        faint: ds("faint"),
        raised: ds("raised"),
        "raised-hover": ds("raised-hover"),
        "line-strong": ds("line-strong"),
        success: ds("success"),
        warning: ds("warning"),
        danger: ds("danger"),
        hover: "var(--ds-hover)",
      },
      boxShadow: {
        card: "var(--ds-shadow-card)",
        overlay: "var(--ds-shadow-overlay)",
        btn: "var(--ds-shadow-btn)",
        "btn-primary": "var(--ds-shadow-btn-primary)",
        "btn-ink": "var(--ds-shadow-btn-ink)",
        "btn-subtle": "var(--ds-shadow-btn-subtle)",
        badge: "var(--ds-shadow-badge)",
      },
      transitionTimingFunction: {
        "power2-out": "cubic-bezier(0.33, 1, 0.68, 1)",
        "power3-in": "cubic-bezier(0.5, 0, 0.75, 0)",
        "power3-out": "cubic-bezier(0.25, 1, 0.5, 1)",
        "power3-in-out": "cubic-bezier(0.76, 0, 0.24, 1)",
        "power4-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth-in-out": "cubic-bezier(0.7, 0, 0, 1)",
      },
    },
  },
};

export default gebetaPreset;
