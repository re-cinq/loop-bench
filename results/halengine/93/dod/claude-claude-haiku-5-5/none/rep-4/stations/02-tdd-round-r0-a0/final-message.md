Branch is clean and up to date. 

**Summary of this round:**

- **RED**: Added `sums the usage from every provider call in the turn` test to `chatOrchestrator.test.ts` — failed with received `{inputTokens: 20, outputTokens: 5, totalTokens: 25}` vs expected `{inputTokens: 30, outputTokens: 9, totalTokens: 39}`.
- **GREEN**: Added `addUsage` helper, replaced `lastUsage = outcome.usage ?? lastUsage` with `totalUsage = addUsage(totalUsage, outcome.usage)`. All 25 unit tests pass.
- **REFACTOR**: Added JSDoc to `afterModelResponse` in `OrchestratorHooks`, updated `specs/hal-engine-config-hooks/spec.md` to replace the under-counting description with the new sum behavior (with test link), added CHANGELOG entry, ticked all 4 facets in `.lore/dod.md`.

No regressions. 0 tests were regressions; 1 new test was written.

Unrelated smells noticed (not acted on): the `saveSession` `catch` swallows non-`Error` rejections without checking `instanceof Error`, consistent with the `onError` pattern noted as out-of-scope in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum usage across all provider calls in processMessageStream; update spec, changelog, and JSDoc","tdd_next":"acceptance green"}}