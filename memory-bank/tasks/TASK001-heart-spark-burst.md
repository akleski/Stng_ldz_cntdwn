# TASK001 - Heart spark burst

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
Add easter egg: click the ❤️ for a burst of gold and emerald sparks. Commit separately using `/caveman-commit` style.

## Thought Process
- The heart is currently `<span class="heart" aria-hidden="true">` inside `.names` (which carries the aria-label), with a CSS heartbeat.
- To be keyboard- and touch-accessible, make it a real `<button class="heart">` with a bilingual `aria-label`, reset button styles so the look is unchanged. Remove `aria-hidden` (a focusable element must not be hidden from AT).
- Sparks are short-lived DOM spans animated with the Web Animations API, appended to a fixed pointer-events-none `.fx-layer`. Nodes remove themselves on finish, so no leaks.
- Gold sparks use `--gold-soft`, emerald use `--emerald-soft`, alternating, matching Adam/Monika.
- `burst(x, y, opts)` is written generically so TASK004 can reuse it for confetti.
- Reduced motion: no-op (heart still focusable but does nothing visible).
- Rapid clicks: cap simultaneous sparks (about 120) to avoid jank.

## Implementation Plan
- Add `.fx-layer` container (`aria-hidden="true"`) once, near the end of `<body>`.
- Turn `.heart` span into `<button type="button" class="heart" data-en-aria-label=... aria-label=...>❤️</button>`.
- CSS: button reset (background/border/padding/font/cursor), keep heartbeat, focus-visible ring, `.spark` style (glow via box-shadow), `.fx-layer` fixed layer.
- JS: `burst()` helper using `element.animate()`; click handler computes origin from `getBoundingClientRect()` (also works for keyboard activation).
- Add PL/EN label strings.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 1.1 | Add `.fx-layer` + CSS for `.spark` and button reset | Complete | 2026-10-22 | Fixed, non-interactive layer |
| 1.2 | Convert heart to accessible bilingual button | Complete | 2026-10-22 | Layout preserved |
| 1.3 | Implement `burst()` + click handler, reduced-motion gate, spark cap | Complete | 2026-10-22 | 120-node cap; cancel/finish cleanup |
| 1.4 | Verify desktop/mobile, PL/EN, reduced motion, keyboard, console clean | Complete | 2026-10-22 | Four Edge CDP configurations passed |
| 1.5 | Update memory bank and commit | Complete | 2026-10-22 | `feat: add heart click spark burst` |

## Progress Log
### 2026-10-22
- Task created and planned.
- Implemented the bilingual heart button, shared FX layer and capped WAAPI burst helper. Animations remove their nodes on finish/cancel; switching to reduced motion clears live effects.
- Edge CDP checks passed at 1440px and 390px in both motion modes: Enter activation, rapid clicks, cleanup, language switch, no horizontal overflow and no browser exceptions. Screenshots inspected; existing layout preserved.
- Updated the task table, index, progress and active context for the separate feature commit.
