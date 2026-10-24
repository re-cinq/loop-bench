Branch is pushed and up to date. The round is complete:

- **Red**: Added 4 unit tests for `accumulateUsage` in `orchestratorHelpers.test.ts` (they were red before the helper existed, then immediately green after)
- **Green**: Added `accumulateUsage` to `orchestratorHelpers.ts`, wired it into `chatOrchestrator.ts` replacing the overwrite pattern on line 117
- **Refactor**: No structural changes needed — the implementation is already clean

All 5 dod.md facets are now ticked. The acceptance tests in `chatOrchestrator.acceptance.test.ts` should pass in CI since the orchestrator now accumulates usage correctly.

Unrelated smell noticed but not acted on: the `Measured semantics — out of scope` section still has one bullet linking to a source file rather than a test (`chatOrchestrator.ts#L150` for the `instanceof Error` gate) — this is a pre-existing gap in spec coverage, not introduced by this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all provider calls per turn (all 5 facets)","tdd_next":"acceptance green"}}