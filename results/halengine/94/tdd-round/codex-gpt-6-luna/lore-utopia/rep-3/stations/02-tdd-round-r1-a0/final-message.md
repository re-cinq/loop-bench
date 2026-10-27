The acceptance test has a fixture type error: it constructs `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but `PromptBuilderConfig` accepts `identity` and other fields. The ticket forbids editing acceptance tests and says to stop if one is wrong, so I made no changes and did not run a test.

This round did not reach the spec or changelog facet. The reported CI findings remain unresolved.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test uses PromptBuilder fields that are not in PromptBuilderConfig; the ticket says to stop rather than edit an acceptance test."}}