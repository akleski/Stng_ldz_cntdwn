# TASK003 - Song wink (console message + footer dot)

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
Add easter egg: a small "Roxanne" / "Englishman in New York" wink in the console or on the footer. Commit separately using `/caveman-commit` style.

## Thought Process
- Depends on the TASK002 toast.
- **Copyright:** use song titles only, never lyrics.
- Console: one styled `console.log` on load for the curious (gold + emerald `%c` styles), bilingual by `navigator.language` or current page language. Keep it a single call, no spam.
- Footer: the existing `.footer-dot` (·) becomes a hidden-in-plain-sight button that cycles through song titles in the toast: Roxanne, Englishman in New York, Fields of Gold (gold = Adam), Shape of My Heart (heart = Monika), Every Breath You Take, Desert Rose. Order is fixed so it feels intentional, then loops.
- The dot must stay visually unchanged except `cursor: pointer` and a focus ring. Make it a `<button>` with `aria-label` (bilingual, neutral wording such as "Next song hint" is acceptable but should not spoil; use "·" semantics: "Mała niespodzianka" / "A little surprise").
- Toast text format: "♫ Roxanne" (title only). Optionally tint the ♫ gold for odd entries and emerald for even.
- Reduced motion has no impact (toast fade can be instant).

## Implementation Plan
- HTML: change `.footer-dot` span to a button with bilingual aria-label.
- CSS: button reset for the dot, focus-visible ring, toast tint variants.
- JS: `songs` array, index counter, click handler calling `showToast()`; styled console message on load.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 3.1 | Styled console message on load | Complete | 2026-10-22 | Single call in saved page language |
| 3.2 | Footer dot as accessible button | Complete | 2026-10-22 | Bilingual label; native Enter activation |
| 3.3 | Song-title cycle via toast | Complete | 2026-10-22 | Six titles; alternating accent tint |
| 3.4 | Verify (CDP click x7 to see loop), desktop/mobile, console only shows intended message | Complete | 2026-10-22 | Four Edge configurations passed |
| 3.5 | Update memory bank and commit | Complete | 2026-10-22 | `feat: add song title wink in footer and console` |

## Progress Log
### 2026-10-22
- Task created and planned.
- Implemented the unchanged-looking accessible footer dot, fixed six-title cycle, gold/emerald toast and single bilingual console message. Titles only, no lyrics.
- Four Edge CDP configurations (1440px/390px, both motion modes) passed: Enter plus seven mouse activations, loop order/tints, bilingual label, single console log, toast timeout/cleanup, no horizontal overflow or browser exceptions. Inspected desktop/mobile footer screenshots.
- Updated task table, index, progress and active context for the separate commit.
