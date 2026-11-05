I fixed both CI findings in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and pushed the branch. I did not run the typecheck or the linter, as instructed. I ran only the acceptance test under jest, and it passes.

- **Typecheck:** the test built `PromptBuilder` with `baseSystemPrompt` and other fields that `PromptBuilderConfig` doesn't have. I changed it to `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. It now catches the rejection and asserts one object with `toEqual`. That object holds the rejection, the error `onError` received, and whether `afterSession` ran, so the test checks the same things as before.

`origin/main` was already merged in, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields (TS2353) and had 3 expects (max-expects); now uses {identity} and a single toEqual"}}