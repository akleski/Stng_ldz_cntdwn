# Sting in Łódź Countdown

A personal countdown for Adam and Monika to Sting’s concert at Atlas Arena in Łódź on 10 June 2027, with Polish and English versions.

**[View the live countdown on GitHub Pages](https://akleski.github.io/Stng_ldz_cntdwn/)**

## Trivia

The card rotates every 20 seconds through 87 original, sourced Polish/English facts. **Random fact** shows a different fact at once and restarts the timer. The last shown fact is remembered in this browser only, so a reload never starts on the same fact (no history, no sync). Each fact carries a localized category badge (Career, The Police, Personal Life, Awards, Movies, Activism) and a position indicator such as “Fact #17 of 87”, and changes with a short fade (skipped under reduced motion). Switching language translates the current fact. The embedded `application/json` dataset works from a local file and GitHub Pages without fetching data.

Each record has a unique stable `id`, a `category` (`career`, `police`, `personal`, `awards`, `movies`, or `activism`), `pl` and `en` objects with nonempty `title` and `text`, and a nonempty array of HTTPS `sources`. Source URLs document factual support; no lyrics or copied passages are included. Invalid JSON or records fall back to the bilingual teacher fact; empty/single-record datasets do not rotate.

Run browser regression checks with an installed Chromium browser (no package installation):

```powershell
.\tests\run-trivia.ps1 -Task 5
.\tests\run-trivia.ps1 -Task 5 -Width 390 -ReducedMotion
.\tests\run-trivia.ps1 -Task 5 -Dataset broken
```

Use `-Chrome` to override the browser executable path. Tests use a temporary profile and page, stub only intervals for deterministic timer checks, and remove the test artifacts afterwards.

## Hidden surprises
- Click or keyboard-activate the heart for gold and emerald sparks.
- Triple-click/tap **STING** within one second (or use ↑ ↑ ↓ ↓ ← → ← → B A) to reveal arena beams and one of five personal memories. **Read aloud** uses only local voices matching the current PL/EN language; it never starts automatically. If no suitable voice exists, the memory remains text-only.
- Activate the footer dot to cycle through six Sting song titles.
- When concert time arrives, confetti celebrates once per page load. The closing ✦ can replay it only after arrival.

All effects respect reduced motion. Narration stops on Close, Stop, another memory, a language/voice change or leaving the page. Exact private relationship dates and times are not published.

The page uses plain HTML, CSS and JavaScript with no build step. Task specifications and verification results are tracked in [memory-bank/tasks/](memory-bank/tasks/_index.md).
