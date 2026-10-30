Blocked before editing: the acceptance test constructs `PromptBuilder` with obsolete, invalid fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) instead of the current required `identity` configuration. Per the instruction not to edit an incorrect acceptance test, this round must stop.

No tests ran locally. CI reported no red tests—0 tests written this round and 0 regressions—only build/lint/spec/changelog failures.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test uses an invalid PromptBuilderConfig, and acceptance tests may not be edited."}}