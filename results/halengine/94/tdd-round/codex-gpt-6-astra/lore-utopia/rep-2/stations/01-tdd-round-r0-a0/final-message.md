Stopped as required because the acceptance test is invalid: `chatOrchestrator.beforeSession.acceptance.test.ts:29–37` passes unsupported `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` fields to `PromptBuilder`, omitting required `identity`.

No files changed, no tests run, no commits created. Observed red tests: 0 mine, 0 regressions; CI lookup returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test constructs PromptBuilder with unsupported fields and omits required identity; acceptance tests cannot be edited this round."}}