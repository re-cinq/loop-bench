CI's two findings on `loop-bench/94` are fixed and pushed. I did not get a green CI result, since that runs on the next push.

**What was broken**
- **typecheck:** the acceptance test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, which are not in `PromptBuilderConfig`. It now uses `new PromptBuilder({identity: 'You are HAL.'})`, the same form as `chatOrchestrator.test.ts`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. It now captures the rejection with `.catch`, then makes one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The assertions are the same as before.

**Checks I ran**
- Branch had not moved past the judged sha `c3cd08a9`, so I did not stop early.
- The fix is in the test file only. `beforeSession` already sits inside the `try` in `chatOrchestrator.ts`, and the spec and CHANGELOG were already updated by the previous round. I left them alone.
- `npx prettier --write` on the changed test file: unchanged.
- `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: 1 suite, 1 test, passed. Running `npx jest` directly failed on ESM loading, so I used the repo's script.
- I did not run typecheck or eslint here, per the brief. CI judges those.

**Delivery**
- Committed as `7c9e686` with the Co-Authored-By line, and pushed to `origin/loop-bench/94`.
- `origin/main` merged in with no conflicts and nothing new to commit. `git status` reports the branch in sync with its upstream.

**Not done**
- The `lore-query-trace` lookup for prior failures on this test file did not run. The lore tools are not in my tool list, and the ToolSearch I tried returned an unrelated RemoteTrigger schema.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilderConfig keys and had three expect calls; fixed to identity-only config and a single expect"}}