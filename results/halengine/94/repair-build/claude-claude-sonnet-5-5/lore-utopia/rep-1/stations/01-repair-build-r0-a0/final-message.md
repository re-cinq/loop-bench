I fixed both CI failures in `chatOrchestrator.beforeSession.acceptance.test.ts` and pushed the fix. I haven't run anything to confirm it: the pod can't typecheck or lint, so CI has to judge the new commit.

- **typecheck:** the test built `PromptBuilder` with options that don't exist (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now passes `{identity: 'You are HAL.'}`, which is what `PromptBuilderConfig` requires.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. I collapsed them into one `toEqual` that checks the rejection, the error `onError` received, and that `afterSession` ran.

The branch was merged with `origin/main` (already up to date) and `git status` shows it is not ahead of its upstream. The test change is not reformatted: prettier reported the file unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilder config (TS2353) and had 3 expects (max-expects); now uses {identity} and a single toEqual"}}