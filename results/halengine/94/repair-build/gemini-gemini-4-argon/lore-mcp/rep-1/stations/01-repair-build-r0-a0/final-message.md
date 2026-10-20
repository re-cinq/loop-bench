Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
- Replaced the invalid `PromptBuilder` config (`baseSystemPrompt` is not in `PromptBuilderConfig`) and local helper duplication with `answering` and `writeSignalPromptBuilder` from `src/infrastructure/writeSignalTestSupport.ts`.
- Consolidated the three `expect(...)` calls into a single `expect({rejected, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.
- Repointed the test line anchor in `specs/hal-engine-config-hooks/spec.md` and marked the DoD item complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed TS2353 PromptBuilderConfig property error and re-lint/max-expects violation in chatOrchestrator.beforeSession.acceptance.test.ts"}}