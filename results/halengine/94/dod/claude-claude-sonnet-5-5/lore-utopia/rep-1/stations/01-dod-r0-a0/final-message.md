I wrote one acceptance test for #94. It fails on the branch today, for the reason the ticket gives.

Strategy is `direct`: `createChatOrchestrator` is a real entry point and the hooks are plain options. The test is in `src/orchestration/beforeSessionFailure.acceptance.test.ts`, with the DoD in `.lore/dod.md`. I ran the test file alone, and the branch is pushed and level with its upstream.

The test makes `beforeSession` throw an `Error`. It expects `processMessage` to reject with that same error and `onError(session, error)` to fire, then `afterSession`. Here is the failure:

```
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● beforeSession failure › rejects with the original error and still fires onError and afterSession for it
    - Expected  - 8
    + Received  + 2
    -   "calls": ["onError", "afterSession"],
    -   "onErrorArgs": ["s1", [Error: allocation failed]],
    +   "calls": [],
    +   "onErrorArgs": [],
        "rejection": [Error: allocation failed],
```

The rejection still reaches the caller. `onError` and `afterSession` never run, which is the claim in the ticket.

**Not done in this pod:**
- I did not add the `([validated by ...])` link to `specs/hal-engine-config-hooks/spec.md`, because the flaw line is the thing the fix replaces. The DoD facets say to link the test when that line is rewritten.
- The DoD also leaves the CHANGELOG entry to the fix.

**Left unpinned on purpose:** the ticket asks for the spec to state what `afterSession` can assume about how much of the turn happened. That is a documentation decision, so I did not write a test for it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}