# TASK007 - Trivia category badges

**Status:** Pending  
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

**Overall Status:** Not Started - 0%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 7.1 | Define bilingual category label mapping | Not Started | 2026-10-22 | Depends on TASK005 |
| 7.2 | Add badge markup, styling, and renderer update | Not Started | 2026-10-22 | Text conveys category |
| 7.3 | Verify all categories and PL/EN; update memory bank | Not Started | 2026-10-22 | 390px and desktop |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Pending category metadata from TASK005.
