Implemented and pushed commit `2b5fd0b`.

- Added `onError` wrapping for non-`Error` rejections with preserved `cause`.
- Added focused `undefined` rejection test.
- Updated spec, changelog, and DoD checklist.
- Focused test passed; no acceptance tests, lint, typecheck, or build run.
- 1 red test was mine; 0 regressions observed.
- Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"normalize non-Error rejections for onError","tdd_next":"confirm existing Error-instance tests remain green"}}