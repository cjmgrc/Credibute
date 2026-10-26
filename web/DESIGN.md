# Credibute design notes

**Direction:** modern-minimal with Apple-style craft. Quiet surfaces, one accent, motion that answers the user's action.

## Tokens (`assets/styles/main.css`)

| Role                | Light                                         | Dark                              |
| ------------------- | --------------------------------------------- | --------------------------------- |
| canvas              | `#f7f7f5`                                     | `#0e0e12`                         |
| surface             | `#ffffff`                                     | `#16161c`                         |
| ink / ink-2 / ink-3 | `#16161d` / `#4b4b57` / `#6e6e7a`             | `#f3f3f6` / `#b6b6c2` / `#8e8e9b` |
| line                | `#e7e7e2`                                     | `#25252e`                         |
| accent              | `#5457d6`                                     | `#5f63e8` (text `#a1a4ff`)        |
| ok / warn / bad     | green / amber / red, each with a `-soft` tint |                                   |

Use semantic tokens (`bg-surface`, `text-ink-3`, `border-line`), never raw hex. Dark mode is `[data-theme="dark"]`, set before first paint.

**Radius follows hierarchy:** control `0.625rem` → card `1rem` → panel `1.5rem`.
**Type:** Manrope Variable, self-hosted. Scale `t-display / t-h1 / t-h2 / t-h3 / t-body / t-small / t-micro`. Tracking tightens as size grows. Everything is `rem`.

## Motion rules

- Custom curves only: `ease-out-strong` (UI), `ease-drawer` (sheets, segmented thumb). Never ease-in.
- Press feedback on every pressable: `active:scale-[0.97]`, 150ms, fires on pointer-down.
- Transitions, not keyframes, for anything interruptible (overlays, toggles, menus). Only `transform`/`opacity` are animated.
- Exit is faster than enter; sheets leave the way they came.
- Hover styles apply only on real pointers.
- Entrance animation is used once per page (landing hero, results bars), never on frequent navigation.
- `prefers-reduced-motion`: movement becomes a cross-fade. `prefers-reduced-transparency`: materials go solid. `prefers-contrast: more`: stronger borders.

## Materials

`.material` (nav, top bar, tab bar, toasts) and `.material-thick` (evidence sheet, menus) are translucent blur layers. Sidebar stays solid.

## Signature interaction

The **evidence sheet** (`features/results/EvidenceSheet.jsx`): every number opens the commits, reviews, and tests behind it. It tracks the pointer 1:1 when dragged, rubber-bands the wrong way, dismisses on distance or flick velocity, and resumes from its live on-screen position if grabbed mid-animation.

## Product principles expressed in UI

- Missing data is disclosed (`DataNotices`), never shown as zero.
- Exclusions are listed with reasons (`ExcludedPanel`).
- "An estimate, not a grade" appears wherever shares appear (`DisclaimerBanner`).
- Manual criteria are visible but never scored.
- Displayed percentages always total exactly 100 (largest-remainder rounding).
