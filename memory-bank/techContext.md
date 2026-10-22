# Tech Context

## Stack
- HTML5, CSS3 (custom properties, `backdrop-filter`, scroll-driven animation with `@supports` fallback), vanilla ES2020 JavaScript.
- Hosting: GitHub Pages from the repo root. No build, no CI needed for the page.

## Environment
- Windows, PowerShell. Node v26 available (no Playwright/Puppeteer installed). Microsoft Edge at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- `.gitignore` ignores `docs` and `.github/`. `memory-bank/` is tracked.

## Verification approach (no test framework in repo)
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
