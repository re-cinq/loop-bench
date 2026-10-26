I fixed both findings CI named for `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, committed, and pushed. The branch is level with its upstream, and the merge with `origin/main` produced nothing new.

- **Typecheck, line 30:** `PromptBuilderConfig` has `identity`, not `baseSystemPrompt`. The test was passing `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on the type. I replaced the constructor call with `new PromptBuilder({identity: 'You are HAL.'})`. The test never asserts on the system prompt, so nothing it checks changes.
- **ESLint, line 40:** the test had three `expect` calls against a limit of one. I replaced them with one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The rejection is captured with `.then(() => undefined, error => error)`, so a resolved `processMessage` still fails the assertion.

Checks I ran here:
- `npx prettier --write` on the one changed file: unchanged.
- `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: 1 suite, 1 test, passed.

I did not run ESLint or the typecheck here, per the pod limits. Those two checks are what CI re-judges on the new head.

The `lore-query-trace` lookup for past failures on this file returned 403 (the token lacks `read` scope), so I could not check the graph for earlier fixes. The diagnosis came from the verdict and the file itself.

Commit `43b0381` is `test(orchestrator): match PromptBuilder config and assert once`, with the Co-Authored-By line from the reminder.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilder config fields and three expects in one test; now uses identity and one object assertion"}}