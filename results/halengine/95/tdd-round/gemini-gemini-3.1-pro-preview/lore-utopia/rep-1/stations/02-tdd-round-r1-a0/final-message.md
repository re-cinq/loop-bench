I fixed the remaining lint and changelog failures reported by CI on the previous push. I updated `chatOrchestrator.test.ts` to replace `as any` with `unknown as Error` and group the expectations, and replaced `new Date().toISOString()` with a constant in `onErrorNonError.acceptance.test.ts` to satisfy the determinism rule. Finally, I added a changelog entry documenting the behaviour change.

The round ran no tests here. There were no red tests, only a lint failure and a changelog failure, so 0 were mine and 0 were regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}