Committed and pushed `b1cb55f`. The hook now sums token counts across reported provider calls, including when a round omits usage. The new test passed after first failing as expected.

The round had **1 red test of mine and 0 known regressions**. Lore could not retrieve the previous CI verdict because it reported the branch as not found. Acceptance tests remain for CI.

The existing test-list command runs the full suite to enumerate tests; I left that unrelated design unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token usage across provider rounds","tdd_next":"Make the public hook type explicitly identify total usage"}}