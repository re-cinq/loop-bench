Branch is up to date. The two CI failures are fixed:

1. **`re-lint/max-member-chain`** (line 111): replaced `registry.get('my_tool')?.definition.name` (3 hops) with `registry.get('my_tool')?.definition` and `toMatchObject({name: 'my_tool'})` (2 hops).

2. **`re-lint/require-spec-link` + spec-links** (line 29 in spec.md): split the combined `ToolRegistry.get` statement into two separate bullets so each validated-by link is the trailing parenthetical of its own statement.

All 11 tests in `registry.test.ts` remain green. 0 regressions caused; 0 new tests written (this was a pure CI-fix round). No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint max-member-chain and spec-links misplaced citation","tdd_next":"acceptance green"}}