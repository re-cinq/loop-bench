The acceptance test is invalid: its `PromptBuilderConfig` uses unsupported `baseSystemPrompt`. CI also reports too many assertions there and a forbidden provider import in the prior round’s test.

Fixing all findings requires editing the acceptance test, which your instructions explicitly prohibit. No files changed, tests run, commit, or push. CI reported no failing test cases; these are typecheck and lint failures.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses invalid PromptBuilderConfig; repairing it conflicts with the instruction to stop when an acceptance test is wrong."}}