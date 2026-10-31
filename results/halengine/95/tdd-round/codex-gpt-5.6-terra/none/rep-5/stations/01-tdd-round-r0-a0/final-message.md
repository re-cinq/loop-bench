Implemented and pushed `4f4b656`.

- `onError` now receives an `Error` for `undefined` rejections, preserving it as `cause`; caller still receives the original rejection.
- Added and passed the focused regression test.
- Updated hook spec and marked the coercion facet complete.
- No acceptance tests, build, lint, or typecheck were run. Red tests: 1 mine, 0 regressions.
- Next facet: confirm existing `Error`-instance behavior remains unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError","tdd_next":"confirm existing Error-instance tests remain green"}}