I fixed both CI failures. Both were in the new acceptance test, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, not in the orchestrator code:

- **typecheck:** the test built `PromptBuilder` with options that don't exist (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now passes `{identity: 'You are HAL.'}`, the same way `chatOrchestrator.test.ts` does.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls where the rule allows one. It now catches the rejection and checks the rejection, the error `onError` received and whether `afterSession` ran in a single `toEqual`. The assertions are just as strict as before.

I ran this one test file with jest (`--experimental-vm-modules`) and it passes. As instructed, I didn't run typecheck or eslint here; CI will check those on the push. The commit is pushed, `origin/main` was already merged in (nothing to merge), and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields and had 3 expects (max 1)"}}