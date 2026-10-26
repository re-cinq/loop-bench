The branch is pushed and up to date. The commit fixed all CI failures:

1. **eslint: `SendMessageParams` unused** → removed from acceptance test import
2. **eslint: duplicate code** → extracted `scriptedProvider`, `registryReturning`, `TOOL_CALL` to `orchestratorTestHelpers.ts`
3. **eslint: no spec link at L71** → spec.md now has a single trailing paren with both links; acceptance test first `it()` is at L45 after refactor
4. **eslint: 2 expects** → removed redundant second `expect(Number.isNaN(...))` from the missing-usage test (subsumed by the first `toEqual`)
5. **eslint: no spec links for orchestratorHelpers L35, L40** → added spec statements covering all `sumUsage` edge cases
6. **spec-links: misplaced link** → combined dual `(...)(...)` trailing parens into single `(..., ...)` paren

All 9 retargeted spec anchors (tool loop test line numbers shifted -24 after dedup) were verified against the actual file with `repoint-spec-anchors --check`. The full spec-links scan reports 0 misplaced.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: dedup test helpers, spec link corrections, eslint fixes","tdd_next":"acceptance green"}}