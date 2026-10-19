Branch is up to date. The round delivered:

- Added `accumulateUsage(acc, incoming)` to `orchestratorHelpers.ts` — returns `undefined` if nothing accumulated, seeds from the first usage, and sums thereafter
- Updated the round loop in `chatOrchestrator.ts` to call `accumulateUsage` instead of the last-wins `?? lastUsage`
- Added 4 unit tests in `orchestratorHelpers.test.ts` covering sum, passthrough, empty accumulator, and no-usage cases (all green)
- Ticked the first DoD facet

Remaining unobserved smells: none noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Aggregate usage from every provider call, preserving the existing single-call and no-reported-usage behavior.","tdd_next":"Make the hook's usage type and documentation state clearly that the value is a turn total."}}