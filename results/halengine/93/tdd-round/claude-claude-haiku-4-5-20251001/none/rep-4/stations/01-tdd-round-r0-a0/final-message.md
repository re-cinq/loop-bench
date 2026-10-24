Perfect! I've completed the red-green-refactor round. Here's what I implemented:

**Red phase:** Created a failing test `accumulates usage across multiple provider rounds with tools` that validates the orchestrator accumulates usage from multiple provider calls in a single turn (expected sum of two rounds: {inputTokens: 30, outputTokens: 8, totalTokens: 38}).

**Green phase:** 
- Added `accumulateUsage()` helper function that sums token fields while properly handling undefined values
- Renamed `lastUsage` to `accumulatedUsage` to make the intent explicit
- Changed the accumulation logic from `lastUsage = outcome.usage ?? lastUsage` to `accumulatedUsage = accumulateUsage(accumulatedUsage, outcome.usage)`

**Refactor:** All 25 tests pass, including the regression test that validates the no-tool case still receives exactly what it does today.

The implementation correctly:
- Sums all token fields across rounds
- Preserves `undefined` when no rounds report usage
- Handles gaps in reporting (some rounds with usage, some without)
- Maintains backward compatibility for single-round (no-tool) cases

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"usage accumulation across rounds","tdd_next":"update specs and CHANGELOG"}}