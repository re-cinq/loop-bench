Pushed successfully. The two CI failures are fixed:

1. **typecheck**: Changed `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` to the correct `PromptBuilderConfig` fields (`identity` and `domainContext`)
2. **eslint (re-lint/max-expects)**: Collapsed 3 separate `expect` calls into one `expect({...}).toEqual({...})` that checks the rejection message, `caughtError`, and `afterSessionRan` together

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed PromptBuilderConfig field names (baseSystemPrompt→identity) and collapsed 3 expect calls into 1 toEqual to satisfy re-lint/max-expects"}}