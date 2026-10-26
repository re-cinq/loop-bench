Branch is up to date, nothing to merge. The push landed cleanly.

**Round summary:**

- **Facet closed:** Make `afterModelResponse` argument's total-turn meaning explicit in the public signature — exported `TurnUsage = UsageMetadata` named alias, renamed the parameter to `totalUsage?: TurnUsage` in `OrchestratorHooks`, added spec citation in `specs/hal-engine-config-hooks/spec.md`, and bumped version to `0.4.0` (MINOR bump for the behaviour change).
- **Also ticked:** "Keep existing no-tool behavior pinned" (test unedited, behavior unchanged) and "Keep one summed usage argument + MINOR version bump" (version now `0.4.0`).
- **Red bar note:** The `import type {TurnUsage}` test passes immediately in jest because `isolatedModules: true` erases type-only imports; the real red bar is `tsc --noEmit` in CI, which would catch a missing export. Adding the export makes it unambiguously green for both.
- **MongoDB CI failures:** The `mongoRedaction.test.ts` timeouts are pre-existing infrastructure failures — our branch touches no MongoDB files (`git diff origin/main..HEAD` shows zero changes there). They appear as a flaky/environmental failure unrelated to this ticket.
- **0 regressions written this round; 0 tests written by us are failing.**
- **Unrelated smell noted:** `accumulateUsage` in `orchestratorHelpers.ts` has no test for `accumulateUsage(a, b).totalTokens === a.totalTokens + b.totalTokens` independently of `inputTokens + outputTokens` — a future test could pin that the `totalTokens` field is summed directly, not recomputed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make afterModelResponse totalUsage parameter explicit as TurnUsage type + version bump to 0.4.0","tdd_next":"acceptance green"}}