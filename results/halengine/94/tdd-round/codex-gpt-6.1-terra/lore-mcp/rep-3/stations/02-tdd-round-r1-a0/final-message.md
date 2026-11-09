The round is blocked by errors in the protected acceptance test. CI reports that it uses an invalid `PromptBuilderConfig` property and violates the one-expect-per-test rule. Fixing those findings requires editing the acceptance test, which the round instructions prohibit.

I made no changes and ran no tests. CI reported one red acceptance test and no identified regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI findings require editing the protected acceptance test."}}