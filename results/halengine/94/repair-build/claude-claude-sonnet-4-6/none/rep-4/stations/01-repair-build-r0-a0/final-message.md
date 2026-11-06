Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. **typecheck error**: replaced invalid `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` properties with the correct `identity` field from `PromptBuilderConfig`
2. **eslint error (max-expects)**: consolidated three separate `expect` calls into a single `expect({...}).toEqual({...})` assertion

The test passes locally and the push is confirmed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used wrong PromptBuilderConfig fields and had 3 expect calls; fixed to use identity property and consolidated to 1 toEqual assertion"}}