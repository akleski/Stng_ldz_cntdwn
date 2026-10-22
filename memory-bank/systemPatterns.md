# System Patterns

## Architecture
Static single page. All behaviour lives in one inline `<script>` at the end of `index.html`; all styling in `styles.css`.

## Existing script structure (index.html)
- Constants: `purchaseDate` (2026-10-21 +02:00), `concertDate` (2027-06-10T19:00 +02:00). Explicit Warsaw offset keeps time correct in any visitor timezone.
- i18n: `translations.{pl,en}` for dynamic strings; `data-en` / `data-en-aria-label` / `data-en-content` attributes for static strings; `setLanguage()` swaps text, `localStorage["sting-language"]` remembers choice.
- `updateCountdown()` runs every second; sets `concertArrived` when diff hits 0 (also on load after the date), then `updateStatus()` and timeline icon classes.
- `syncParticles()` builds ~22 `.particle` spans in `#particles`; cleared when reduced motion is on.
- Motion gate: `motionPreference = matchMedia("(prefers-reduced-motion: reduce)")`.

## CSS patterns
- Tokens in `:root`: `--gold`, `--gold-soft`, `--emerald`, `--emerald-soft`, `--ink`, `--glass`, `--ease`.
- Hero stacking: `.hero` (isolation: isolate) > `.hero-scrim`, `.particles` (z-index -1), `.hero-content`, `.glass-widget`.
- Global reduced-motion block at the end of `styles.css` neutralises animations/transitions.

## Easter-egg patterns (Phase 2)
- **FX layer:** one `position: fixed; inset: 0; pointer-events: none` container (`.fx-layer`, `aria-hidden`) for sparks and confetti. Created in TASK001, reused by TASK004.
- **Burst helper:** `burst(x, y, options)` in the inline script, using the Web Animations API on short-lived spans. Removes nodes on finish. No-op under reduced motion. Reused by TASK004.
- **Toast:** one non-interactive `role="status"` element (`.toast`), auto-hides, used for TASK003 song hints. Created in TASK002.
- **Dedication:** separate persistent panel in TASK002 with five stable-ID bilingual memories, shuffled without repeats. Translate the selected ID when language changes. Explicit Read aloud/Stop and a matching-language local voice selector; Close/new memory/language switch/page hide cancel speech. Prefer male voice names as hints, never promise gender; no matching local voice means text-only.
- **Privacy:** no exact relationship dates/times in page content or tracked documents; approved milestone names and Tymon only.
- **Strings:** extend `translations.{pl,en}`; no hard-coded single-language text.
- **Triggers:** pointer and keyboard parity (button + Enter/Space), plus a touch-friendly alternative to the Konami code (triple-tap on STING).

## Dependency order
TASK001 (FX layer + burst) -> TASK002 (toast, beams) -> TASK003 (reuses toast) -> TASK004 (reuses FX layer + burst).
