Pushed and up to date. Summary:

- Added `addUsage(a, b)` to `orchestratorHelpers.ts` — sums all three token fields when both are defined, returns the defined side when one is undefined, returns undefined when both are undefined.
- Replaced `lastUsage = outcome.usage ?? lastUsage` with `totalUsage = addUsage(totalUsage, outcome.usage)` in `chatOrchestrator.ts`, renaming the accumulator to signal its new contract.
- Added 3 unit tests for `addUsage` in `orchestratorHelpers.test.ts` (all 7 pass).
- Ticked facets 1 and 2 in `.lore/dod.md`.

Remaining unaddressed smells noticed but not acted on: none structural. Remaining DoD facets for the next round: (3) verify no-tool regression guard stays green in CI, (4) update `specs/hal-engine-config-hooks/spec.md` and CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across all tool rounds (addUsage helper + totalUsage accumulator)","tdd_next":"update hooks spec and CHANGELOG with aggregate-usage behaviour"}}