CI failed on two checks, both caused by the new acceptance test file. I fixed both and pushed. The branch is up to date with `origin/main` and has nothing left unpushed.

- **typecheck:** the test built `PromptBuilder` with option names it doesn't accept (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now passes the required `identity` field.
- **eslint `re-lint/max-expects`:** the test had three `expect` calls and the rule allows one. It now collects the rejected error, the error `onError` received and the `afterSession` flag, and checks all three in one `toEqual`. The assertions are no weaker: the rejection must be the exact error `beforeSession` threw, which is stricter than the old message match.

I ran only this test file, using the repo's `test` script (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`), and it passes. Per the pod rules I did not run typecheck or eslint here, so CI will confirm those two.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields and had 3 expects (max 1)"}}