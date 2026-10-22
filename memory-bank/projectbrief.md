# Project Brief

**Project:** Sting in Łódź countdown (repo `akleski/Stng_ldz_cntdwn`)
**Live:** https://akleski.github.io/Stng_ldz_cntdwn/ (GitHub Pages)

## Goal
Personal single-page microsite for Adam and Monika counting down to Sting's concert at Atlas Arena, Łódź, on **10 June 2027, 19:00 CEST**. Polish by default, English via toggle.

## Hard constraints
- Plain HTML / CSS / JavaScript only. No build step, no frameworks, no npm runtime deps.
- Files: `index.html` (markup + inline script), `styles.css`, `assets/lodz-sting-bg.jfif` (hero background).
- Adam = golden yellow `#F59E0B`. Monika = emerald `#10B981`.
- Must stay responsive (verified at 390px) and respect `prefers-reduced-motion`.
- All user-visible text is bilingual (PL default, EN via `data-en` attributes / `translations` object).

## Current scope (Phase 2: easter eggs)
Add four hidden surprises (TASK001-TASK004). See `tasks/_index.md`. TASK002 includes five bilingual relationship memories and optional user-triggered local TTS (preferred male voice with selector, text-only fallback). Do not publish or record exact relationship dates/times in tracked documents.

## Working rules for this phase
- One commit per task, never combined.
- Commit messages follow the `/caveman-commit` skill (Conventional Commits, terse, why over what), with the Copilot co-author trailer used by the task index.
- Never push unless asked.
- Update this memory bank (task file, `_index.md`, `progress.md`, `activeContext.md`) in the same commit as the feature it describes.
