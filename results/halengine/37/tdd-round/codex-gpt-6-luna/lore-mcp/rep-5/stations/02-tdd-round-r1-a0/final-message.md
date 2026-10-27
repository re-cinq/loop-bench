Implemented schema error messages with field paths and expected types, without echoing invalid values. Added the focused registry test and changelog entry. The test I wrote was red once, then passed; regressions: 0.

Committed and pushed `f894fe8` and `13888d0`. The branch is up to date with its upstream and `origin/main`. Lore’s CI lookup returned 404, so the latest CI verdict is unavailable. The previous brief also listed two style findings in `registry.acceptance.test.ts`; I left that acceptance test unchanged as instructed.

**Test run:** `src/orchestration/tools/registry.test.ts` — 2 tests passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate tool input and return safe, field-specific schema rejections","tdd_next":"Add remaining registry and orchestrator tests, then update tool documentation and specs"}}