Resolved both CI failures reported on `c4021b3`:
1. Updated `PromptBuilder` configuration in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to pass `{identity: 'You are HAL.'}` matching `PromptBuilderConfig`.
2. Consolidated the three `expect` assertions in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` into a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.
3. Repointed the spec anchor in `specs/hal-engine-config-hooks/spec.md` (`#L40` -> `#L35`).

0 red tests were ours and 0 were regressions (CI failed on `typecheck` and `eslint` on the acceptance test file).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix typecheck and eslint max-expects failures in chatOrchestrator.beforeSession.acceptance.test.ts and repoint spec anchor","tdd_next":"acceptance green"}}