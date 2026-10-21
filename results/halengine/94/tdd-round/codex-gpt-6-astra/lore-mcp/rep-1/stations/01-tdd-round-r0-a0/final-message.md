Stopped as instructed: the acceptance test is invalid. At `chatOrchestrator.beforeSession.acceptance.test.ts:30`, it passes unsupported `baseSystemPrompt` to `PromptBuilder` and omits required `identity`.

No files changed, tests run, or commits made. New red tests: 0; regressions: unknown because Lore denied CI access (HTTP 403).

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test supplies invalid PromptBuilderConfig; instructions prohibit editing it and require stopping."}}