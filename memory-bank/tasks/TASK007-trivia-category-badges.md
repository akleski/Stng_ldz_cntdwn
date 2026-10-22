# TASK007 - Trivia category badges

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
"Category badges: Career, The Police, Personal Life, Awards, Movies, Activism."

## Thought Process
- Depends on category metadata defined in [TASK005](TASK005-expanded-trivia-json.md).
- Badges describe the selected fact; category filtering is not requested.
- Use readable text rather than color alone, matching the existing glass-card design.

## Implementation Plan
- Map stable category keys to PL/EN labels: Kariera/Career, The Police, Życie prywatne/Personal Life, Nagrody/Awards, Filmy/Movies, Aktywizm/Activism.
- Add a badge to the existing trivia card and update it alongside the title and fact.
- Translate the badge on language changes without selecting a different fact; handle missing metadata without showing undefined text.
- Verify all six categories, contrast, narrow-screen wrapping, and manual/automatic selections.

## Acceptance Criteria
- Each categorized fact displays the correct localized badge.
- Badge updates atomically with the fact and remains readable on desktop and mobile.
- No filter controls or unrelated navigation are added.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 7.1 | Define bilingual category label mapping | Complete | 2026-10-22 | Depends on TASK005 |
| 7.2 | Add badge markup, styling, and renderer update | Complete | 2026-10-22 | Text conveys category |
| 7.3 | Verify all categories and PL/EN; update memory bank | Complete | 2026-10-22 | 390px and desktop |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Pending category metadata from TASK005.

- Implemented: Added a localized category badge (Kariera/Career, The Police, Życie prywatne/Personal Life, Nagrody/Awards, Filmy/Movies, Aktywizm/Activism) to the trivia card, updated in the same render as title and text; missing metadata hides it.
- Verified: 48 browser checks at 1440px and 390px incl. all 87 records in PL and EN, atomic manual/automatic updates, unknown-category fallback; live screenshots inspected at both widths (longest PL badge wraps cleanly).
- Updated task status, subtasks, index, progress and active context in the separate feature commit; no Copilot trailer and no push.
