Facet 1 is closed and pushed to `loop-bench/94`. The branch is level with its upstream, and the merge with `origin/main` was a no-op.

**What changed:** In `src/orchestration/chatOrchestrator.ts`, the `beforeSession` call now sits inside the `try`, as the first statement. A throw from it now reaches the existing `catch` (which calls `onError` and rethrows) and the `finally` (which calls `afterSession` and saves). `.lore/dod.md` has the facet ticked.

**Tests:** No test was run in this pod, and I wrote no new test this round. The acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` already defines the behaviour, and I did not run it, per the brief. I skipped a duplicate test because the change is a one-line move that the existing acceptance test already exercises. CI is the judge. There was no `round-brief.md`, so I have no CI verdict on the previous push and cannot say how many red tests were mine versus regressions.

**Not done (still unchecked in `dod.md`):**
- Facet 2: the `specs/hal-engine-config-hooks/spec.md` update. This must record the new guarantee and state what a hook can assume about `afterSession` after a failed `beforeSession`, replacing the recorded-flaw line.
- Facet 3: the CHANGELOG entry for existing consumers.

**Other notes:**
- `lore-query-trace` returned HTTP 403 (the token lacks `read` scope), so I found covering tests by grepping imports instead. Several test files reference the orchestrator, including `chatOrchestrator.test.ts` and `toolBudget.test.ts`. CI should run them.
- The ticket's `npm run` checks (build, test, typecheck, eslint, prettier:check) were not run here, per the pod constraints. Only prettier was run, on the one file I changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}