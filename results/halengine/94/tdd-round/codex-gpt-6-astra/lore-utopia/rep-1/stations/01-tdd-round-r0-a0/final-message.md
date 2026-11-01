Blocked by an invalid acceptance-test fixture: line 29 constructs `PromptBuilder` with unsupported `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` fields, omitting required `identity`. This prevents the typecheck bar from passing.

Per your instruction, I stopped without editing the acceptance test. No changes, commits, or tests run here. Red counts: 0 mine; regressions unknown because CI returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test constructs PromptBuilder with invalid configuration; fixture needs correction before the required bar can pass."}}