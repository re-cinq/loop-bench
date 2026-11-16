Branch is pushed and up to date. The two CI failures were both in the acceptance test file:

1. **typecheck**: Used `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` which don't exist on `PromptBuilderConfig` — fixed by replacing with the correct `identity` field.
2. **eslint `re-lint/max-expects`**: Single test had 3 `expect` calls (max 1) — fixed by splitting into 3 separate `it` blocks, each with one `expect`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used wrong PromptBuilderConfig fields (baseSystemPrompt→identity) and had 3 expects in one test (split into 3 tests)"}}