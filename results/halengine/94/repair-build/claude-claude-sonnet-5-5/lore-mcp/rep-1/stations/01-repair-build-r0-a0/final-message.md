I fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and pushed the commit. I haven't seen CI re-judge the branch yet. I ran the acceptance test, which passes. I didn't run `tsc` or eslint here, as instructed.

- **typecheck (TS2353):** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. It now passes `{identity: 'You are HAL.'}`, the interface's only required field.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls. It now captures the rejection and makes one `toEqual` on `{result, caughtError, afterSessionRan}`. This keeps the same checks: the rejection carries the original error, `onError` receives it, and `afterSession` ran.

The branch is up to date with `origin/main`, and `git status` shows it isn't ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields (typecheck) and had 3 expects (eslint max-expects); now uses identity and a single toEqual"}}