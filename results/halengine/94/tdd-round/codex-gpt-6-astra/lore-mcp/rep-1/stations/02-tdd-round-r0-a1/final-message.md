The acceptance test is invalid: `PromptBuilder` receives `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but its constructor requires `PromptBuilderConfig` with `identity`. This causes a TypeScript error before the acceptance behavior can run.

Per your instruction, I stopped without editing the acceptance test. No files changed, tests ran, or commits were pushed. Red-test counts are unknown: Lore’s CI and coverage queries returned HTTP 403.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test constructs PromptBuilder with unsupported fields and omits required identity; acceptance fixture must be corrected before this round."}}