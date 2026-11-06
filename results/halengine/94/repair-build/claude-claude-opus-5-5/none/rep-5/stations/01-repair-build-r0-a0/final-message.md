I fixed both CI failures. Both were in the new test file `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, and the fix is pushed.

- **typecheck:** The test built its `PromptBuilder` with properties the config type doesn't have (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now uses `{identity: 'You are a test assistant.'}`, the same shape the other tests use.
- **eslint (`re-lint/max-expects`):** The test had three `expect` calls and the rule allows one. It now captures the rejection first, then checks the rejection, the error `onError` received, and whether `afterSession` ran in a single `toEqual`. The test checks the same three things as before.

The test passes locally (`npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, 1 of 1). As instructed, I didn't run typecheck or eslint here, so CI will confirm those on this push. Merging `origin/main` brought in nothing new, and the branch is level with its remote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test passed invalid PromptBuilderConfig props and had 3 expects; now uses identity and one toEqual"}}