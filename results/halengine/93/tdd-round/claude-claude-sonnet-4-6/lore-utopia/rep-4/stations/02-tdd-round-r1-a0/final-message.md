Fixed all 4 CI failures from the round brief:

- **Lines 29, 35, 41** in `orchestratorHelpers.test.ts`: Added spec statements in `specs/hal-engine-config-hooks/spec.md` with `([validated by name](path#Lnn))` links for all four `accumulateUsage` unit tests.
- **Line 35 max-expects violation**: Split the two-expect test `'returns the defined side when only one round reports usage'` into two separate single-expect tests: `'returns the defined side when the first round reports no usage'` (L35) and `'returns the defined side when the second round reports no usage'` (L40).

No regressions introduced — 0 regression tests touched, 0 acceptance tests edited.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint spec-link and max-expects violations in orchestratorHelpers.test.ts","tdd_next":"acceptance green"}}