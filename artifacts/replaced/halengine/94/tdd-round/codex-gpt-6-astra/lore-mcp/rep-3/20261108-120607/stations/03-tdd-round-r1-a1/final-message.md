Blocked: the acceptance test uses `baseSystemPrompt`, which `PromptBuilderConfig` does not support. CI reports this at line 30, alongside lint violations. Your instructions explicitly require stopping when an acceptance test is wrong.

No files changed, tests run, or commits pushed. CI reported no failing test cases; it reported five typecheck/lint findings across two ticket-added tests, with no reported pre-existing test regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has an invalid PromptBuilderConfig fixture; repairing it conflicts with the explicit instruction to stop when an acceptance test is wrong."}}