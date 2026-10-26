Round for facet 1 is committed and pushed to `loop-bench/94` as `df9a22b`. The branch is in sync with its upstream, and the merge with `origin/main` was a no-op.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: the `beforeSession` call moved inside the `try`, as the first statement. A throw now reaches the existing `catch` (which fires `onError` and rethrows) and the `finally` (which fires `afterSession` and saves). The non-throwing path is unchanged in order.
- `.lore/dod.md`: ticked the "Move `beforeSession` inside the `try`" facet.
- Prettier check passed on the changed source file.

**Test status**
- No tests ran in this pod. The acceptance test was not run locally, per the round rules. CI judges the push.
- No new test was written this round. The red test was the existing acceptance test from the previous round, so this round's green step was the code move alone.
- The lore trace query was refused with HTTP 403 (the token lacks `read` scope), so I found covering tests by grep instead. The test files that import `chatOrchestrator` are `chatOrchestrator.test.ts`, `sessionSave.test.ts`, `toolBudget.test.ts`, and several transport tests.
- I have not read a CI verdict for this push, so I can't say yet how many red tests were mine or how many were regressions.

**Still open (next round)**
- Facet 2: update `specs/hal-engine-config-hooks/spec.md` to replace the recorded-flaw line with the new guarantee, and state what a hook can assume about how much of the turn ran. This includes the open question of whether `afterSession` should be able to tell "never started" from "finished".
- Facet 3: add the CHANGELOG entry for what changes for an existing consumer.

**Noticed, not touched**
- The `instanceof Error` gate on `onError` is out of scope per the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}