Branch is pushed and up to date. The fixes address all 4 ESLint errors from the previous round:

- **3 missing spec links**: Added spec statements in `specs/hal-engine-config-hooks/spec.md` with `([validated by: ...](../../src/orchestration/orchestratorHelpers.test.ts#Lnn))` links pointing to each test's declaration line.
- **2-expects violation**: Split `returns the one that reported when the other is absent` into two single-expect tests: `returns a when a reports and b is absent` (L33) and `returns b when b reports and a is absent` (L38).

No tests were regressions — all 8 tests in `orchestratorHelpers.test.ts` pass. The DoD facets were already all ticked from the previous round; this round only fixed the CI failures.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint spec-link and max-expects violations in sumUsage tests","tdd_next":"acceptance green"}}