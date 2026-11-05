I fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and pushed the branch. I haven't re-run tsc, eslint or the tests here (per the pod rules), so CI has to confirm.

- **typecheck:** the test passed `baseSystemPrompt` and other fields that `PromptBuilderConfig` doesn't have. It now builds the prompt with `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint (`max-expects`):** the test made three `expect` calls. I replaced them with one `toEqual` over `{rejection, caughtError, afterSessionRan}`. The call still checks that the throw reaches the caller as a rejection, that `onError` got the same error, and that `afterSession` ran.

The branch had not moved past the judged sha. Prettier reported the file unchanged. Merging `origin/main` was a no-op, and `git status` shows the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilderConfig field (baseSystemPrompt) and had 3 expects; now uses identity and a single toEqual"}}