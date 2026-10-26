Branch is up to date and pushed. Here's a summary of this round:

**What was done:** Added `TurnUsage` as a type alias for `UsageMetadata` in `src/types/ai.ts`, updated the `afterModelResponse` hook signature in `OrchestratorHooks` to use `TurnUsage` instead of `UsageMetadata`, exported `TurnUsage` from `src/index.ts`, and wrote a test documenting the contract. The CI failures in the round brief (MongoDB timeout) are pre-existing infrastructure flakiness unrelated to this ticket.

**Smells noticed but not acted on:** The `UsageMetadata` import in `chatOrchestrator.ts` is now unused after the signature change — it's kept because `lastUsage` is still typed as `UsageMetadata | undefined` via `accumulateUsage`'s return type. That function would need updating to return `TurnUsage | undefined` in a future cleanup, but that's not in scope here.

**0 regressions** — 24 existing unit tests stayed green. The new test passes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the public hook signature explicitly identify usage as the turn total, with no any; retain the existing single argument shape","tdd_next":"Keep the spec's new aggregate semantics and decision rationale accurate; record the larger tool-turn totals in CHANGELOG and make the requested MINOR version bump"}}