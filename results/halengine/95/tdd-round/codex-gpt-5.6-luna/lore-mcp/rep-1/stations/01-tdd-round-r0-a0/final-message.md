Implemented and pushed commit `95fc51e`.

- Non-`Error` rejections now trigger `onError` with an `Error` carrying the original `cause`.
- Original rejection values remain unchanged for callers.
- Updated spec, changelog, and DoD.
- Added and ran one focused test: passed.
- Acceptance/full suite, lint, typecheck, and build were not run.
- Branch is up to date with upstream.
- Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"normalize non-Error onError rejections and document the behavior","tdd_next":"confirm existing Error-instance tests remain green"}}