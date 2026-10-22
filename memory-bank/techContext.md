# Tech Context

## Stack
- HTML5, CSS3 (custom properties, `backdrop-filter`, scroll-driven animation with `@supports` fallback), vanilla ES2020 JavaScript.
- Hosting: GitHub Pages from the repo root. No build, no CI needed for the page.

## Environment
- Windows, PowerShell. Node v26 available (no Playwright/Puppeteer installed). Microsoft Edge at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- `.gitignore` ignores `docs` and `.github/`. `memory-bank/` is tracked.

## Trivia regression checks
- `tests/run-trivia.ps1` runs `tests/trivia.test.js` in an installed Chromium browser, without Node or package dependencies. Override the executable with `-Chrome`.
- Temporary local page/profile, exact-width iframe for 1440px/390px, optional real reduced-motion browser flag; interval registration/callbacks are deterministic. Broken, empty and single-record dataset variants exercise startup fallback. Temporary artifacts are removed.
- Run with `-Task 5` through `-Task 10` as each feature is introduced; tests remain cumulative. Browser assertions verify title/text localization, selection, badges, fade, numbering, repeat prevention, countdown initialization and no overflow/exceptions.
- Variants: `-Width 390`, `-ReducedMotion`, `-Dataset broken|empty|single`, `-Storage blocked|corrupt|stale`. Real reload, keyboard, touch and live reduced-motion toggling were additionally verified over CDP against a local `python -m http.server` (script kept outside the repo).

## Verification approach (easter eggs)
1. Static: view diffs, confirm no console errors.
2. Visual: headless Edge screenshot, launched via `Start-Process -PassThru` + `WaitForExit(timeout)` + throwaway `--user-data-dir`. A bare `&` call can hang.
3. Interaction and time-travel: drive headless Edge over the Chrome DevTools Protocol with a temp Node script (built-in `WebSocket`, `--remote-debugging-port`). Use `Page.addScriptToEvaluateOnNewDocument` to override `Date` for the concert-day test (TASK004), `Input.dispatchKeyEvent` for the Konami code, `Input.dispatchMouseEvent` for clicks. Keep scripts in `%TEMP%`, delete afterwards.
4. Mobile: use CDP `Emulation.setDeviceMetricsOverride` for a true 390px viewport (verified), despite the headless window minimum. A 390px iframe wrapper remains an alternative.
5. Reduced motion: `Emulation.setEmulatedMedia` with `prefers-reduced-motion: reduce`.

## Constraints
- No new files in the repo besides memory-bank docs unless a task needs it (keep inline script + `styles.css`).
- No autoplay or new external requests/dependencies for the eggs. Optional dedication audio uses the built-in Web Speech API exclusively with matching-language `localService` voices.
- Male voice selection is best-effort: the API exposes no standardized gender field. Offer a local voice selector and text-only fallback.
- Audible output and actual voice availability require manual device checks; headless tests can validate mocked selection, lifecycle and fallback paths.
- Song titles only, never lyrics.

## Related local guidance
- `.github/instructions/image-aware-layout.instructions.md`: how to inspect the hero image and place UI.
- `.github/skills/caveman-commit/SKILL.md`: commit message format.
