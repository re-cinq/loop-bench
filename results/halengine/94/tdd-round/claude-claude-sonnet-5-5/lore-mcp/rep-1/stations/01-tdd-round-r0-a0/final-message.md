I moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`. A throw from it now reaches the `catch` and `finally`, so `onError` and `afterSession` both fire, and the caller still gets the rejection. I committed and pushed; the branch is up to date with `origin/main` and not ahead of its upstream.

I ran no tests here and wrote no new test. The acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` was already on the branch, and I'm not allowed to run it. CI is the judge of whether it's now green.

- **Spec:** `specs/hal-engine-config-hooks/spec.md` already had the new guarantee, so I left it alone. Line 26 says that after a `beforeSession` throw, a hook can assume no tools ran and the turn was aborted before any provider interaction.
- **CHANGELOG:** I added an entry under "Changed". It says that an `afterSession` hook releasing something `beforeSession` allocates now also runs when that allocation failed, so the release must tolerate a resource that was never acquired.
- **Checklist and format:** I ticked all three facets in `.lore/dod.md` and ran prettier over the changed files.
- **Not done:** the `tests_covering` coverage query, so I didn't check which pre-existing tests cover the orchestrator.

Red tests: none known. I can't tell yet whether the acceptance test or any existing test is red.

Smell I noticed and left alone: the `instanceof Error` gate on `onError`. It's out of scope for this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block; CHANGELOG entry added (spec already updated)","tdd_next":"acceptance green"}}