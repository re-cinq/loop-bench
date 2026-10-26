The red build on #94 came from the new acceptance test, not the engine change. I fixed that file, ran it, and pushed. `loop-bench/94` is now at `0ed97a6`, in sync with origin, and the merge from `origin/main` was already up to date.

What was broken and what I changed, all in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:

- **typecheck (TS2353):** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. I changed it to `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. I collapsed them into one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The rejection is captured with `.then(() => undefined, (error) => error)`, so the test still checks that `processMessage` rejects with the original error.

Verification:
- `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: 1 suite, 1 test, passed.
- `npx prettier --write` on the test file: unchanged.
- Not run: eslint (the pod can't run it) and typecheck (it OOMs here). CI will judge both on the push.

I could not query the `lore-query-trace` history for this path because the gateway returned 403 (the token lacks `read` scope). So I did not check for earlier failures on this file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilderConfig keys (typecheck) and had 3 expects (eslint max-expects); fixed test only, pushed 0ed97a6"}}