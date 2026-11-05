Blocked: CI reports an invalid `PromptBuilderConfig` in the acceptance test and three assertions exceeding its lint limit. Fixing these requires editing the acceptance test, which your instructions prohibit when it is wrong.

CI also reports a forbidden provider import in the cleanup test. No runtime test failures were reported, so regression counts are unknown.

No files changed, tests run, or commits pushed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has invalid configuration and a lint violation; repairing it conflicts with the instruction to stop when acceptance tests are wrong."}}