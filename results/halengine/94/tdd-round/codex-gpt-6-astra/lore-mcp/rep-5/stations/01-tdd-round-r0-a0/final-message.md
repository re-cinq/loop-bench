Blocked by an invalid acceptance fixture: `chatOrchestrator.beforeSession.acceptance.test.ts:30` passes `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` to `PromptBuilder`, whose config requires `identity` and supports none of those fields.

Per your instruction, I stopped without editing the acceptance test. No files changed, tests run, or commits pushed. Red tests authored: 0; confirmed regressions: 0. CI lookup returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test constructs PromptBuilder with an invalid config; the fixture must be corrected before this round can proceed."}}