Implemented and pushed commit `3188ae4`.

- Wrapped non-`Error` rejections for `onError`, preserving the original as `cause`.
- Caller still receives the original rejection unchanged.
- Added one focused test; observed red, then green.
- Updated spec traceability and checked the completed DoD facet.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with upstream.

Next facet: confirm existing `Error` instances pass through unchanged without modifying their tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections for onError while preserving the original rejection","tdd_next":"confirm existing Error-instance tests remain green without modification"}}