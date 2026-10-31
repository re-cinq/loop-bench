Implemented and pushed `ca62d23`.

- `onError` now receives an `Error` for non-Error rejections, preserving the original as `cause`; caller rejection remains unchanged.
- Added one focused unit test; it passed after the implementation.
- Updated traceability links and marked the facet complete.
- Red tests: 1 mine, 0 regressions. Acceptance tests were not run locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}