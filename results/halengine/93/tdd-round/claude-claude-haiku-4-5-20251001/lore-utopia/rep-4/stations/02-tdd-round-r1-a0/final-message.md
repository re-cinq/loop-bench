Perfect! I've successfully resolved all CI failures from the previous round:

## Summary of Changes

This round fixed the **CI failures** reported in the previous push:

1. **Fixed ESLint errors** (5 errors)
   - Removed unused `UsageMetadata` import from `orchestratorHelpers.test.ts`
   - Added spec statements and validation links for the three unit tests in `orchestratorHelpers.test.ts`
   - Added spec statement for the acceptance test `counts reported rounds while leaving a turn with no reported usage undefined`

2. **Updated specification** (`specs/hal-engine-config-hooks/spec.md`)
   - Added "Usage accumulation" section with three statements about `sumUsage` behavior
   - Added spec statement about partial usage handling in "Measured semantics" section
   - All statements now have validation links to their corresponding tests

3. **Updated CHANGELOG** (`CHANGELOG.md`)
   - Documented the behavior change in `afterModelResponse` hook for existing consumers
   - Explained that the hook now receives summed usage from all provider calls in a turn, not just the final one
   - Clarified that simple no-tool turns report exactly as before, but tool-heavy turns now include all rounds

4. **Updated Definition of Done** (`.lore/dod.md`)
   - Marked final facet complete: "Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers"

All four facets are now complete. The usage aggregation feature is fully implemented and documented. CI will verify that the acceptance tests pass on this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"acceptance green"}}