Committed and pushed `8f10a39`. The new test caught ten unnecessary reads of a static schema; after the fix, the targeted test passed.

This round had **1 red test of mine**, now green, and **0 identified regressions**. The previous CI test failure remains unclassified because its brief contains no failing test name. The next facet is the remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse a static tool's captured schema across ten execute calls","tdd_next":"Add remaining unit tests and update documentation and changelog"}}