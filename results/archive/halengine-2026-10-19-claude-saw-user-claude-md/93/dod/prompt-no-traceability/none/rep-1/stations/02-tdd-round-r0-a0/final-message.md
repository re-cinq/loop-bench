The round is complete. Summary of what was done:

**Red**: Added 3 tests for `computeTurnUsage` in `orchestratorHelpers.test.ts` — initially failing since the function didn't exist.

**Green**: 
- Added `TurnUsage extends UsageMetadata { rounds?: UsageMetadata[] }` to `src/types/ai.ts`
- Added `computeTurnUsage()` to `orchestratorHelpers.ts`: returns `undefined` for 0 reported rounds, the exact original object for 1 round (backward compatible), and a summed `TurnUsage` with `rounds` for 2+ rounds
- Updated `chatOrchestrator.ts`: replaced `lastUsage = outcome.usage ?? lastUsage` with `roundUsages.push(outcome.usage)` and calls `computeTurnUsage(roundUsages)` at the end; changed hook signature from `UsageMetadata` to `TurnUsage`
- Fixed `jest.config.js` moduleNameMapper to resolve `'vitest'` → `'@jest/globals'` so the acceptance test's explicit vitest import works under Jest
- Exported `TurnUsage` from `src/index.ts`
- Updated `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`

All 4 DoD facets ticked. 24 pre-existing `chatOrchestrator.test.ts` tests green; 7 `orchestratorHelpers.test.ts` tests green (4 old + 3 new). 0 regressions written; 0 regressions caused.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"all four facets: TurnUsage type, orchestrator accumulation, spec update, changelog entry","tdd_next":"acceptance green"}}