Implemented and pushed commit `6704d31`.

- Wrapped non-`Error` rejections for `onError`, preserving the original as `cause`.
- Preserved the original rejection at the caller boundary.
- Added and passed one focused `undefined` rejection test.
- Re-anchored affected spec links and checked the implementation facet.
- Red tests: 1 new test, 0 regressions.
- Branch is synchronized with `origin/main` and its upstream.

Next facet: confirm existing `Error`-instance behavior remains unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections for onError while preserving the original rejection","tdd_next":"confirm existing Error-instance tests remain green without modification"}}