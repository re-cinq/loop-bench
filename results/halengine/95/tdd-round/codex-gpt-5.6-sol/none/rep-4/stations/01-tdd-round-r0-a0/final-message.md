Implemented and pushed one TDD round:

- Added one regression test proving non-`Error` rejections are wrapped for `onError`, preserve `cause`, and remain unchanged at the caller boundary.
- Updated the orchestrator and spec traceability links.
- Focused test: red, then green.
- Red tests: 1 ours, 0 regressions.
- Commit: `150c17d`
- Branch is synchronized with its upstream and `origin/main`.

Next facet: confirm existing `Error` instances still pass through unchanged without modifying existing tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections for onError while preserving the original cause and caller rejection","tdd_next":"confirm existing Error-instance tests remain green without modification"}}