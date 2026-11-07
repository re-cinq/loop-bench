Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. **TypeScript error**: replaced invalid `baseSystemPrompt` / `systemPromptSuffix` / `contextConfig` with the correct `PromptBuilderConfig` property `identity`
2. **ESLint error**: split the single test with 3 `expect` calls into 3 separate `it` blocks (each with 1 `expect`), using `beforeAll` to run the orchestrator once and collect results

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilder config used wrong property (baseSystemPrompt→identity) and test had 3 expects (max 1) — fixed by correcting the config and splitting into 3 it-blocks"}}