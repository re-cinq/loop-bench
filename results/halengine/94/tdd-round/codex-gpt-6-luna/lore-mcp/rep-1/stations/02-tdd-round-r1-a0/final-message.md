I stopped before editing. The acceptance test has an invalid `PromptBuilder` configuration: it passes `baseSystemPrompt`, which `PromptBuilderConfig` does not define. The ticket says to stop if an acceptance test is wrong, rather than edit it. Lore’s trace query also returned 403, so I could not check coverage before changing a symbol.

No files changed; no tests ran. CI reported no red tests, so this round had 0 red tests of mine and 0 regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test has an invalid PromptBuilder configuration, and the ticket requires stopping when an acceptance test is wrong."}}