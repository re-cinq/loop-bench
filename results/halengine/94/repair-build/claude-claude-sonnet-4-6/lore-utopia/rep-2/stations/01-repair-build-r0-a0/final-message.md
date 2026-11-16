The branch is pushed and up to date. The two CI failures are fixed:

1. **typecheck**: Changed `baseSystemPrompt` to `identity` (the correct field name in `PromptBuilderConfig`)
2. **eslint max-expects**: Split the single test with 3 `expect` calls into 3 separate tests, each with 1 `expect`

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilderConfig property (baseSystemPrompt→identity) and split 3-expect test into 3 single-expect tests to satisfy re-lint/max-expects"}}