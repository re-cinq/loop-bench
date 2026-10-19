Pushed and up to date. Summary of what this round did:

- Added `addUsage(total, round)` pure function to `orchestratorHelpers.ts` — returns `undefined` if both inputs are undefined, the defined one if only one is defined, or the field-by-field sum when both are defined.
- Changed `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = addUsage(lastUsage, outcome.usage)`.
- Wrote 4 unit tests for `addUsage` in `orchestratorHelpers.test.ts` (all green).
- Ticked the first DoD facet.

The remaining facets (JSDoc on `afterModelResponse`, delete the under-counting spec bullet, CHANGELOG entry) are untouched — those are the next rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across rounds via addUsage helper replacing lastUsage = outcome.usage ?? lastUsage","tdd_next":"Make the hook's type say it is a sum: JSDoc on afterModelResponse, then delete the under-counting bullet from specs/hal-engine-config-hooks/spec.md"}}