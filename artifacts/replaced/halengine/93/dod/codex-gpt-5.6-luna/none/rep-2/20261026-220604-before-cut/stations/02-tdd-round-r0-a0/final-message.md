Branch is clean and pushed. Summary of what this round did:

- **Added `accumulateUsage`** to `orchestratorHelpers.ts`: sums two `UsageMetadata` values, ignores `undefined` inputs, returns `undefined` only when both are `undefined`.
- **Updated `chatOrchestrator.ts`**: replaced `lastUsage = outcome.usage ?? lastUsage` (keep-last) with `lastUsage = accumulateUsage(lastUsage, outcome.usage)` (sum-all). Renamed the `afterModelResponse` parameter from `usage` to `totalUsage`.
- **Test** in `orchestratorHelpers.test.ts`: one new test (`sums token counts when both inputs are defined`) with spec anchor `specs/hal-engine-config-hooks/spec.md#9`.
- **Spec** citation updated with unit test link.
- **CHANGELOG** entry under `[Unreleased] > Changed` documenting the behavior change.
- **DoD**: all five facets ticked.

Unrelated smell noticed: the `CLAUDE.md` docs reference `afterModelResponse`'s parameter as `usage` — that's now stale with the rename to `totalUsage`. Not acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Aggregate usage across all tool rounds (accumulateUsage helper + orchestrator wiring + type rename + changelog + spec citation)","tdd_next":"acceptance green"}}