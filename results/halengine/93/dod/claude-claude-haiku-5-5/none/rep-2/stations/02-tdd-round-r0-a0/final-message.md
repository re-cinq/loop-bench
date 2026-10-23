Branch is up to date and pushed. The work is done:

- **RED**: Added `accumulateUsage` import and a failing test to `orchestratorHelpers.test.ts`
- **GREEN**: Implemented `accumulateUsage` in `orchestratorHelpers.ts`, used it in `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage`
- **Other facets completed in the same commit**: type-level comment on `afterModelResponse`, spec.md updated (removed under-counting bullet, added new behavior description with `validated by` link), CHANGELOG entry added

All 6 DoD facets are ticked. The existing tests (`receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none`) remain green because `accumulateUsage(undefined, x) = x` and `accumulateUsage(x, undefined) = x`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across all tool rounds via accumulateUsage helper","tdd_next":"acceptance green"}}