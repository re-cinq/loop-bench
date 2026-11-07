I fixed both CI failures (typecheck and eslint). Both came from the acceptance test file `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. The orchestrator code was not the problem.

- **typecheck:** The test built its `PromptBuilder` with config fields that don't exist (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). `PromptBuilderConfig` only takes `identity`, so the test now uses `{identity: 'You are HAL.'}`.
- **eslint `re-lint/max-expects`:** The test had three `expect` calls and the rule allows one. It now catches the rejection and checks everything in a single `toEqual`: the caller gets the original error, `onError` receives that same error, and `afterSession` ran. The test still checks the same three things.

**Verification:** that one test file passes under jest (`node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`, 1/1). Following the pod rules, I did not run typecheck or eslint locally, so CI's next run is the real check for those two.

I ran prettier on the file, committed and pushed. The branch was already up to date with `origin/main`, and `git status` shows nothing left unpushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields and had 3 expects (max 1)"}}