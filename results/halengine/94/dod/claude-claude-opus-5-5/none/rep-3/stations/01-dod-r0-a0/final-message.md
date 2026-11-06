I wrote two acceptance tests for #94 and both fail today for the reason the ticket gives. They're committed and pushed to `loop-bench/94`, which is level with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** The tests call the real entry point, `createChatOrchestrator(...).processMessage`, with a `beforeSession` hook that throws. They use a real in-file provider and no mocks.

**Tests** (in `src/orchestration/beforeSessionFailure.acceptance.test.ts`):
1. **reaches onError with the session and the thrown error, then afterSession, and still rejects the caller.** The caller still gets the same error, and `onError(session, error)` then `afterSession(session)` both run.
2. **lets afterSession release what beforeSession allocated before it threw.** Something reserved in `beforeSession` and released in `afterSession` doesn't leak when `beforeSession` throws.

**Red bar** (`npx jest src/orchestration/beforeSessionFailure.acceptance.test.ts`):
```
    +   "calls": Array [],
        "rejection": [Error: span allocation failed],
...
  ● a beforeSession hook that throws › lets afterSession release what beforeSession allocated before it threw
    -   "stillHeld": Array [],
    +   "stillHeld": Array [
    +     "s1",
    +   ],
Tests:       2 failed, 2 total
```
The caller still sees the rejection, so that part already behaves as the ticket wants. What's missing is that neither `onError` nor `afterSession` runs, which is the ticket's claim.

**Spec:** I added a "When beforeSession throws" section to `specs/hal-engine-config-hooks/spec.md` with both statements linked to the tests. The repo's citation checks (`check-spec-anchor-names` and `check-spec-links`) both pass. I didn't change the `Status` row.

**Left for the implementing round** (listed in `.lore/dod.md`):
- Move the `beforeSession` call inside the `try`.
- Remove the line in the spec that records the old flaw, and correct its "These three properties" count.
- Decide what `afterSession` can assume about how much of the turn ran, and say so in the spec.
- Add a CHANGELOG entry for existing users.

**One thing to watch:** the existing tests in `chatOrchestrator.test.ts` and `config.test.ts` must still pass without edits, which is how the ticket checks that a `beforeSession` that doesn't throw behaves as before.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}