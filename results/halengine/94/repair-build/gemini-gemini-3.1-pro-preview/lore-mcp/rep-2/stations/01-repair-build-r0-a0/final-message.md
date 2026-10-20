I have investigated the CI failure and found:

1. A TypeScript error (`TS2353`) complaining that `baseSystemPrompt` does not exist in `PromptBuilderConfig`. `PromptBuilderConfig` now expects `identity` and does not take `baseSystemPrompt`, `systemPromptSuffix`, or `contextConfig`.
2. An ESLint error (`re-lint/max-expects`) for having 3 `expect` calls in the test, where the maximum is 1. 

I have fixed both of these issues in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` by instantiating `PromptBuilder` with `{ identity: 'You are HAL.' }` and catching the thrown error into a variable `processError` to do a single `expect(...).toEqual(...)` at the end of the test.

Afterward, I formatted the file with `prettier --write`, committed the changes, pushed to `origin HEAD`, and merged `origin/main` (which was already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck (TS2353 baseSystemPrompt) and eslint (max-expects) errors in chatOrchestrator.beforeSession.acceptance.test.ts"}}