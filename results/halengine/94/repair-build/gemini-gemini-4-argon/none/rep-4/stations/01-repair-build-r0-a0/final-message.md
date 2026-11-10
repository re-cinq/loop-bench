Fixed the two CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the corresponding spec anchor line in `specs/hal-engine-config-hooks/spec.md`:
1. Passed `{identity: 'You are HAL.'}` to `new PromptBuilder(...)` to match `PromptBuilderConfig` (`TS2353`).
2. Combined the three `expect` assertions into a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced invalid baseSystemPrompt with identity in PromptBuilderConfig and consolidated 3 expect calls into 1 in chatOrchestrator.beforeSession.acceptance.test.ts"}}