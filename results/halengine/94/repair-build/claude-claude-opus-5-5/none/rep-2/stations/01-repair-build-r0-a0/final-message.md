CI's two failures were both in the new acceptance test, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. The fix to `chatOrchestrator.ts` itself was already right. Both problems were mistakes in the test, so I fixed the test and kept what it checks:

- **typecheck (line 30):** the test built `PromptBuilder` with fields that don't exist in `PromptBuilderConfig` (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now uses the real config, `{identity: 'You are HAL.'}`, the same way `toolBudget.test.ts` does.
- **eslint `re-lint/max-expects` (line 40):** the test made three `expect` calls. It now catches the rejection and makes one `toEqual` check: the caller still gets the same error back, `onError` received that error, and `afterSession` ran.

That test file passes locally (1 of 1) and prettier left it unchanged. As instructed, I didn't run typecheck or eslint here, so CI will be the first to check those. The fix is committed and pushed. `origin/main` was already merged in, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilderConfig shape and had 3 expects (max-expects); fixed config and merged into one toEqual"}}