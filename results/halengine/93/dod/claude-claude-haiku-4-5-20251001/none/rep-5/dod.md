# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The hook's parameter is already passed directly to the entry point, and the accumulation logic can be built inside the round loop by adding a helper function to sum usage objects. No new seam is needed; the wire remains the same (`usage` parameter unchanged), only the value changes.

## Done when these pass

- [ ] **reports accumulated usage across all tool rounds, not just the last** — A turn with two tool rounds carrying different usage values passes their sum to the hook, not the last round's value alone
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **preserves the baseline: a turn with no tool calls reports usage as before** — A single-round turn passes exactly the usage it reports today, making the common path unaffected
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **handles missing usage gracefully** — Rounds that don't report usage do not corrupt the total with undefined or NaN
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **existing hook order test unedited** — The test `keeps the usage an earlier round reported when a later round reports none` remains green, confirming backwards compatibility for the keep-previous-if-missing logic
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add a `sumUsage` helper function to accumulate usage objects (handle undefined gracefully)
- [ ] Change line 117 in `chatOrchestrator.ts` to accumulate across rounds instead of replacing
- [ ] Update `specs/hal-engine-config-hooks/spec.md` line 28 to describe the new accumulated behaviour
- [ ] Add a CHANGELOG entry under [Unreleased] → Changed explaining the behaviour change for existing consumers

## Out of scope

- The decision between passing sum alone vs. sum + per-round breakdown (ticket text says this is open; tests enforce the sum is passed at minimum)
- The audit entry or billing record itself
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape