Fixed two issues in the acceptance test:
1. `baseSystemPrompt` → `identity` to match the actual `PromptBuilderConfig` interface (removed the non-existent `systemPromptSuffix` and `contextConfig` fields)
2. Reduced 3 `expect` calls to 1 by using `.then(success, failure)` to capture the rejection as a resolved value and checking all three conditions with a single `resolves.toEqual`

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilder config used wrong property name (baseSystemPrompt vs identity) and test had 3 expects (max 1 per re-lint/max-expects rule)"}}