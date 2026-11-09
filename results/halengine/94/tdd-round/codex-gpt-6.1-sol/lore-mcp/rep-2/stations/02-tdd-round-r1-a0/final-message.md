The acceptance test is invalid: its `PromptBuilder` configuration uses unsupported fields. CI also reports three assertions in that test and a forbidden provider import in the cleanup test.

Fixing all findings requires editing the acceptance test, which your instructions explicitly prohibit. No files changed, tests run, commits, or pushes. CI reports failures in two branch test files; no existing-test regressions are identified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI repair requires editing an invalid acceptance test, which the round instructions prohibit."}}