# TASK005 - Expand trivia to 50-100 JSON records

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
"50-100 trivia items in JSON."

## Thought Process
- The existing page contains ten inline bilingual records, rotating every 20 seconds. Extend this feature, rather than adding another trivia section.
- Preserve the static, no-build page and direct local-file use. Prefer embedded JSON in a non-executable script element; a fetched JSON file would require checking local-file restrictions.
- Use stable IDs, category keys, paired PL/EN titles and facts, and source URLs for factual verification. Write original summaries, not copied passages or song lyrics.

## Implementation Plan
- Define and document a JSON schema with `id`, `category`, `pl`, `en`, and `sources` fields.
- Review existing facts and expand to 87 unique, verified records across Career, The Police, Personal Life, Awards, Movies, and Activism.
- Parse the embedded dataset once and preserve the existing rotation and language-switch behavior; retain a readable fallback if parsing fails.
- Verify count, unique IDs, allowed categories, bilingual completeness, source support, and direct-file/hosted loading.

## Acceptance Criteria
- 50-100 valid JSON records, each with unique ID, supported category, verified sources, and complete PL/EN copy.
- Countdown, playlist, language selection, and 20-second rotation remain functional without new runtime dependencies.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 5.1 | Define schema and verify/expand bilingual content | Complete | 2026-10-22 | 50-100 records |
| 5.2 | Integrate embedded JSON with existing renderer | Complete | 2026-10-22 | Preserve file-based use |
| 5.3 | Validate dataset and browser behavior; update memory bank | Complete | 2026-10-22 | PL/EN, desktop/mobile |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Planning only; no application changes.

- Implemented: Embedded 87 sourced bilingual trivia records (career 18, police 16, personal 12, awards 15, movies 14, activism 12) as non-executable JSON with stable IDs, parsed once and validated, with a bilingual fallback and no pointless rotation for empty/single datasets.
- Verified: Every record fact-checked against fetched sources by independent reviewers and corrected; 27 browser checks passed at 1440px and 390px with reduced motion, plus broken/empty/single dataset variants.
- Updated task status, subtasks, index, progress and active context in the separate feature commit; no Copilot trailer and no push.
