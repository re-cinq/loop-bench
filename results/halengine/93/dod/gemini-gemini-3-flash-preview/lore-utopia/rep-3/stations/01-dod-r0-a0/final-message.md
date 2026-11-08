The `afterModelResponse` hook now reports accumulated usage across all provider rounds in a turn, rather than just the last round's usage. The hook signature has been updated to receive a `TurnUsage` object, which provides both the total summed tokens and a per-round breakdown, making the reported values unambiguous for consumers who need them for audit or billing purposes.

### Summary of Changes

- **New `TurnUsage` Type:** Defined in `src/types/ai.ts`, carrying a `total: UsageMetadata` sum and a `rounds: (UsageMetadata | undefined)[]` list.
- **Orchestrator Logic:** Updated `chatOrchestrator.ts` to accumulate usage in a `roundsUsage` array throughout the tool-calling loop and calculate the final summary before firing the hook.
- **Spec Update:** Replaced the "out-of-scope" under-counting note in `specs/hal-engine-config-hooks/spec.md` with a new "Measured semantics" statement pinning the accumulated behavior.
- **Changelog:** Added a `Changed` entry to `CHANGELOG.md` with a migration note explaining the structural change.

### Verification Results

I implemented three new acceptance tests and updated two existing orchestrator tests. All tests passed successfully.

```bash
Test Suites: 2 passed, 2 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        0.42 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.test.ts|src/orchestration/usage-reporting.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}