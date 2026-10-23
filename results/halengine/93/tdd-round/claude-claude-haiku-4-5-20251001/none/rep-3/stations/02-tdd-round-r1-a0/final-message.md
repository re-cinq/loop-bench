Perfect! I've successfully completed this round by fixing the CI failures from the previous implementation.

## What I did:

**Fixed two CI failures:**

1. **ESLint spec-link errors** — Added inline spec links to all five tests lacking them:
   - Added a spec statement about handling missing/undefined usage in aggregation
   - Added links to the second acceptance test (`chatOrchestratorUsage.acceptance.test.ts:67`)
   - Added links to four unit tests validating the summing behavior (`orchestratorHelpers.test.ts:29,41,53,61`)

2. **CHANGELOG requirement** — Added an entry documenting the behavior change:
   - `afterModelResponse` hook now receives the summed usage from all provider calls (including tool rounds), not just the final one
   - Included migration note: billing/budgeting hooks will now record complete turn cost instead of under-counting tool-heavy turns

**Testing:** Ran the orchestratorHelpers unit tests (8 tests passed) and formatted all changes with prettier.

**Updated the DOD:** Marked the final facet as complete since all four facets are now checked.

Branch pushed and up to date with origin/main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"acceptance green"}}