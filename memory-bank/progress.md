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
_None. All four Phase 2 eggs are implemented and browser-verified._

## Phase 2 verification
- Heart sparks, arena beams, five shuffled bilingual memories, local-only narration, song wink and concert-day confetti are complete.
- Edge CDP checks cover 1440px/390px, PL/EN, both motion preferences, keyboard/touch/mouse, narration mocks and live/late concert arrival. Screenshots inspected; no browser exceptions or layout overflow.
- Actual device voice availability and audible narration remain manual checks. No remote voices, autoplay, private relationship dates, lyrics or shipped test hooks.

## Phase 2 status
| Task | Egg | Status |
|------|-----|--------|
| TASK001 | Heart spark burst | Completed |
| TASK002 | Konami / triple-tap STING: beams + five random bilingual memories + optional local TTS | Completed |
| TASK003 | Song wink: console message + footer dot titles | Completed |
| TASK004 | Concert-day confetti celebration | Completed |

## Trivia upgrades

Trivia upgrades are implemented and verified incrementally in separate commits. TASK005 targets exactly 87 bilingual records; remaining Pending rows have not shipped yet.

| Task | Upgrade | Status | Prerequisites |
|------|---------|--------|---------------|
| [TASK005](tasks/TASK005-expanded-trivia-json.md) | 87 verified bilingual JSON records | Completed | None |
| [TASK006](tasks/TASK006-random-trivia-button.md) | Random Trivia button | Completed | None |
| [TASK007](tasks/TASK007-trivia-category-badges.md) | Six localized category badges | Completed | TASK005 |
| [TASK008](tasks/TASK008-trivia-fade-transition.md) | Motion-safe fade between facts | Completed | None |
| [TASK009](tasks/TASK009-trivia-fact-indicator.md) | Fact number and dataset total | Completed | None |
| [TASK010](tasks/TASK010-trivia-repeat-prevention.md) | Browser-local consecutive-repeat prevention | Pending | TASK005, TASK006 |

## Commit log (Phase 2)
- `19df3bf feat: add heart click spark burst`
- `178eb96 feat: add spoken dedication and arena beams`
- `3bf6972 feat: add song title wink in footer and console`
- TASK004: `feat: add concert-day confetti celebration` (the commit containing this completion entry; locate by subject).

## Known issues
- `.github/` is gitignored, so local instruction files are not shared via the repo.
- Headless Edge's window minimum is bypassed by CDP device metrics for true 390px viewport checks.
- Local voice availability and perceived voice gender vary by device; text-only fallback is intentional.

## TASK005 completion
- Embedded 87 sourced bilingual trivia records (career 18, police 16, personal 12, awards 15, movies 14, activism 12) as non-executable JSON with stable IDs, parsed once and validated, with a bilingual fallback and no pointless rotation for empty/single datasets.
- Verification: Every record fact-checked against fetched sources by independent reviewers and corrected; 27 browser checks passed at 1440px and 390px with reduced motion, plus broken/empty/single dataset variants.

## TASK006 completion
- Added a native bilingual Random fact button to the existing trivia card. It picks a different fact (no retry loop), restarts the single 20-second rotation timer, keeps the selected fact across PL/EN, and hides when fewer than two records exist.
- Verification: 39 browser checks at 1440px and 390px (300 rapid clicks never repeat, single timer, language preservation, hidden for empty/single data); live CDP Enter, Space and touch activation passed; screenshots inspected at both widths.

## TASK007 completion
- Added a localized category badge (Kariera/Career, The Police, Życie prywatne/Personal Life, Nagrody/Awards, Filmy/Movies, Aktywizm/Activism) to the trivia card, updated in the same render as title and text; missing metadata hides it.
- Verification: 48 browser checks at 1440px and 390px incl. all 87 records in PL and EN, atomic manual/automatic updates, unknown-category fallback; live screenshots inspected at both widths (longest PL badge wraps cleanly).

## TASK008 completion
- Added a 180 ms opacity fade between trivia facts via one shared render path: only badge, title and text fade, rapid requests share a single pending render, language change or reduced motion cancels it and renders immediately.
- Verification: 62/53 browser checks at 1440px and 390px (normal and reduced motion, rapid clicks, language switch mid-fade, timer fades); live CDP check that toggling reduced motion mid-fade shows the fact immediately; no overflow or exceptions.

## TASK009 completion
- Added a localized fact indicator (Ciekawostka #N z M / Fact #N of M) derived from the selected record position and live dataset length, rendered with the badge, title and text and hidden without a valid record.
- Verification: 70/61 browser checks at 1440px and 390px incl. all 87 records in PL and EN, first/last, wraparound, language/manual selection, total following dataset size, single/empty/broken fallbacks; screenshots inspected at both widths.
