Fixed Ajv error formatting compatibility and TypeScript narrowing; wrong-type paths now remain `/location` across Ajv variants.

Focused registry test passed. CI had 1 red ticket test and 0 regressions. Committed and pushed `41e0f3b`; branch is current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair validation error formatting compatibility from CI","tdd_next":"Add the remaining registry and orchestrator unit tests, link the remaining statements, and update the required documentation"}}