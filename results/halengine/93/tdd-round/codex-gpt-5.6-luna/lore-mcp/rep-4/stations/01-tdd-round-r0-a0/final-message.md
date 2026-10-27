Implemented and pushed commit `d9c24de`.

- Aggregates usage across all provider rounds.
- Preserves `undefined` when no rounds report usage.
- Added explicit `AggregatedUsageMetadata` public type.
- Updated specs, changelog, and DoD facets.
- Test: `chatOrchestrator.test.ts` passed (25/25).
- Acceptance tests, lint, typecheck, and build were not run.

Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate provider usage across tool rounds and document the public contract","tdd_next":"acceptance green"}}