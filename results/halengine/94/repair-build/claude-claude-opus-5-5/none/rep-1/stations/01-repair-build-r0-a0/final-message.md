Both CI failures came from the acceptance test this ticket added, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. The fix is pushed, and that test passes locally. Following the pod rules, I did not run typecheck or eslint here, so CI will confirm those two on the next build.

- **typecheck:** the test built `PromptBuilder` with options that don't exist on `PromptBuilderConfig` (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). I changed it to the real required option, `{identity: 'You are HAL.'}`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. I replaced them with one `toEqual` on a single object. It still checks the same three things:
  - the caller gets the exact error `beforeSession` threw;
  - `onError` receives that same error;
  - `afterSession` runs.

I ran `node --experimental-vm-modules node_modules/jest/bin/jest.js` on that one test file and it passed (1 test). Prettier left the file unchanged. The commit is pushed, merging `origin/main` brought in nothing new, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields and had 3 expect calls; fixed config and merged into one assertion"}}