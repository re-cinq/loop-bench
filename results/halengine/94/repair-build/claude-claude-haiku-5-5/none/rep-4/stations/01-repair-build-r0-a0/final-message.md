The red build is fixed on `loop-bench/94`. The fix is pushed as `579bfcc`, and the branch is not ahead of its upstream.

The verdict named two findings, both in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. I changed only that file:

- **typecheck (line 30):** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. It now passes `{identity: 'You are HAL.'}`, the only required field.
- **eslint (line 40, `re-lint/max-expects`):** the test had three `expect` calls. It now captures the rejection and makes one `toEqual` assertion over `{rejection, caughtError, afterSessionRan}`. The rejection is still checked to be the same error object thrown by `beforeSession`.

The test is not weakened: it still asserts the rejection, the `onError` argument, and that `afterSession` ran.

What I ran:
- `npx prettier --write` on the changed file: unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js` on that one file: 1 passed. Running `jest` without those flags fails on ESM before any test runs, so that was not a valid check.

What I did not run: typecheck and eslint. The verdict's annotations cover both, and the instructions say not to run them in this pod. CI judges the push.

The branch had not moved since the judged sha, so the fix was applied. `origin/main` merged in cleanly with nothing new to push. I could not query the lore trace for prior failures on this path: no `lore_*` tools were available in this session.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a non-existent PromptBuilderConfig shape (typecheck) and had 3 expects (eslint max-expects 1); fixed the test file and pushed"}}