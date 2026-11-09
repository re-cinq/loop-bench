The round is blocked: the next facet is to make the hook’s aggregate usage type explicit, but I could not express that as a failing runtime test. The test I tried passed before the type existed because Jest transpiles without type-checking; I removed it.

The previous CI test job timed out without identifying a failing test. This round produced **0 red tests and 0 identified regressions**. The working tree is clean; no commit or push was made.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The remaining public type facet cannot be made red with the permitted test runner, which does not type-check."}}