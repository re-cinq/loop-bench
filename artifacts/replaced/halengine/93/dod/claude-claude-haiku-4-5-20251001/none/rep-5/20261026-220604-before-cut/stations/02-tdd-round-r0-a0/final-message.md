Branch is up to date with no outstanding commits. The round is complete.

Summary of what was delivered:
- **RED**: Added `sumUsage` import to `orchestratorHelpers.test.ts` with three failing tests covering sum, one-undefined, and both-undefined cases
- **GREEN**: Added `sumUsage` to `orchestratorHelpers.ts`; changed `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = sumUsage(lastUsage, outcome.usage)`
- **REFACTOR**: No duplication to collapse; updated spec and CHANGELOG as required by DoD

All 4 facets are ticked in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sumUsage helper + accumulation across rounds + spec/changelog updates","tdd_next":"acceptance green"}}