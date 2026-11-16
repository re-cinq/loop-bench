I fixed both red checks in the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, and the fix is pushed. I haven't seen CI re-judge the new head.

- **typecheck:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`. None of those exist in `PromptBuilderConfig`, which requires `identity`. It now uses `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. It now catches the rejection and makes one `toEqual` assertion on the rejected error, `caughtError` and `afterSessionRan`.

I ran the test with `NODE_OPTIONS=--experimental-vm-modules npx jest` on that file, and it passes. I ran prettier on it. I didn't run the linter or `tsc` here, as instructed.

I committed and pushed. Merging `origin/main` changed nothing because the branch was already up to date. `git status` shows the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields (typecheck) and had 3 expects (max-expects lint); now uses {identity} and a single toEqual"}}