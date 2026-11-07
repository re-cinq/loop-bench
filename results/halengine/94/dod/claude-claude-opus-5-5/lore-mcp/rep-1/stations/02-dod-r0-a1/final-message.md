The Definition of Done for #94 was already committed and pushed by an earlier round (`4d8e098`). I checked it, ran its test, and it is still red for the reason the ticket gives. I changed nothing this round: the branch already matches `origin/main` and its upstream, with nothing to push.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` is the real entry point and already takes `hooks`. The test calls it with a real provider and real hooks, and no mocks or stand-ins.

**Acceptance test:** `src/orchestration/beforeSessionFailure.acceptance.test.ts`. It checks three things when `beforeSession` throws:
- the caller still gets the same error object as a rejection;
- `onError(session, error)` then runs with the same session and error;
- `afterSession(session)` then runs after it.

The spec statement in `specs/hal-engine-config-hooks/spec.md` (under "A failing `beforeSession`") links to it at `#L22`, which still matches the test's line.

Red bar, from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionFailure.acceptance.test.ts`:

```
● a beforeSession hook that throws › rejects to the caller unchanged, after onError and then afterSession have both run for that throw

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  1

      Object {
    -   "calls": Array [
    -     Object {
    -       "hook": "onError",
    -       "sameError": true,
    -       "sameSession": true,
    -     },
    -     Object {
    -       "hook": "afterSession",
    -       "sameSession": true,
    -     },
    -   ],
    +   "calls": Array [],
        "rejectedWithTheThrownError": true,
      }
Tests:       1 failed, 1 total
```

The rejection already reaches the caller correctly; the test fails only because neither hook runs. That is the ticket's own claim: "Neither `onError` nor `afterSession` runs."

`.lore/dod.md` leaves the rest to the implementing round as facets:
- move the `beforeSession` call (`chatOrchestrator.ts:91`) inside the `try`;
- decide whether `afterSession` must be able to tell "never started" from "finished", and record the answer in the spec;
- remove the recorded-flaw line from the spec and re-anchor the links it shifts;
- add a CHANGELOG entry;
- keep the existing tests green without editing them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}