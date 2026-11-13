I wrote one red acceptance test for #94 and pushed it with the spec update and `.lore/dod.md`. The branch `loop-bench/94` is in sync with its upstream and already contains `origin/main`.

**Strategy: `direct`.** The test goes in through `createChatOrchestrator(...).processMessage` with a real provider and no test doubles. Its `beforeSession` hook throws, and the test checks three things:
- The caller's promise rejects with that same error object.
- `onError` receives the session and that error.
- `afterSession` fires after `onError`, and no other hook runs.

It fails because neither hook fires. The rejection part already passes, which matches the first acceptance criterion ("unchanged from today"):

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession failure › rejects with the beforeSession error after firing onError with it and then afterSession
    - Expected  - 4
    + Received  + 2
      Object {
        "calls": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorGotSameError": true,
    -   "onErrorGotSession": true,
    +   "onErrorGotSameError": false,
    +   "onErrorGotSession": false,
        "rejectedWithSameError": true,
      }
Tests:       1 failed, 1 total
```

**Spec change (`specs/hal-engine-config-hooks/spec.md`):**
- I removed the line recording the old flaw and changed "three properties" to "two".
- I added the new guarantee, linked to the test. It also answers the ticket's open question: `afterSession` does fire after a failed `beforeSession`, so it can't assume any of the turn ran. A deployer who needs to tell "never allocated" from "allocated and finished" records the allocation in `beforeSession` and checks for it in `afterSession`.
- I left the `Status` row alone. Both link checkers pass.

**Left for the implementing round (listed as Facets in `.lore/dod.md`):**
- Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`.
- Keep `chatOrchestrator.test.ts` and `config.test.ts` green and unedited.
- Update the spec's `#L148` and `#L150` links, which will shift once the call moves.
- Add a CHANGELOG entry for existing consumers.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}