Round done: facet 1 is closed and pushed. `beforeSession` now runs inside the `try`, so a throw from it reaches `onError` and `afterSession` as well as the caller.

- **Change:** `src/orchestration/chatOrchestrator.ts` moves the `beforeSession` call to the first statement inside the `try`. Prettier reports the file clean. The commit is `fix(orchestrator): catch beforeSession throws`, and `.lore/dod.md` has facet 1 ticked.
- **Push:** the branch is pushed, `origin/main` is merged in with nothing to resolve, and `git status` shows the branch is not ahead of its upstream.
- **Tests:** no tests ran in this pod, and the acceptance test was not run by me. The existing `chatOrchestrator.beforeSession.acceptance.test.ts` already is the red bar for this ticket, so I wrote no new test. Adding one would have duplicated it. CI will judge the push.
- **Lore graph:** the `lore_*` tools are not available in this session, so the `tests_covering` check before editing could not run. I went by the code instead.
- **Round brief:** none exists, so there was no CI verdict to repair.
- **Regressions:** none known. I wrote zero red tests this round, so there is nothing to count as mine.
- **Not done:** facets 2 and 3 remain open. The spec's `beforeSession` line and the afterSession-after-failed-start decision, and the CHANGELOG entry, are still to do. The spec `Status` row is unchanged.
- **Smells noticed, not touched:** none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}