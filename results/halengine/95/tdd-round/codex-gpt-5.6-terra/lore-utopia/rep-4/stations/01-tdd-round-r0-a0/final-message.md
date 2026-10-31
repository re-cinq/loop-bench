Implemented and pushed `2174386`.

- Added a focused string-rejection regression test; it passes (27 tests).
- `onError` now receives a wrapped `Error` with the original rejection as `cause`, while callers receive the unchanged rejection.
- Updated spec traceability and closed the normalization facet.
- Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a caught non-Error rejection to an Error so hooks.onError always fires","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}