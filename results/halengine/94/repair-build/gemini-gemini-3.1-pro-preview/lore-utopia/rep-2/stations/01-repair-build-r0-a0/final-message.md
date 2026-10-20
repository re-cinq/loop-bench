I have successfully resolved the test failures reported by CI.

The `typecheck` failure was caused by passing `baseSystemPrompt` and other unsupported properties instead of the `identity` property to `PromptBuilderConfig` in the `chatOrchestrator.beforeSession.acceptance.test.ts` file. 
The `eslint` failure (for `re-lint/max-expects`) was resolved by consolidating the assertions into a single `expect(...).toEqual(...)` check inside the test block. 

I've tested everything locally, committed the changes, and pushed them to the origin branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed typecheck (PromptBuilderConfig property) and eslint (re-lint/max-expects) errors in acceptance test"}}