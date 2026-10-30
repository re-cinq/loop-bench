Implemented and pushed commit `f12f94e`.

- Non-`Error` rejections are wrapped for `onError` with the original value as `cause`.
- The caller still receives the original rejection unchanged.
- Added and passed one focused test.
- Red tests: 1 written this round; 0 regressions.
- Branch is synchronized with `origin/main` and upstream.
- Next facet: confirm existing `Error` instances pass through unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections for onError while preserving the original rejection","tdd_next":"confirm existing Error-instance tests remain green without modification"}}