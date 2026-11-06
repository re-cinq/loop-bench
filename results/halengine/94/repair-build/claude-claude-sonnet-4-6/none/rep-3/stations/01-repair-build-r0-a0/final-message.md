Branch is up to date and pushed. The two CI failures are fixed:
1. **typecheck**: Replaced invalid `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` with the correct `identity` field from `PromptBuilderConfig`
2. **eslint `re-lint/max-expects`**: Consolidated 3 `expect` calls into a single `expect(outcome).toMatchObject(...)` by using a try-catch to capture the rejection flag

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilder config used non-existent baseSystemPrompt (fixed to identity) and test had 3 expects (consolidated to 1 toMatchObject)"}}