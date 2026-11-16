Branch is up to date and pushed. The two CI failures are fixed:

1. **typecheck**: Replaced invalid `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` with the correct `PromptBuilderConfig` properties (`identity` and `responseGuidelines`).
2. **eslint `re-lint/max-expects`**: Collapsed the 3 separate `expect` calls into a single `toMatchObject` assertion that covers all three checks (rejection message, `onError` received the error, `afterSession` ran).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"test used wrong PromptBuilderConfig properties (baseSystemPrompt) and had 3 expect calls; fixed to use identity/responseGuidelines and collapsed into one toMatchObject"}}