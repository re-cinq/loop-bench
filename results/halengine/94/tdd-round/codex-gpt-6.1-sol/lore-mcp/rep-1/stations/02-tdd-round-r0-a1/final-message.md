Blocked: the acceptance test constructs `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but `PromptBuilderConfig` requires `identity` and supports none of those fields.

Your instructions require stopping when an acceptance test is wrong. I left it unchanged. No edits, commits, pushes, or local test runs occurred; no red tests were observed or classified as regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses unsupported PromptBuilderConfig fields and omits required identity; instructions prohibit correcting it."}}