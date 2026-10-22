# TASK008 - Fade between trivia facts

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
"Fade animation between facts."

## Thought Process
- Animate the existing card content without moving the countdown or surrounding layout.
- Respect the existing reduced-motion preference; animation must never delay access to readable text in reduced-motion mode.
- Use one transition path for timer and manual updates, including future badges and numbering when present.

## Implementation Plan
- Add a short opacity fade-out, coordinated content update, and fade-in using existing CSS/vanilla JavaScript.
- Cancel or supersede stale transitions on rapid requests; the final visible content must match the selected fact and current language.
- Skip animation under reduced motion and keep the card readable if animations are unavailable or interrupted.
- Verify timer updates, rapid changes, language switching during a fade, and live reduced-motion changes.

## Acceptance Criteria
- Facts fade smoothly without overlapping text or transition-induced layout shifts.
- Title, fact, badge, and counter stay synchronized when those elements exist.
- Reduced-motion users receive immediate updates; interrupted transitions cannot leave content invisible.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 8.1 | Add coordinated opacity transition | Complete | 2026-10-22 | Shared render path |
| 8.2 | Handle cancellation and reduced-motion fallback | Complete | 2026-10-22 | Never leave invisible text |
| 8.3 | Verify transition edge cases; update memory bank | Complete | 2026-10-22 | Desktop/mobile, PL/EN |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Can start with current automatic rotation; integrate manual updates when TASK006 exists.

- Implemented: Added a 180 ms opacity fade between trivia facts via one shared render path: only badge, title and text fade, rapid requests share a single pending render, language change or reduced motion cancels it and renders immediately.
- Verified: 62/53 browser checks at 1440px and 390px (normal and reduced motion, rapid clicks, language switch mid-fade, timer fades); live CDP check that toggling reduced motion mid-fade shows the fact immediately; no overflow or exceptions.
- Updated task status, subtasks, index, progress and active context in the separate feature commit; no Copilot trailer and no push.
