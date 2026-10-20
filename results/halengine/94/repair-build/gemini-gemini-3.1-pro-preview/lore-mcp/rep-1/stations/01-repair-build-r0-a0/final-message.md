I have addressed the CI issues reported for `typecheck` and `eslint` on `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.

1. **Typecheck Fix**: I updated the `PromptBuilder` instantiation to pass `identity` instead of `baseSystemPrompt`, as expected by `PromptBuilderConfig`.
2. **ESLint Fix**: To comply with `re-lint/max-expects` (max 1 expect call per test), I modified the test structure to execute the process message in a `try...catch` block and wrapped `processError`, `caughtError`, and `afterSessionRan` into a single object assertion using `.toEqual()`.

I verified the fixes locally by running `npm run typecheck`, `npm run eslint -- --max-warnings 0`, and `npm run prettier:check` without any errors. The changes have been successfully committed and pushed to the branch (`loop-bench/94`). 

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"typecheck and eslint failures in src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts"}}