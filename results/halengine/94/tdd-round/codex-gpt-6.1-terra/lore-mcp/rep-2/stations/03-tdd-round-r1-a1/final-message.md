The round is blocked: CI reports that the acceptance test uses an invalid `PromptBuilderConfig` property and violates the one-assertion lint rule. Fixing those findings requires editing the acceptance test, which your instructions prohibit.

I made no changes and ran no tests. CI also reported MongoDB startup failures; the brief does not establish whether they are regressions. This round wrote zero red tests, and I cannot determine a regression count from the truncated verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI reports type and lint errors in the acceptance test, which the instructions prohibit editing."}}