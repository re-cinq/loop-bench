Blocked: the designated acceptance test constructs `PromptBuilder` with unsupported `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` fields; those are absent from `PromptBuilderConfig` on both this branch and `origin/main`. Per instruction, I did not alter an incorrect acceptance test or add unrelated compatibility API.

No files changed or tests run. CI currently reports 1 acceptance-test error and 0 regressions attributable to this round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The designated acceptance test is invalid against the unchanged PromptBuilderConfig API; editing it to compile is prohibited."}}