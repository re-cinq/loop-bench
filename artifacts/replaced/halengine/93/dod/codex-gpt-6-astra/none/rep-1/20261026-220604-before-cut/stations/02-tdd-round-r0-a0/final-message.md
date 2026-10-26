Pushed and up to date. Summary of what this round did:

- Added `accumulateUsage` to `orchestratorHelpers.ts` — sums all three token fields when both are defined, returns the defined one when the other is absent, returns `undefined` when both are absent.
- Updated `chatOrchestrator.ts` to use `accumulateUsage(lastUsage, outcome.usage)` instead of the last-wins `outcome.usage ?? lastUsage`, so `afterModelResponse` now receives the turn total.
- Renamed the hook parameter to `totalUsage` making the contract unambiguous from the type signature alone.
- Unit test for `accumulateUsage` written and green (8/8 pass).
- Ticked facets 1, 2, 4 in `.lore/dod.md`.

Next round takes: changelog entry and MINOR version bump (facet 5), then CI gates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across provider rounds (facets 1, 2, 4)","tdd_next":"changelog entry and MINOR version bump (facet 5), then CI gates (facet 6)"}}