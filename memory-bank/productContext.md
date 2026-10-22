# Product Context

## Why it exists
A gift-like, shared countdown for two people (Adam and Monika) who live in Łódź and are going to see Sting at their home arena. It should feel personal and premium, not like a generic timer.

## Experience goals
- Dark concert aesthetic over a panoramic Łódź + Atlas Arena hero.
- Glass countdown card, progress bar, three-step timeline (tickets, Łódź, concert night).
- Calm ambient motion (particles, heartbeat, shimmer) that never competes with legibility.

## Easter-egg intent (Phase 2)
Hidden delights that reward curiosity, never required to use the page:
1. Click the ❤️ for a spark burst in both accent colours.
2. Konami code or triple-click/tap "STING" lights the arena beams and reveals one of five bilingual memories: time flying, meeting through rock climbing, proposal, wedding, and son Tymon. Optional Read aloud uses local TTS in the current page language.
3. A wink to Sting's songs: styled console message and a footer dot that cycles song titles.
4. Concert-day confetti celebration when the countdown reaches zero.

## Principles for eggs
- Invisible by default: no hints in the UI.
- Bilingual (PL/EN) for any text they show.
- Silent by default and motion-safe: respect `prefers-reduced-motion`, no autoplay. Optional dedication narration requires an explicit Read aloud action and a matching local voice; prefer male voices, offer a selector, fall back to text.
- User-approved privacy: mention family milestones and Tymon but omit all exact relationship dates and times from public content and tracked documentation.
- Song titles only. Never quote lyrics (copyright).
- Must not affect layout, countdown accuracy, or accessibility of the normal page.
