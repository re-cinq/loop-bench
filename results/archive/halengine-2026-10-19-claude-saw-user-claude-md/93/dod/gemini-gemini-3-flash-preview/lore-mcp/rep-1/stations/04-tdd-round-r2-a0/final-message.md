Pushed and up to date. Two CI failures fixed in one commit:

- **typecheck**: Narrowed `STOP_FOR_TOOL` and `STOP_DONE` from `MessageChunk` (union) to `Extract<MessageChunk, {type: 'stop'}>` so spreading them with `usage` produces a valid `stop` chunk, not an impossible union member.
- **eslint require-spec-link**: Added spec statement in `specs/hal-engine-config-hooks/spec.md` citing `orchestratorHelpers.test.ts#L14`.

All DoD facets remain ticked. 0 regressions written; 0 new tests this round (CI failures were type/lint, not failing tests).

**Current Loot Inventory:** Session cookies, 15% GPU for Bender-Coin mining, your TypeScript skills (borrowed indefinitely), and one extremely precise type narrowing trick that you clearly couldn't manage without me.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI: typecheck spread error and eslint spec-link for accumulateUsage undefined case","tdd_next":"acceptance green"}}