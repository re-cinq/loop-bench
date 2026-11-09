Blocked: the acceptance test constructs `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but its constructor requires `identity`. This is a TypeScript error in the acceptance test itself.

Your instructions require stopping when an acceptance test is wrong. No files changed, tests run, or commits pushed. Red-test counts are unknown; CI returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilder configuration; instructions prohibit editing it and require stopping."}}