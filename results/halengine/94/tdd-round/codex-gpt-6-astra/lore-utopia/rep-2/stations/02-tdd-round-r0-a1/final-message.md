Blocked: the acceptance test constructs `PromptBuilder` with unsupported fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) and omits required `identity`. This cannot pass the required typecheck.

Per your instruction to stop when an acceptance test is wrong, I left it unchanged. No files changed or tests ran; no red tests introduced, no regressions observed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilderConfig; its fixture needs correction before this round can proceed."}}