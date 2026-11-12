I have resolved the CI failures in `chatOrchestrator.beforeSession.acceptance.test.ts`. 

The test was failing for two reasons:
1. `typecheck`: The `PromptBuilder` was initialized with an object literal containing `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, which are not valid properties for `PromptBuilderConfig` (it expects properties like `identity` and `responseGuidelines`). 
2. `eslint`: The test violated the `re-lint/max-expects` rule because it contained 3 `expect` calls. 

I updated the `PromptBuilder` instantiation to use the correct `identity` and `responseGuidelines` keys, and combined the assertions into a single `expect(...).toEqual(...)` check that covers the rejection message, the caught error, and whether `afterSession` fired. The changes have been formatted, committed, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed typecheck and eslint errors in chatOrchestrator.beforeSession.acceptance.test.ts"}}