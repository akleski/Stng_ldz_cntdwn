# TASK004 - Concert-day confetti

**Status:** Pending  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
Add a proper concert-day celebration with confetti instead of just a text swap. Commit separately using `/caveman-commit` style.

## Thought Process
- Depends on TASK001 (`.fx-layer`, `burst()`), so it is the last task.
- Trigger: inside `updateCountdown()` where `concertArrived` flips to true. That branch also runs on load after the date, so visitors arriving late still get it once.
- Confetti = many small rectangles/circles in gold and emerald (plus white), launched from the bottom corners and the top centre, falling with rotation using WAAPI. Duration about 6 s, then all nodes removed. Fire once per page load automatically.
- Replay: after arrival, the closing `✦` (`.closing-spark`) becomes a button that re-fires confetti. Before arrival it stays inert, so the egg cannot be triggered early (keeps the surprise for the day).
- Reduced motion: no confetti; the existing text/timeline state change remains.
- Performance: cap pieces (about 150), single layer, `will-change: transform` only during the animation.
- **Testing without shipping a test hook:** override `Date` via CDP `Page.addScriptToEvaluateOnNewDocument` (e.g. fix "now" to 2027-06-10T18:59:55+02:00 and let it tick, and also a post-date load). Assert the confetti nodes appear, then disappear, and the text/timeline change as before.
- Make sure the later countdown timer clearing (`clearInterval`) still works and no repeated bursts fire each second.

## Implementation Plan
- JS: `celebrate()` using the TASK001 `burst`-style helper with confetti options (shape, gravity, rotation); call once on arrival; wire `.closing-spark` replay.
- CSS: `.confetti` piece styles; `.closing-spark` button reset + focus ring (active only after arrival, `:disabled` look neutral before).
- HTML: `.closing-spark` span to button with bilingual label ("Powtórz fajerwerki" / "Replay celebration"), disabled until arrival.

## Progress Tracking

**Overall Status:** Not Started - 0%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 4.1 | Confetti generator (gold/emerald/white, gravity, rotation) | Not Started | 2026-10-22 | Reuse FX layer |
| 4.2 | Fire once on arrival (live tick + late load) | Not Started | 2026-10-22 | No repeat per second |
| 4.3 | Replay via closing ✦ (post-arrival only) | Not Started | 2026-10-22 | Bilingual aria-label |
| 4.4 | Reduced-motion gate + piece cap | Not Started | 2026-10-22 | |
| 4.5 | Verify with CDP Date override (live tick + late load), desktop/mobile | Not Started | 2026-10-22 | Temp script in %TEMP% |
| 4.6 | Update memory bank and commit | Not Started | 2026-10-22 | Suggested: `feat: add concert-day confetti celebration` |

## Progress Log
### 2026-10-22
- Task created and planned. No code written.
