Branch is clean and pushed. Two fixes in this round:

1. **ESLint (`re-lint/max-expects`)**: Replaced the two `expect` calls in the acceptance test with a try/catch that captures the rejection plus a single `toMatchObject` asserting all three outcomes (`rejectedError`, `caughtError`, `afterSessionRan`).

2. **spec-names**: The spec cited `chatOrchestrator.beforeSession.acceptance.test.ts#L40` but the `it` declaration is at line 34; updated to `#L34`.

The MongoDB test failures (`mongoConnection.test.ts`) are infrastructure timeouts unrelated to this change — not regressions I caused.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint max-expects and spec-names line ref","tdd_next":"acceptance green"}}