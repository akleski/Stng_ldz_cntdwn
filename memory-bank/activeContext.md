# Active Context

**Updated:** 2026-10-22

## Current focus
Phase 2: add four easter eggs, one commit each, tracked in `tasks/`. Planning is complete. No egg code written yet.

## Recent changes (from git history)
- 2026-10-21 `fb58aa4` initial commit, `25d2bbc` premium microsite redesign, `be47fd5` PL default + EN/PL toggle.
- 2026-10-22 `2aae9dc` / `fe4ef2f` / `2e137c9` Sting YouTube playlist player and copy trim, `973ff08` README.
- 2026-10-22 audit: no existing easter eggs. Only surprise was the concert-day text swap.

## Next steps
1. Commit the memory bank itself (`docs: add memory bank for easter-egg plan`) once the user approves the plan.
2. TASK001 -> TASK002 -> TASK003 -> TASK004, strictly in that order (shared helpers).
3. After each task: verify, update task file + `_index.md` + `progress.md` + this file, then commit with a `/caveman-commit` style message.

## Active decisions
- Konami code is desktop-only, so triple-click/triple-tap on "STING" is the equivalent for phones.
- Toast and FX layer are shared infrastructure, introduced in the first task that needs them (not as a separate commit).
- Egg text is bilingual; PL is the default.
- TASK002 now selects one of five relationship memories without repetition, with optional local-only TTS. Prefer a male voice, offer a selector, and use text-only when no matching local voice exists. Speak only after Read aloud is pressed.
- User approved public milestone stories and Tymon's name, but NOT exact relationship dates or times; omit these from tracked memory-bank documents too.
- Random selection retains the current memory on language changes; stop any active narration and translate it instead.
- Confetti can be replayed after the concert date by clicking the closing ✦ (after the real concert-day trigger only).
- Time-travel testing for TASK004 uses a CDP `Date` override, never a test hook shipped in the page.

## Open questions
- Should the memory bank commit be separate from the first egg? (Plan assumes yes.) Answer: YES.
- Five draft PL/EN memory texts are in TASK002; user may add details or revise wording later. Playback and privacy choices are confirmed; implementation has not started.
