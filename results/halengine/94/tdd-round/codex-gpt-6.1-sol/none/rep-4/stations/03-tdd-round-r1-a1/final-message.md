The acceptance test is invalid: line 30 supplies `baseSystemPrompt`, but `PromptBuilderConfig` requires `identity`. CI also reports two lint findings.

Your instructions require stopping when an acceptance test is wrong. No files changed, tests run, or commits pushed. CI reported no test failures; it reported three typecheck/lint findings.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilderConfig; repairing it requires editing the acceptance test, which this round forbids."}}