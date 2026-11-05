I moved the `beforeSession` call inside the `try` block, so a throw from it now reaches the `catch` and `finally`. That should fire `onError` and `afterSession` while the caller still gets the same rejection. No tests ran here. The acceptance test was already red and off-limits to run, so CI is the judge. The change is committed and pushed. The `origin/main` merge produced nothing new, and the branch is not ahead of its upstream.

- **Code:** the one-line move is in `src/orchestration/chatOrchestrator.ts`. I added no new test, because the acceptance test already pins this facet.
- **CHANGELOG:** a "Changed" entry says what changes for an existing consumer. It says `afterSession` can now run for a session whose `beforeSession` failed. It also says a hook that releases something allocated in `beforeSession` must tolerate it never having been allocated.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` already stated the new guarantee on this branch, so I left it alone.
- **`.lore/dod.md`:** all three facets are ticked.

Red tests: none of mine and no regressions that I know of, since no CI verdict was available at the start of the round.

I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts, plus CHANGELOG entry (spec already updated)","tdd_next":"acceptance green"}}