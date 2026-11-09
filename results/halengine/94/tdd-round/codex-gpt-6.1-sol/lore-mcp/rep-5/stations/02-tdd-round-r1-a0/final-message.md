The acceptance test has an invalid fixture: `PromptBuilderConfig` does not support `baseSystemPrompt`. CI also reports three assertions exceeding the lint limit.

Your instructions prohibit editing an incorrect acceptance test and require stopping. No files changed, no commit or push, and no tests ran here. CI reported no behavioral test failures; the failures were typecheck and lint.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has an invalid PromptBuilderConfig fixture and violates max-expects; instructions prohibit repairing an incorrect acceptance test."}}