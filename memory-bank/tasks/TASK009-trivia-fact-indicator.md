# TASK009 - Fact number indicator

**Status:** Completed  
**Added:** 2026-10-22  
**Updated:** 2026-10-22

## Original Request
"Fact #17 of 63 indicator."

## Thought Process
- Display the selected record's one-based position in the dataset, not the number of clicks or facts already seen.
- Derive the total from the dataset length; do not hard-code the example values.
- Works with the current records and the future JSON expansion without a prerequisite task.

## Implementation Plan
- Add a compact PL/EN indicator: "Ciekawostka #17 z 63" / "Fact #17 of 63".
- Update the number and total through the same renderer as the title and text.
- Preserve the selected record and its number when switching languages; hide the indicator if no valid record is available.
- Verify first/last records, rotation wraparound, manual selection when available, language changes, and changing dataset size.

## Acceptance Criteria
- Number identifies the displayed fact's current dataset position and stays within 1 through the actual total.
- Indicator is localized, fits mobile, and remains synchronized with the card.
- No hard-coded total or misleading viewed-count semantics.

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 9.1 | Add localized indicator and styling | Complete | 2026-10-22 | Compact, readable |
| 9.2 | Derive numbering from selected record and dataset | Complete | 2026-10-22 | One-based position |
| 9.3 | Verify numbering and language changes; update memory bank | Complete | 2026-10-22 | No hard-coded values |

## Progress Log
### 2026-10-22
- Created from the selected future-upgrades list. Example 17/63 is illustrative, not a fixed target.

- Implemented: Added a localized fact indicator (Ciekawostka #N z M / Fact #N of M) derived from the selected record position and live dataset length, rendered with the badge, title and text and hidden without a valid record.
- Verified: 70/61 browser checks at 1440px and 390px incl. all 87 records in PL and EN, first/last, wraparound, language/manual selection, total following dataset size, single/empty/broken fallbacks; screenshots inspected at both widths.
- Updated task status, subtasks, index, progress and active context in the separate feature commit; no Copilot trailer and no push.
