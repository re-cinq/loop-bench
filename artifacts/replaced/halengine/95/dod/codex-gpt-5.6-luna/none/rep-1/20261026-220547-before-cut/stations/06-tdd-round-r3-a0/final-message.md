Branch is current. Two changes were made:

1. **`src/orchestration/onErrorRejection.acceptance.test.ts`**: Moved `createSession` and `rejectingProvider` below `captureCallerRejection` to satisfy `re-lint/callee-below-caller`.

2. **`scripts/check-spec-anchor-names.mjs`**: Extended the `DECLARATION` regex with `(?:\.[a-z]+\([^)]*\))?` so it matches `it.each(table)('name', fn)` forms, allowing the spec-names check to find the four parameterized test declarations.

0 tests were regressions; 0 were mine (this was a pure CI-repair round with no new test written).

Unrelated smells noticed but not touched: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: re-lint/callee-below-caller and spec-names DECLARATION regex","tdd_next":"acceptance green"}}