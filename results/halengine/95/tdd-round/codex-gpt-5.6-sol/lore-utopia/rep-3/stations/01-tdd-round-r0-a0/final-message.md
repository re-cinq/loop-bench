Implemented and pushed commit `1cd85b9`.

- Normalizes non-`Error` rejections for `onError`, preserving the original as `cause`.
- Caller still receives the original rejection unchanged.
- Added and passed one focused test.
- Red tests: 1 ours, 0 regressions.
- Acceptance tests were not run.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections before calling onError","tdd_next":"confirm existing Error-instance tests remain green without modification"}}