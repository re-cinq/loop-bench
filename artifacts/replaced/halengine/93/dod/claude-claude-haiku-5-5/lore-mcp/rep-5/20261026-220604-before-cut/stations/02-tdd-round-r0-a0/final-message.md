Branch is pushed and up to date. Summary:

- **Red**: `accumulateUsage` test in `orchestratorHelpers.test.ts` failed (function didn't exist)
- **Green**: Added `accumulateUsage` to `orchestratorHelpers.ts`; changed `chatOrchestrator.ts` to use it instead of `lastUsage = outcome.usage ?? lastUsage`; updated spec and changelog
- **Refactor**: Nothing to refactor; the change is minimal

Unrelated smells noticed but not touched: the `UsageMetadata` type comment in `OrchestratorHooks` could clarify it receives a sum (DoD Type facet) — that's left for CI to catch via typecheck.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Green: accumulate usage per round in chatOrchestrator.ts (sum the rounds that report; undefined only when none did)","tdd_next":"Type: document at OrchestratorHooks that the usage argument is a sum, not the last round"}}