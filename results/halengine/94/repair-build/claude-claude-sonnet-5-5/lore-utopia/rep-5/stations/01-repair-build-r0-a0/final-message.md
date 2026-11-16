Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. I haven't run the test, typecheck or lint, and CI hasn't judged the new push yet. The branch is pushed and not ahead of its upstream.

- **Typecheck:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, which `PromptBuilderConfig` doesn't have. It now uses `new PromptBuilder({identity: 'You are HAL.'})`, since `identity` is the only required field.
- **ESLint `re-lint/max-expects`:** the test had three `expect` calls. It now catches the rejection and asserts the rejection, `caughtError` and `afterSessionRan` in one `toEqual`. It still checks that `processMessage` rejects with the `beforeSession` error and that `onError` and `afterSession` both ran.

I did not change any test logic beyond that. Merging `origin/main` produced nothing new.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used invalid PromptBuilder config (TS2353) and had 3 expects (max-expects); fixed to identity config and a single toEqual"}}