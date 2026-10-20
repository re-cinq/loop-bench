Fixed the two CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. Passed `{identity: 'You are HAL.'}` to `new PromptBuilder(...)` to match `PromptBuilderConfig` (resolving `TS2353` on `baseSystemPrompt`).
2. Consolidated the three `expect(...)` calls into a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`, and repointed the corresponding spec anchor link in `specs/hal-engine-config-hooks/spec.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed PromptBuilderConfig property and combined expects in chatOrchestrator.beforeSession.acceptance.test.ts"}}