The acceptance test is invalid: its `PromptBuilderConfig` uses unsupported `baseSystemPrompt`, and CI also reports three assertions where only one is allowed. Your instructions require stopping when an acceptance test is wrong rather than editing it.

The required `tdd-loop` skill was also absent from the searched skill and workspace paths.

No files changed, tests run, or commits pushed. CI reported no runtime test failures; its three findings concern typechecking and linting.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has an invalid PromptBuilderConfig and violates the assertion limit; instructions prohibit repairing an incorrect acceptance test."}}