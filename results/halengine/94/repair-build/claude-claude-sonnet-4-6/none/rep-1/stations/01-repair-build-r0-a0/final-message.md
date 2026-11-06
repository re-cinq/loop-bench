Fixed both CI failures in the acceptance test file:

1. **typecheck**: Changed `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` to `identity: 'You are HAL.'` — matching the actual `PromptBuilderConfig` interface.

2. **eslint (max-expects)**: Replaced the 3 separate `expect` calls with a single `toEqual` assertion that checks `message`, `caughtError`, and `afterSessionRan` together.

The test passes locally and the push landed at `a8e5f64`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used wrong PromptBuilderConfig fields and had 3 expect calls; fixed to use identity field and single toEqual assertion"}}