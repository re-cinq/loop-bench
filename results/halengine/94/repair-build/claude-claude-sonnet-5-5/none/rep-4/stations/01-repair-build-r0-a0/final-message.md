I fixed both CI failures. Both were in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, and the fix is pushed.

- **typecheck:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist in `PromptBuilderConfig`. I changed it to `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint (`max-expects`):** the test had three `expect` calls. I now capture the rejection with `.then(..., e => e)` and make one `toEqual` assertion on `{outcome, caughtError, afterSessionRan}`. It still checks that `beforeSession`'s throw reaches the caller, that `onError` gets the same error, and that `afterSession` runs.

I ran only that test file with `NODE_OPTIONS=--experimental-vm-modules npx jest`, and it passes. I did not run the linter or `tsc`, as instructed. I ran prettier on the changed file, which left it unchanged. Merging `origin/main` found nothing to merge, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields (typecheck) and had 3 expects (max-expects); now uses {identity} and a single toEqual"}}