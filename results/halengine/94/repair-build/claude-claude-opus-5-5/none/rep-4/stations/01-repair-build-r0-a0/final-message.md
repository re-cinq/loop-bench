CI's two failures were both in the new acceptance test, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. I fixed both, the test passes locally, and the fix is pushed.

- **typecheck:** the test built `PromptBuilder` with fields its config type doesn't have (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now uses the real fields, `identity` and `responseGuidelines`.
- **eslint:** the test had three `expect` calls and the lint rule allows one. It now catches the rejection itself and checks the rejection, the error `onError` received and the `afterSession` flag in one `toStrictEqual`. The test still checks everything it did before: the caller gets the same error object, `onError` gets it too, and `afterSession` runs.

I ran only this test file (`node --experimental-vm-modules node_modules/jest/bin/jest.js` on it) and it passed. I didn't run typecheck or eslint here, as instructed, so the next CI run is what confirms those two checks. Prettier left the file unchanged. Merging `origin/main` brought in nothing new, and `git status` shows the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test passed unknown PromptBuilderConfig fields (typecheck) and had 3 expects over the max of 1 (eslint)"}}