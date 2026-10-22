# Progress

**Updated:** 2026-10-22

## What works (shipped)
- Premium dark microsite with Łódź hero, glass countdown, progress bar, timeline, particles.
- Warsaw-offset countdown, concert-day state change, reduced-motion support.
- PL default with EN toggle remembered in `localStorage`.
- Sting YouTube playlist player below the countdown.
- Mobile layout verified at 390px.
- Ten bilingual Sting trivia records rotate every 20 seconds (`a0351cb`).

## In progress
- Nothing started. Phase 2 plan written.

## What's left (Phase 2: easter eggs)
| Task | Egg | Status |
|------|-----|--------|
| TASK001 | Heart spark burst | Pending |
| TASK002 | Konami / triple-tap STING: beams + five random bilingual memories + optional local TTS | Pending |
| TASK003 | Song wink: console message + footer dot titles | Pending |
| TASK004 | Concert-day confetti celebration | Pending |

## What's left (trivia upgrades)

All six tasks are planning-only, Pending at 0%; no trivia upgrade code has been written.

| Task | Upgrade | Status | Prerequisites |
|------|---------|--------|---------------|
| [TASK005](tasks/TASK005-expanded-trivia-json.md) | 50-100 verified bilingual JSON records | Pending | None |
| [TASK006](tasks/TASK006-random-trivia-button.md) | Random Trivia button | Pending | None |
| [TASK007](tasks/TASK007-trivia-category-badges.md) | Six localized category badges | Pending | TASK005 |
| [TASK008](tasks/TASK008-trivia-fade-transition.md) | Motion-safe fade between facts | Pending | None |
| [TASK009](tasks/TASK009-trivia-fact-indicator.md) | Fact number and dataset total | Pending | None |
| [TASK010](tasks/TASK010-trivia-repeat-prevention.md) | Browser-local consecutive-repeat prevention | Pending | TASK005, TASK006 |

## Commit log (Phase 2)
_None yet. Append `hash subject` per task as each lands._

## Known issues
- `.github/` is gitignored, so local instruction files are not shared via the repo.
- Headless Edge cannot go below ~500px wide; use the iframe wrapper for 390px checks.
