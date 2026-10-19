Branch is pushed and up to date. The work this round:

- **Extracted** `scriptedProvider`, `registryReturning`, and `TOOL_CALL` into a new shared `orchestratorTestFixtures.ts` — eliminates the `re-lint/no-duplicate-code` error flagging cross-file duplication between `chatOrchestrator.test.ts` and `usageReporting.acceptance.test.ts`
- **Factored out** `runTurnAndCaptureUsage` helper in the acceptance test — eliminates the within-file duplication across the three test cases
- **Added spec links** in `specs/hal-engine-config-hooks/spec.md` for the four tests missing them (`orchestratorHelpers.test.ts` L40/L45, acceptance test L38/L59/L79)
- **Ran the reanchor script** to correct all `#Lnn` spec link line numbers across the repository after the refactoring shifted lines in `chatOrchestrator.test.ts`

No new tests were written — this was a repair round fixing CI failures (eslint + spec-names) from the previous push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: eliminate duplicate test code and add missing spec links","tdd_next":"Update UsageMetadata type or argument typing in OrchestratorHooks to make it unambiguous that it's a sum"}}