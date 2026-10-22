# Active Context

**Updated:** 2026-10-22

## Current focus
Phase 2: four planned easter eggs, plus six trivia upgrades tracked in [the task index](tasks/_index.md). TASK005-TASK010 were added from the selected future-upgrades list; all remain Pending at 0%. This update only creates plans, not application features.

## Recent changes (from git history)
- 2026-10-21 `fb58aa4` initial commit, `25d2bbc` premium microsite redesign, `be47fd5` PL default + EN/PL toggle.
- 2026-10-22 `2aae9dc` / `fe4ef2f` / `2e137c9` Sting YouTube playlist player and copy trim, `973ff08` README.
- 2026-10-22 audit: no existing easter eggs. Only surprise was the concert-day text swap.
- `a0351cb` shipped ten bilingual Sting trivia records with automatic 20-second rotation. New trivia tasks extend that existing card.

## Next steps
1. Commit the memory bank itself (`docs: add memory bank for easter-egg plan`) once the user approves the plan.
2. TASK001 -> TASK002 -> TASK003 -> TASK004, strictly in that order (shared helpers).
3. After each task: verify, update task file + `_index.md` + `progress.md` + this file, then commit with a `/caveman-commit` style message.
4. Trivia track is independent of easter eggs: TASK005 supplies JSON/category IDs for TASK007 and TASK010; TASK006 supplies manual selection for TASK010. TASK008 and TASK009 can start with the existing card.

## Trivia planning assumptions
- Keep automatic rotation; manual selection restarts the 20-second interval.
- Embedded JSON preserves direct local-file use without fetch restrictions.
- "Fact #17 of 63" means dataset position, not viewed count; values are illustrative.
- Store only the last fact ID to avoid consecutive repeats in one browser/origin; no cross-device synchronization or full history is planned.
- These are implementation defaults recorded for future work, not additional user-confirmed behavior.

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
