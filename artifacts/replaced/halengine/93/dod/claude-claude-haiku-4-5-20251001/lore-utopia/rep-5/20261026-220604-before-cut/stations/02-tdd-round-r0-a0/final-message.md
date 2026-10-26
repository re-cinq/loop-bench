Branch is clean and pushed. 

**Summary of this round:**
- Added `accumulateUsage` to `orchestratorHelpers.ts` — sums `inputTokens`, `outputTokens`, `totalTokens` across rounds; returns `undefined` when both sides are absent
- Replaced `lastUsage = outcome.usage ?? lastUsage` with `accumulateUsage(lastUsage, outcome.usage)` in `chatOrchestrator.ts`
- Wrote 4 unit tests for `accumulateUsage` in `orchestratorHelpers.test.ts` (all GREEN)
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the under-counting note with the new accumulated behaviour
- Ticked 2 DoD facets (accumulate usage, wire into hook)

No unrelated smells were acted on. The remaining DoD facets (type-signature unambiguity note, CHANGELOG/version bump) are for subsequent rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across rounds via accumulateUsage helper, wire into afterModelResponse","tdd_next":"verify type signature makes sum unambiguous; add CHANGELOG entry and MINOR version bump"}}