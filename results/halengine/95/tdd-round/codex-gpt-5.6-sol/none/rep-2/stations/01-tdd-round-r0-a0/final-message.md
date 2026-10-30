Completed and pushed commit `79923c3`.

- Added focused coverage for string rejection wrapping, `cause`, and unchanged propagation.
- Updated `onError` to normalize non-`Error` rejections.
- Updated the spec trace link and DoD facet.
- Targeted test passed: 1 passed, 26 skipped.
- Red tests: 1 introduced by this round, 0 regressions.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections before calling onError","tdd_next":"confirm existing Error-instance tests remain green without modification"}}