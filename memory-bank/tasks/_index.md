# Tasks Index

## In Progress
_None_

## Pending
- [TASK010](TASK010-trivia-repeat-prevention.md) Remember last fact - Browser-local consecutive-repeat prevention; depends on TASK005 and TASK006

## Completed
- [TASK009](TASK009-trivia-fact-indicator.md) Fact number indicator - Localized one-based position and actual dataset total - Completed 2026-10-22
- [TASK008](TASK008-trivia-fade-transition.md) Fade between facts - Coordinated transition with reduced-motion fallback - Completed 2026-10-22
- [TASK007](TASK007-trivia-category-badges.md) Category badges - Career, The Police, Personal Life, Awards, Movies, Activism; depends on TASK005 - Completed 2026-10-22
- [TASK006](TASK006-random-trivia-button.md) Random Trivia button - Accessible manual selection alongside automatic rotation - Completed 2026-10-22
- [TASK005](TASK005-expanded-trivia-json.md) Expanded trivia JSON - 87 verified bilingual records with stable IDs and categories - Completed 2026-10-22
- [TASK004] Concert-day confetti - Completed 2026-10-22; live/late arrival, cap, cleanup, replay and reduced motion verified
- [TASK003] Song wink - Completed 2026-10-22; seven-activation loop, keyboard, PL/EN and toast cleanup verified
- [TASK002] Beams + spoken dedication - Completed 2026-10-22; triggers, shuffle, bilingual text and local TTS mocks passed; real audio needs device check
- [TASK001] Heart spark burst - Completed 2026-10-22; desktop/mobile, keyboard, PL/EN and reduced-motion checks passed

## Abandoned
_None_

## Rules for every task
- One commit per task, message in `/caveman-commit` style without a Copilot co-author trailer. No push.
- Same commit updates: task file (subtasks table + progress log), this index, `../progress.md`, `../activeContext.md`.
- Verify before committing: no console errors, desktop 1440 + mobile 390, reduced-motion off/on, PL and EN.
- Easter-egg order: 001 -> 002 -> 003 -> 004.
- Trivia prerequisites: TASK005 -> TASK007; TASK005 + TASK006 -> TASK010. TASK006, TASK008, and TASK009 can start with existing trivia; no dependency on the easter eggs.
- TASK005-TASK010 were added on 2026-10-22 and are implemented as separate feature commits. TASK005 targets exactly 87 records.
