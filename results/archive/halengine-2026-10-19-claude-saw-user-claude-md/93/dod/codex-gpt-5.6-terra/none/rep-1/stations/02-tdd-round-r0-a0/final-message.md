Branch is current. The round delivered:

- **RED**: Added 4 tests for `accumulateUsage` in `orchestratorHelpers.test.ts` (importing a symbol that didn't exist — confirmed red)
- **GREEN**: Implemented `accumulateUsage` in `orchestratorHelpers.ts`, wired it into `chatOrchestrator.ts` replacing `outcome.usage ?? lastUsage` with `accumulateUsage(lastUsage, outcome.usage)` — 8/8 tests pass
- **REFACTOR**: No structural changes needed; code was already minimal
- **Also closed**: CHANGELOG entry added, spec was already correct, all 3 dod facets ticked

0 regressions written; 0 pre-existing regressions introduced.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate each defined provider-call usage before invoking afterModelResponse (all three facets closed)","tdd_next":"acceptance green"}}