# TASK006 - Random Trivia button

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
"Random Trivia button."

## Thought Process
- Add manual discovery to the existing 20-second rotation, not a separate card.
- Random selection should exclude the current fact when alternatives exist. Persistent repeat prevention is tracked separately in [TASK010](TASK010-trivia-repeat-prevention.md).
- Language switching translates the selected fact without drawing another record.

## Implementation Plan
- Add a visible native button with PL/EN text and accessible focus styling.
- Route manual selections through the existing trivia renderer; handle empty and single-record datasets safely.
- Preserve automatic rotation and restart its 20-second interval after manual selection so the new fact is not immediately replaced.
- Verify mouse, touch, Enter/Space, rapid activation, language switching, and coexistence with the timer.

## Acceptance Criteria
- Button shows a random different fact when at least two records exist.
- Selected fact remains consistent across PL/EN changes; manual and automatic updates use one card.
- Button is keyboard accessible and fits the 390px layout.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 6.1 | Add bilingual accessible button | Complete | 2026-10-22 | Existing trivia card |
| 6.2 | Implement random selection and timer coordination | Complete | 2026-10-22 | No immediate repeats |
| 6.3 | Verify inputs, timer, PL/EN; update memory bank | Complete | 2026-10-22 | Empty/single-record checks |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Can start with the existing dataset; no dependency on TASK005.

- Implemented: Added a native bilingual Random fact button to the existing trivia card. It picks a different fact (no retry loop), restarts the single 20-second rotation timer, keeps the selected fact across PL/EN, and hides when fewer than two records exist.
- Verified: 39 browser checks at 1440px and 390px (300 rapid clicks never repeat, single timer, language preservation, hidden for empty/single data); live CDP Enter, Space and touch activation passed; screenshots inspected at both widths.
- Updated task status, subtasks, index, progress and active context in the separate feature commit; no Copilot trailer and no push.
