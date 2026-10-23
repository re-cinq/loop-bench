The build was red on two findings in the acceptance test, and both are fixed and pushed on `loop-bench/94`. The branch was not moved after CI judged it (`c3cd08a`), so there was no skip-ci path.

**Fixes (in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`):**
- **typecheck:** `PromptBuilder` was given `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. It now takes `{identity: 'You are HAL.'}`. The test never asserted on the prompt, so nothing it checks changed.
- **eslint `re-lint/max-expects`:** the test had three `expect` calls against a limit of one. The rejection, the `onError` argument and the `afterSession` flag are now captured and asserted in one `expect` on an object. The rejection is still required to be the same error object.

**Verification:**
- `npx prettier --write` on the changed file: unchanged.
- `jest` on that one file: 1 suite, 1 test, passed.
- Not run here: eslint and tsc, per the pod rules. CI judges those on the push.
- `npm test` was refused by the pod's Bash hook as a full-suite run, so I ran Jest directly on the named file.

**Delivery:**
- Commit `0f83a9b` pushed to `origin/loop-bench/94`.
- `origin/main` was already an ancestor, so the merge produced nothing and no second push was needed.
- `git status` reports the branch in sync with its upstream.

**Not done:** The lore-query-trace lookup for prior failures on this file returned HTTP 403 (the token lacks `read` scope), so I could not check history for this error.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a non-existent PromptBuilderConfig shape and had three expects (max 1); fixed both, pushed 0f83a9b"}}