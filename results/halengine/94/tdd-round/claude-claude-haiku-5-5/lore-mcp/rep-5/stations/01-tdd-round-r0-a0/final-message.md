Round for facet 1 is done and pushed. Branch `loop-bench/94` is in sync with its upstream after merging `origin/main` (no conflicts).

**What changed**
- `src/orchestration/chatOrchestrator.ts`: `beforeSession` moved inside the `try` in `processMessageStream`, so a throw reaches the existing `catch` (`onError`) and `finally` (`afterSession`). The non-throwing path is unchanged in order.
- `.lore/dod.md`: ticked "Move `beforeSession` inside the `try` block".
- Formatted with prettier (no changes needed). Committed and pushed.

**Tests**
- I wrote no new test this round. The pre-existing acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is the red for this facet. I did not run it, per the brief.
- **No tests were run in this pod.** CI is the judge.
- Red tests I wrote: 0. Regressions: unknown until CI reports.
- The lore trace query failed with HTTP 403 (token lacks `read` scope), so I checked coverage by grep instead. The only tests touching the orchestrator are `chatOrchestrator.test.ts`, `sessionSave.test.ts`, `toolBudget.test.ts`, and the transport tests.

**Remaining facets (not done this round)**
- Facet 2: `specs/hal-engine-config-hooks/spec.md`. Line 26 already reads as if the new guarantee is recorded, and it cites the acceptance test. I did not edit it. It still needs checking against the ticket's requirement to state what a hook can assume about how much of the turn happened, and whether the `| Status |` row needs changing.
- Facet 3: CHANGELOG entry for existing consumers.

**Unrelated smells noticed, not touched**
- The `instanceof Error` gate on `onError` (already out of scope per the ticket).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}