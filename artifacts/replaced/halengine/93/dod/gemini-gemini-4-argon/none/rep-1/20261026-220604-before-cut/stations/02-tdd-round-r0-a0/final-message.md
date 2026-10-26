Pushed and up to date. Branch is not ahead of upstream.

**Summary of the round:**

- **RED**: Added 3 failing tests for `accumulateUsage` in `orchestratorHelpers.test.ts` (import failed — function didn't exist)
- **GREEN**: Added `accumulateUsage(accumulated, next)` to `orchestratorHelpers.ts`; changed line 117 of `chatOrchestrator.ts` from `outcome.usage ?? lastUsage` to `accumulateUsage(lastUsage, outcome.usage)`. All 7 helper tests and 24 orchestrator tests pass.
- **Refactor**: No structural changes needed — the extracted helper is already clean.
- **Also**: Added CHANGELOG entry for the behaviour change; ticked all 3 DoD facets.

No unrelated smells acted on. One out-of-scope item noted in the DoD (`onError instanceof Error` gate) — left untouched.

Tests written: 3 (all mine). Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across every provider call (all three DoD facets)","tdd_next":"acceptance green"}}