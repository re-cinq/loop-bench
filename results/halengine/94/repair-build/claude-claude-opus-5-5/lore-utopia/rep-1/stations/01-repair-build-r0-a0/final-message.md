I fixed both CI failures in the beforeSession acceptance test and pushed the commit. The branch hadn't moved since CI judged c3cd08a.

- **typecheck (TS2353):** The test passed `PromptBuilder` options it doesn't accept (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). The only required option is `identity`, so the test now uses `new PromptBuilder({identity: 'You are HAL.'})`, as the other orchestrator tests do.
- **eslint (re-lint/max-expects):** The test had three `expect` calls and the rule allows one. It now captures the rejection and checks the rejection, the error `onError` received, and whether `afterSession` ran in a single `toEqual`. That covers the same three things as before.

Locally, I ran prettier on the file and then `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, which passed (1/1). As instructed, I didn't run typecheck or eslint here, so CI will be the first to confirm those two. Merging `origin/main` brought in nothing new, and `git status` shows the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test passed invalid PromptBuilderConfig keys (TS2353) and used 3 expects (re-lint/max-expects)"}}