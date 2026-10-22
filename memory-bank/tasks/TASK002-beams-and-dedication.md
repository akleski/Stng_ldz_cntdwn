# TASK002 - Arena beams + dedication (Konami / triple-click STING)

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
Add easter egg: Konami code or triple-click on "STING" lights up the arena beams and plays a hidden message. Commit separately using `/caveman-commit` style.

## Design Decisions
- TASK001 introduces the FX layer; this task introduces the shared song-toast and a separate, persistent dedication panel. No auto-dismiss while reading or using voice controls.
- User-approved change: local browser TTS with preferred male voice, voice selector, text-only fallback. Speech starts only on an explicit Read aloud button, never on page load or egg activation.
- Privacy: include family milestones and Tymon's name, but omit all exact relationship dates and times from the public site AND tracked memory bank. Do not derive ages or anniversaries from private dates. Future details need the same privacy check.
- Five short bilingual memory records with stable IDs and paired `pl` / `en` text. A shuffled bag plays each once before reshuffling; avoid an immediate repeat across bag boundaries. Re-activating the egg selects a new memory and cancels any previous speech. More records can be appended later without changing playback logic.
- Konami sequence: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a. Ignore repeat events and editable controls (including the voice selector). Do not prevent normal arrow-key scrolling.
- Triple-click/tap on STING: count activations using a bounded time window rather than `event.detail === 3`, which is unreliable on touch. Provide keyboard-accessible activation without changing the heading semantics.
- Beams fan from the arena roof; verify origin separately on desktop/mobile against the background image. Auto-dismiss beams after about 8 seconds; the dedication remains until closed. No flashing or strobing.
- Reduced motion disables beams, not user-requested speech or readable dedication text.

## Draft Dedications (PL / EN)
Short original text, no song lyrics. No exact private dates/times are stored here.

| ID | Polski | English |
|----|--------|---------|
| time-flies | Moniko, czas pędzi. Z kolejnych chwil powstała nasza historia, a przede mną wciąż najpiękniejsza część: być przy Tobie. Dziś czekamy na Stinga, ale najbardziej cieszę się, że przeżyjemy ten wieczór razem. | Monika, time flies. Moment by moment, we have built our story, and the best part is still being by your side. Today we are counting down to Sting, but what I look forward to most is sharing this night with you. |
| climbing | Poznaliśmy się podczas wspinaczki skałkowej. Wtedy nie wiedziałem jeszcze, że spotkałem osobę, z którą będę dzielić nie tylko kolejne drogi, ale całe życie. Moniko, dobrze mieć Cię po swojej stronie liny. | We met while rock climbing. Back then, I did not know I had met the person I would share not just more routes with, but my whole life. Monika, I am glad you are on my side of the rope. |
| proposal | Kiedy poprosiłem Cię o rękę, chciałem powiedzieć coś więcej niż jedno pytanie: chcę dzielić z Tobą codzienność, wielkie chwile i wszystko pomiędzy. Dziś ten koncert jest kolejną małą częścią naszego razem. | When I asked you to marry me, I meant more than one question: I want to share everyday life, the big moments, and everything in between with you. This concert is another little part of our life together. |
| wedding | W dniu naszego ślubu powiedzieliśmy sobie tak. Od tamtej chwili nasze razem to nie tylko wyjątkowe dni, ale też zwykłe poranki i małe gesty. Moniko, ten wieczór ze Stingiem będzie kolejnym wspomnieniem, które zabierzemy ze sobą. | On our wedding day, we said yes to each other. Since then, together has meant not only special days, but ordinary mornings and small gestures too. Monika, this night with Sting will be another memory we take with us. |
| tymon | A potem pojawił się nasz mały Tymon i nasza historia dostała zupełnie nowy rozdział. Czas pędzi jeszcze szybciej, odkąd jesteśmy rodzicami. Tym bardziej cieszę się na ten wieczór tylko we dwoje: Ty, ja i muzyka. | Then our little son Tymon arrived, and our story began a whole new chapter. Time seems to fly even faster since we became parents. That makes me look forward even more to this night for just the two of us: you, me, and the music. |

## Implementation Plan
- Add beams (`aria-hidden`), a simple status toast reusable by TASK003, and a separate dedication panel with heading, memory text, local voice selector, Read aloud, Stop, and Close buttons. Localize labels and keep controls keyboard accessible. Do not put interactive controls inside the live-region text node.
- Add responsive glass styling. Dedication panel must fit small viewports and scroll when needed; it must not block the language switch. Closing restores focus to the trigger.
- Store memories by stable ID; maintain a shuffled bag in memory only. Language changes retain the selected memory ID, translate the visible text, cancel active speech, and refresh voice choices. Do not randomly select again merely because language changed.
- Implement `speechSynthesis` feature detection, `getVoices()` plus `voiceschanged`, exact locale then same-language matching (`pl-PL` / `en-GB` preferred), filtering exclusively to `localService === true`. Never use remote voices or send text to a service.
- Prefer known male-voice names only as a best-effort hint; gender is not standardized in SpeechSynthesisVoice. Let the user select another local voice of the current language. If no matching local voice exists, or speech fails, retain readable text and explain the unavailable narration; never silently use the wrong language or a remote voice.
- Speech: `SpeechSynthesisUtterance` using the selected local voice and current language. Explicit Read aloud starts narration; Stop/Close/new memory/language switch/page hide cancels it. Repeated presses replace rather than queue utterances. Handle `onend` / `onerror` and unsupported TTS gracefully.
- Wire Konami and triple-click/tap triggers; reveal a random memory without speaking automatically. Beams can expire independently from the panel.
- Verify mocked TTS paths in browser checks and actual male-voice availability/audio manually on supported desktop/mobile devices. Headless Edge alone cannot verify audible output or gender.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 2.1 | Beams overlay HTML + CSS (match image beam geometry) | Complete | 2026-10-22 | Roof origin checked at 1440px/390px |
| 2.2 | Status toast + persistent dedication panel with localized controls | Complete | 2026-10-22 | Responsive panel leaves language switch usable |
| 2.3 | Five paired memories, shuffle bag, privacy-safe text | Complete | 2026-10-22 | Two bags and boundary non-repeat verified |
| 2.4 | Local-only TTS, male-voice preference, selector, Read/Stop | Complete | 2026-10-22 | Exact locale first; name hint only |
| 2.5 | Konami + touch-safe triple-activation + keyboard access | Complete | 2026-10-22 | Real CDP touch and keyboard input passed |
| 2.6 | Cancellation, voice loading/error paths, reduced-motion fallback | Complete | 2026-10-22 | Lifecycle, voice removal and error mocks passed |
| 2.7 | Verify CDP interactions, shuffle, PL/EN, mobile, local-only voice mocks | Complete | 2026-10-22 | Real audio/voices still require manual device check |
| 2.8 | Update memory bank and commit | Complete | 2026-10-22 | `feat: add spoken dedication and arena beams` |

## Progress Log
### 2026-10-22
- Task created and planned. No code written.
- Plan expanded with five bilingual relationship memories and optional narration following the current language switch.
- User selected local browser TTS, preferred male voice with selector, text-only fallback, and explicit Read aloud after reveal.
- User selected public milestones without exact dates/times. Private dates/times intentionally excluded from these tracked documents.
- Implemented all eight subtasks: arena beams, shared toast, accessible persistent panel, approved bilingual memories, shuffle bag and optional local-only narration.
- Matched the beam origin to the arena roof at 37.5% of the rendered background height (desktop 980px/100svh, tablet 760px, mobile 560px). Existing title and arena remain readable; the bottom panel overlays the countdown intentionally, scrolls if necessary and leaves the language switch accessible.
- Edge CDP verification passed desktop/mobile and both motion modes: real triple-touch/Enter, Konami, bounded tap window, two non-repeating bags, stable ID on translation, local voice filtering/preference/selection, replace-not-queue speech, close/new memory/language/pagehide cancellation, voice removal, error and missing API fallbacks. Seven browser configurations passed without exceptions.
- Inspected active-beam and panel screenshots at both widths. No autoplay, new network requests, private dates or song lyrics introduced. Actual audible output and device voice availability remain manual checks.
- Updated the task table, index, progress and active context for its separate commit.
