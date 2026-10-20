Implemented and pushed `9be20e2` (`fix(orchestrator): aggregate hook usage`).

- `afterModelResponse` now receives summed provider usage across all rounds.
- Added/exported `AggregateUsageMetadata`.
- Added focused aggregation test; it passes.
- No acceptance tests, lint, typecheck, or build run locally.
- Red tests: 1 authored; regressions: 0.
- Left the CHANGELOG update for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Aggregate reported provider usage under an explicit total-usage contract","tdd_next":"Update the hooks spec and CHANGELOG with aggregate-usage behavior"}}