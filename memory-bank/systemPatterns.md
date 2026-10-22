# System Patterns

## Architecture
Static single page. All behaviour lives in one inline `<script>` at the end of `index.html`; all styling in `styles.css`.

## Existing script structure (index.html)
- Constants: `purchaseDate` (2026-10-21 +02:00), `concertDate` (2027-06-10T19:00 +02:00). Explicit Warsaw offset keeps time correct in any visitor timezone.
- i18n: `translations.{pl,en}` for dynamic strings; `data-en` / `data-en-aria-label` / `data-en-content` attributes for static strings; `setLanguage()` swaps text, `localStorage["sting-language"]` remembers choice.
- `updateCountdown()` runs every second; sets `concertArrived` when diff hits 0 (also on load after the date), then `updateStatus()` and timeline icon classes.
- `syncParticles()` builds ~22 `.particle` spans in `#particles`; cleared when reduced motion is on.
- Motion gate: `motionPreference = matchMedia("(prefers-reduced-motion: reduce)")`.
- Trivia: `#stingTriviaData` is embedded non-executable JSON, parsed once by `parseTrivia()`. Records carry stable IDs, one of six category keys, paired PL/EN title/text and supporting HTTPS source URLs. Invalid data uses a bilingual fallback; empty/single datasets do not rotate.
- Trivia badge: `categoryLabels` maps the six category keys to PL/EN labels; `updateTrivia()` sets badge, title and text together and hides the badge (no `undefined`) when a record lacks a known category. Badge is readable text in gold, not color-only, and the filter UI is intentionally absent.
- Trivia indicator: `renderTrivia()` also sets `Ciekawostka #N z M` / `Fact #N of M` from the selected record's one-based position and the live dataset length (no hard-coded total, not a viewed count). It sits in `.trivia-meta` inside the fading content; the row hides when no valid record exists.
- Trivia fade: `updateTrivia(animate)` is immediate by default (language change, startup, motion change). `selectTrivia()` passes `animate = true`: `.trivia-content` (badge, title, text only) fades out 180 ms, `renderTrivia()` then renders the *current* selection and language, and it fades in. Requests during a fade reuse the pending render, a language change or a switch to reduced motion cancels it and renders at once, so content can never be left invisible.
- Trivia selection: `selectTrivia(index, restart)` is the single path for manual and automatic changes; `startTriviaRotation()` owns the one 20-second interval. The Random fact button picks `triviaIndex + 1 + random(length - 1)` (never the current fact, no retry loop), restarts the interval, and is hidden when fewer than two records exist.

## CSS patterns
- Tokens in `:root`: `--gold`, `--gold-soft`, `--emerald`, `--emerald-soft`, `--ink`, `--glass`, `--ease`.
- Hero stacking: `.hero` (isolation: isolate) > `.hero-scrim`, `.particles` (z-index -1), `.hero-content`, `.glass-widget`.
- Global reduced-motion block at the end of `styles.css` neutralises animations/transitions.

## Easter-egg patterns (Phase 2)
- **FX layer:** one `position: fixed; inset: 0; pointer-events: none` container (`.fx-layer`, `aria-hidden`) for sparks and confetti. Created in TASK001, reused by TASK004.
- **Burst helper:** `burst(x, y, options)` uses WAAPI on short-lived spans. Removes nodes on finish/cancel; motion changes cancel all active FX. Sparks cap at 120 nodes; confetti caps the shared layer at 150. `celebrate()` resets the layer and launches three 50-piece bursts with rotation/gravity, completing in under six seconds.
- **Arrival:** the existing `concertArrived` transition enables closing ✦ replay and calls `celebrate()` once, including late loads. Replay stays disabled before arrival. No clock override or test hooks ship.
- **Startup:** language/countdown initialization follows all egg state declarations so late-load celebration and dedication localization cannot access uninitialized helpers.
- **Toast:** one non-interactive `role="status"` element (`.toast`), auto-hides, used for TASK003 song hints. Created in TASK002.
- **Dedication:** separate persistent panel in TASK002 with five stable-ID bilingual memories, shuffled without repeats. Translate the selected ID when language changes. Explicit Read aloud/Stop and a matching-language local voice selector; Close/new memory/language switch/page hide cancel speech. Prefer male voice names as hints, never promise gender; no matching local voice means text-only.
- **Privacy:** no exact relationship dates/times in page content or tracked documents; approved milestone names and Tymon only.
- **Strings:** extend `translations.{pl,en}`; no hard-coded single-language text.
- **Triggers:** pointer and keyboard parity (button + Enter/Space), plus a touch-friendly alternative to the Konami code (triple-tap on STING).

## Dependency order
TASK001 (FX layer + burst) -> TASK002 (toast, beams) -> TASK003 (reuses toast) -> TASK004 (reuses FX layer + burst).
