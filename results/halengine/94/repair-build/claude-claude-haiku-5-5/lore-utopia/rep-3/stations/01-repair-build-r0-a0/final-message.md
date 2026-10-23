I fixed both red checks, pushed the fix to `loop-bench/94`, and the branch is in sync with its upstream at `e1ca3c2`. CI has not judged the new head yet.

**What was broken and how I fixed it** (both in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, the only file I touched):

- **typecheck, line 30:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. I changed it to `new PromptBuilder({identity: 'You are HAL.'})`, the same shape the other tests use. The test is new on this branch, so the existing-tests-unedited rule doesn't apply.
- **eslint, line 40 (`re-lint/max-expects`):** the test had three `expect` calls. I replaced them with one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. It asserts the same three things: the rejection is the thrown error, `onError` got that error, and `afterSession` ran.

**What I ran:**
- `npx prettier --write` on the changed file: unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js <that file>`, the repo's own test invocation: 1 suite, 1 test, passed.
- I did not run typecheck or eslint here, per the pod rules. CI will judge both.

**Branch state:** the merge with `origin/main` was already up to date, so no merge commit was needed. `git status` reports the branch is not ahead of upstream.

**Not checked:** the lore MCP server failed to connect, so I could not run the `lore-query-trace` prior-failure lookup or `lore_get_ci_failures`. I worked from the round brief alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilder config shape (typecheck) and had three expect calls (max 1, eslint); fixed both in the test file, jest passes locally"}}