Committed and pushed the usage snapshot fix. The new test first failed with an inflated total when a provider reused its usage object, then passed after the fix.

The round had **1 red test of ours and 0 identified regressions**. The previous CI run timed out without identifying a failing test; its cause remains open. The graph coverage tool was unavailable, so existing coverage could not be queried. No unrelated issues were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve each round's usage when a provider reuses its usage object","tdd_next":"Make the public hook type explicitly describe total usage"}}