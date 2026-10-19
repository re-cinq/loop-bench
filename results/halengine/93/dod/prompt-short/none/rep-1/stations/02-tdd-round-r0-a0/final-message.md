Branch is pushed and up to date.

**What was done:**
- Extracted `accumulateUsage(previous, next)` into `orchestratorHelpers.ts` — sums the three token fields when both are present, returns the non-`undefined` side when one is missing, returns `undefined` when neither reported
- Added 4 unit tests for `accumulateUsage` to `orchestratorHelpers.test.ts` (RED → GREEN confirmed locally)
- Changed `chatOrchestrator.ts` line `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = accumulateUsage(lastUsage, outcome.usage)`
- Updated `specs/hal-engine-config-hooks/spec.md` — replaced the "under-counts" sentence with the new accumulated-sum behaviour
- Added a CHANGELOG entry under `[Unreleased] ### Changed` explaining the behaviour change and migration note
- Ticked 5 of 7 DoD facets; one remaining: typing update to make the sum unambiguous

**Unrelated smell noticed but not touched:** The DoD description still references the old `lastUsage = outcome.usage ?? lastUsage` line — that's stale prose but not code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate inputTokens, outputTokens, and totalTokens across all rounds into a sum","tdd_next":"Update UsageMetadata type or argument typing in OrchestratorHooks to make it unambiguous that it's a sum"}}