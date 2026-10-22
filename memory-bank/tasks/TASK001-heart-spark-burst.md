# TASK001 - Heart spark burst

**Status:** Pending  
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

**Overall Status:** Not Started - 0%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 1.1 | Add `.fx-layer` + CSS for `.spark` and button reset | Not Started | 2026-10-22 | |
| 1.2 | Convert heart to accessible bilingual button | Not Started | 2026-10-22 | Layout must not shift |
| 1.3 | Implement `burst()` + click handler, reduced-motion gate, spark cap | Not Started | 2026-10-22 | Reused by TASK004 |
| 1.4 | Verify desktop/mobile, PL/EN, reduced motion, keyboard, console clean | Not Started | 2026-10-22 | CDP click + screenshot |
| 1.5 | Update memory bank and commit | Not Started | 2026-10-22 | Suggested: `feat: add heart click spark burst` |

## Progress Log
### 2026-10-22
- Task created and planned. No code written.
