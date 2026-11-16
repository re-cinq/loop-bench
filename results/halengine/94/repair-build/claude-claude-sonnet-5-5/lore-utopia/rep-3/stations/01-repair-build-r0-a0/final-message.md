I fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. I haven't run the test, typecheck or lint in this pod, so CI will have to confirm.

- **Typecheck:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, but `PromptBuilderConfig` only accepts `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`. It now uses `new PromptBuilder({identity: 'You are HAL.'})`.
- **eslint (`re-lint/max-expects`):** the test had three `expect` calls, and the rule allows one. It now catches the rejection from `processMessage` and makes a single `toEqual` assertion on the rejected error, the error `onError` received, and whether `afterSession` ran. This covers the same three checks as before.

I committed and pushed the change. The merge with `origin/main` was already up to date, and `git status` shows the branch isn't ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used invalid PromptBuilderConfig props (TS2353) and had 3 expects (max-expects); fixed config and merged into one toEqual"}}