Blocked: the acceptance test constructs `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but its constructor requires `{identity: string, ...}`. The fixture cannot typecheck.

Your instructions require stopping when an acceptance test is wrong. No files changed, tests run, or commits pushed. No regression verdict was available: Lore returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilder configuration; its fixture must be corrected before this round can proceed."}}