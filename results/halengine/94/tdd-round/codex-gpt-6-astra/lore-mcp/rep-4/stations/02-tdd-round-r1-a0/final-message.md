Blocked: the acceptance test supplies `baseSystemPrompt`, but `PromptBuilderConfig` requires `identity`. CI confirms this invalid fixture. Your instruction says to stop if an acceptance test is wrong, rather than edit it.

No files changed, tests run, or commits pushed. CI reported validation failures, not failing test cases; no new red tests or confirmed test regressions this round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilderConfig fixture; correcting it requires editing the protected acceptance test."}}