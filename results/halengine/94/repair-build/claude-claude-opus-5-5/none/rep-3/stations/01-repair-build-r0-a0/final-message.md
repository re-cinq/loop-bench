Both failures came from the new acceptance test, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, not from the orchestrator fix. I've fixed and pushed both. The branch hadn't moved since CI judged `c3cd08a`.

- **typecheck (line 30):** the test built a `PromptBuilder` with fields that don't exist on `PromptBuilderConfig` (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now passes the only required field: `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint `re-lint/max-expects` (line 40):** the test had three `expect` calls and the rule allows one. I merged them into one `toEqual` on `{rejection, caughtError, afterSessionRan}`. It checks the same three things as before: the caller gets the `beforeSession` error message as a rejection, `onError` receives that same error, and `afterSession` runs. I caught the rejection with `.then/.catch`, the same way `chatOrchestrator.test.ts` does.

**What I ran:** `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts`, and both suites passed (25 tests). I also ran Prettier on the changed file. As instructed, I didn't run typecheck or eslint here, so CI's run on this push is what confirms those two checks.

The commit is pushed. Merging `origin/main` brought in nothing new, and `git status` shows the branch level with `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields (TS2353) and had 3 expects violating re-lint/max-expects"}}