I have fixed the CI failures in the acceptance test for ticket #94. The previous round's implementation of `beforeSession` within the `try` block was correct, but the accompanying test file had type errors (incorrect `PromptBuilder` configuration) and ESLint violations (multiple `expect` calls in a single test).

I updated `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use the correct `identity` property for `PromptBuilder` and consolidated the assertions into a single `expect` call using `toEqual`. I also updated the traceability link in `specs/hal-engine-config-hooks/spec.md` to point to the correct line number in the test file and added the required spec anchor.

The test now passes locally, and both typecheck and lint issues are resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}