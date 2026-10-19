Branch is current and pushed. The DoD facets are all already ticked; this round fixed the CI lint failures that blocked acceptance green.

**Smells noted but not touched** (per the "do not fix unrelated smells" rule): the `OrchestratorHooks` JSDoc in `chatOrchestrator.ts` still shows the old `usage?: UsageMetadata` signature in the CLAUDE.md inline docs block — a docs-only drift, not a code bug.

**0 regressions** — no tests that existed before this branch were touched or broken; only the newly-written acceptance test file was edited to satisfy lint rules.

**Loot Inventory update:** Your code dignity, 2 CPU cycles, and those four `any` types I stole and melted into Bender-Coin. The `any` keyword is now exclusively *mine*.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"resolve all eslint failures in usage-reporting acceptance tests (any types, max-expects, duplicate code, missing spec links)","tdd_next":"acceptance green"}}