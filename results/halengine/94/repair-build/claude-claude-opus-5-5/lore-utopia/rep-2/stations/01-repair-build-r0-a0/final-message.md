I fixed both CI failures. Both were in the new acceptance test, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, and nothing in the orchestrator code needed to change.

- **typecheck:** the test passed `PromptBuilder` options that don't exist (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now passes `{identity: 'You are HAL.'}`, the same as the existing `chatOrchestrator.test.ts`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. It now has one `toEqual` that checks all three things together: the call still rejects with the original message, `onError` gets that same error, and `afterSession` runs. It follows the `outcomeOf` pattern from the existing test file.

The suite passed locally: `npm test`'s jest command run on just that file, 1 test. As instructed, I didn't run typecheck or eslint here, so CI's next run is what confirms those two. The commit is pushed, the branch was already up to date with `origin/main`, and `git status` shows nothing left unpushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields and had 3 expects (max 1)"}}