# Active Context

**Updated:** 2026-10-22

## Current focus
Phase 2 easter eggs and all six trivia upgrades (TASK005-TASK010) are complete and browser-verified, each in a separate feature commit with memory-bank updates and no Copilot co-author trailer. Nothing is in progress; no push has been performed.

## Recent changes (from git history)
- 2026-10-21 `fb58aa4` initial commit, `25d2bbc` premium microsite redesign, `be47fd5` PL default + EN/PL toggle.
- 2026-10-22 `2aae9dc` / `fe4ef2f` / `2e137c9` Sting YouTube playlist player and copy trim, `973ff08` README.
- 2026-10-22 initial audit found no eggs. Phase 2 added heart sparks, Konami/triple-activation arena beams and five memories with local-only narration, song-title hints and concert-day confetti.
- Verified at 1440px and 390px, PL/EN and both motion modes; concert arrival checked via non-shipped CDP clock overrides.
- `a0351cb` shipped ten bilingual Sting trivia records with automatic 20-second rotation.
- 2026-10-22 trivia upgrades, one commit each: `0c6b37d` 87 sourced bilingual records, `2f19c7a` Random fact button, `aaccf7e` category badges, `f99baea` fade between facts, `74379b7` fact number indicator, and the TASK010 last-fact persistence commit (locate by subject `feat(trivia): remember last fact`).

## Next steps
1. Manually check available local voices and audible narration on the intended desktop/mobile devices; browser mocks verified selection and lifecycle, not sound.
2. Optional: revise the approved memory wording if desired, keeping exact private dates/times excluded.
3. No push performed. Publish the local feature commits only when requested.
4. Optional: spot-check a few trivia facts against sources before sharing; every record was fact-checked by independent reviewers and several were corrected, but the dataset is large.

## Trivia decisions (implemented)
- Keep automatic rotation; manual selection restarts the 20-second interval.
- Embedded JSON preserves direct local-file use without fetch restrictions.
- "Fact #17 of 87" means dataset position, not viewed count; the total comes from the dataset.
- Only the last fact ID is stored (`sting-trivia-last-id`), per browser/origin; no cross-device sync or history. Selection excludes the current and saved ID by ID, with in-memory fallback when storage is unavailable.

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
- Five draft PL/EN memory texts are in TASK002; user may add details or revise wording later. Playback and privacy choices are implemented and browser-verified. Actual local voices and audible output require a manual device check.

## TASK005 implemented
- Embedded 87 sourced bilingual trivia records (career 18, police 16, personal 12, awards 15, movies 14, activism 12) as non-executable JSON with stable IDs, parsed once and validated, with a bilingual fallback and no pointless rotation for empty/single datasets.
- Verification: Every record fact-checked against fetched sources by independent reviewers and corrected; 27 browser checks passed at 1440px and 390px with reduced motion, plus broken/empty/single dataset variants.

## TASK006 implemented
- Added a native bilingual Random fact button to the existing trivia card. It picks a different fact (no retry loop), restarts the single 20-second rotation timer, keeps the selected fact across PL/EN, and hides when fewer than two records exist.
- Verification: 39 browser checks at 1440px and 390px (300 rapid clicks never repeat, single timer, language preservation, hidden for empty/single data); live CDP Enter, Space and touch activation passed; screenshots inspected at both widths.

## TASK007 implemented
- Added a localized category badge (Kariera/Career, The Police, Życie prywatne/Personal Life, Nagrody/Awards, Filmy/Movies, Aktywizm/Activism) to the trivia card, updated in the same render as title and text; missing metadata hides it.
- Verification: 48 browser checks at 1440px and 390px incl. all 87 records in PL and EN, atomic manual/automatic updates, unknown-category fallback; live screenshots inspected at both widths (longest PL badge wraps cleanly).

## TASK008 implemented
- Added a 180 ms opacity fade between trivia facts via one shared render path: only badge, title and text fade, rapid requests share a single pending render, language change or reduced motion cancels it and renders immediately.
- Verification: 62/53 browser checks at 1440px and 390px (normal and reduced motion, rapid clicks, language switch mid-fade, timer fades); live CDP check that toggling reduced motion mid-fade shows the fact immediately; no overflow or exceptions.

## TASK009 implemented
- Added a localized fact indicator (Ciekawostka #N z M / Fact #N of M) derived from the selected record position and live dataset length, rendered with the badge, title and text and hidden without a valid record.
- Verification: 70/61 browser checks at 1440px and 390px incl. all 87 records in PL and EN, first/last, wraparound, language/manual selection, total following dataset size, single/empty/broken fallbacks; screenshots inspected at both widths.

## TASK010 implemented
- Persist only the last displayed fact ID under sting-trivia-last-id (separate from the language key). Startup, random and automatic selections exclude the current and saved ID by ID rather than index, so reloads and dataset reorders never immediately repeat a fact; guarded reads/writes with validation and in-memory fallback; empty/single datasets are stable.
- Verification: 77 browser checks at 1440px and 390px (300 mixed selections never repeat, reorder, stale/corrupt/oversized IDs, blocked storage variant, empty/single/broken datasets); real-browser CDP test of 15 consecutive reloads never showing the previous fact, language persistence and countdown unaffected.
