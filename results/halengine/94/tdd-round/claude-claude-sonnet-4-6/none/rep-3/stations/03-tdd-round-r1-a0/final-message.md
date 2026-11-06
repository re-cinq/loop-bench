Branch is up to date and pushed. The two CI failures are fixed:
- **typecheck**: replaced `baseSystemPrompt/systemPromptSuffix/contextConfig` with the correct `identity` field from `PromptBuilderConfig`
- **eslint `max-expects`**: consolidated 3 `expect` calls into one `expect({...}).toMatchObject({...})`

The acceptance test passes locally (1 test, green).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: correct PromptBuilderConfig field and consolidate expects to satisfy re-lint/max-expects","tdd_next":"acceptance green"}}