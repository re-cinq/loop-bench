The acceptance test is invalid: line 29 constructs `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but `PromptBuilderConfig` requires `identity` and accepts none of those fields.

Your instructions require stopping when an acceptance test is wrong. No files changed, no tests ran, and nothing was committed or pushed. Observed red tests: none; regressions: none confirmed. CI lookup returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilderConfig; correct the acceptance fixture before continuing."}}