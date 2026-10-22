# TASK010 - Remember trivia and prevent consecutive repeats

**Status:** Pending  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
"Local browser storage so Adam and Monika don't see same fact twice in a row."

## Thought Process
- Depends on stable record IDs from [TASK005](TASK005-expanded-trivia-json.md) and the manual-selection path from [TASK006](TASK006-random-trivia-button.md).
- Persist only the last displayed fact ID; a full viewing history or shuffled bag is not required to prevent consecutive repeats.
- Local storage applies to one browser profile/origin, not synchronized identities or separate devices. No accounts, backend, or personal data are needed.
- Translating the current fact is not a new selection and must retain its ID.

## Implementation Plan
- Store the last displayed stable ID under a trivia-specific localStorage key, separate from the language preference.
- On initial load, choose a record other than the saved last fact when alternatives exist; persist the newly displayed ID.
- Apply the same exclusion to manual and automatic selection, including after reload and dataset reorder.
- Guard reads/writes and validate saved IDs; use in-memory exclusion if storage is blocked, corrupt, or unavailable.
- Handle removed IDs and empty/single-record datasets without looping or breaking the page.

## Acceptance Criteria
- With at least two records, consecutive selections and reloads in the same browser/origin do not immediately repeat the last displayed fact.
- Switching languages preserves the fact; countdown and language persistence remain unaffected.
- Unavailable storage never prevents trivia display; no cross-device synchronization is promised.

## Progress Tracking

**Overall Status:** Not Started - 0%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 10.1 | Add guarded last-fact persistence using stable IDs | Not Started | 2026-10-22 | Depends on TASK005 |
| 10.2 | Unify initial/manual/automatic repeat exclusion | Not Started | 2026-10-22 | Depends on TASK006 |
| 10.3 | Verify reloads, stale IDs, storage failures; update memory bank | Not Started | 2026-10-22 | Include empty/single datasets |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Local-only persistence; no identity-specific history or synchronization.
