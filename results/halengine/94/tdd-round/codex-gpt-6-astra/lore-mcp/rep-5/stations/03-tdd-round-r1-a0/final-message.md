The acceptance test is invalid: its `PromptBuilderConfig` uses unsupported `baseSystemPrompt`, and its three assertions violate `max-expects`. Your instructions explicitly require stopping when an acceptance test is wrong rather than editing it.

No files changed, tests run, or commits pushed. CI reported three static-check findings, not test failures; no new red tests or confirmed regression tests this round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has invalid PromptBuilderConfig and violates max-expects; instructions prohibit editing it and require stopping."}}