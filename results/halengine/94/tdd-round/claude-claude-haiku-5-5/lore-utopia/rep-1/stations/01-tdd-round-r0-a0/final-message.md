Facet 1 is done: `beforeSession` now runs inside the `try`, so a throw reaches `onError` and `afterSession`. The commit is pushed and the branch is in sync with its upstream. I did not run the acceptance test, since the rules say CI runs it.

- **Test written this round:** `called when beforeSession throws` in `src/orchestration/chatOrchestrator.test.ts`. It was red before the change and green after. The whole file passes, 24 of 24.
- **Code change:** in `src/orchestration/chatOrchestrator.ts`, the `beforeSession` call moved to the first line inside the `try`.
- **Checklist:** `.lore/dod.md` ticks the "move `beforeSession`" facet. The spec and CHANGELOG facets are still open for the next round.
- **Merge:** `origin/main` merged in cleanly with nothing to add, and the branch is not ahead of its upstream.
- **Formatting:** prettier was run over the changed files and left them unchanged.
- **Not run:** I did not run the acceptance test or any build, typecheck, lint or formatter check beyond prettier.
- **Lore unavailable:** `lore-query-trace` and `lore_get_ci_failures` both returned 403, so I had no coverage map and no CI verdict. There is no `round-brief.md`, so there were no CI findings to fix.
- **Regressions:** none observed locally. Red tests I wrote: 1 (now green). Regressions I caused: 0 known.
- **Attribution gap:** the commit message is missing the `Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>` trailer the attribution reminder asks for. It is already pushed, so fixing it means a force-push. I have not done that without your go-ahead.

Out of scope and not touched: the `instanceof Error` gate on `onError`, which the spec already notes at line 27.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}