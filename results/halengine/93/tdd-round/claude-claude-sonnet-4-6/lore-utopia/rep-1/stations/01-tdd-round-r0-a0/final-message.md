Pushed and up to date. Summary of what this round did:

- **RED**: Added 4 `accumulateUsage` tests to `orchestratorHelpers.test.ts` — failed because the export didn't exist.
- **GREEN**: Implemented `accumulateUsage(total, round)` in `orchestratorHelpers.ts` — sums token fields when both args are defined, passes through the defined one when one is undefined, returns undefined when both are.
- **REFACTOR**: Updated `chatOrchestrator.ts` to import and use `accumulateUsage`, renamed `lastUsage` → `totalUsage` to signal accumulation. Updated CHANGELOG and ticked all four DoD facets. 0 regressions (no existing test touched).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum usage across all tool rounds (Facets 1–4)","tdd_next":"acceptance green"}}