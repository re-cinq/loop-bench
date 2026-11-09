Blocked: the acceptance test constructs `PromptBuilder` with unsupported fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) and omits required `identity`. CI’s typecheck cannot pass with that fixture.

Per your instructions, I stopped without editing the acceptance test. No files changed, tests run, or commits pushed. Red tests: none observed locally; regressions: unknown. Lore’s trace and CI tools are unavailable here.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilder configuration; correcting acceptance tests is prohibited."}}