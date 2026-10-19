I have added the failing acceptance tests and updated the specification document.

The tests run the full `chatOrchestrator` behavior using a mocked `AIProvider`, testing if the usage accumulated across all provider calls correctly.
I created the tests in a new file `src/orchestration/turn-usage.acceptance.test.ts`. Running the tests produces the expected failures for the accumulated values:

```
FAIL src/orchestration/turn-usage.acceptance.test.ts
  ● Turn Usage Reporting › reports usage covering every provider call in a multi-round turn

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 45,
    -   "outputTokens": 17,
    -   "totalTokens": 62,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }

      64 |     await orchestrator.processMessage(createSession('ask'));
      65 |
    > 66 |     expect(seenUsage).toEqual({

  ● Turn Usage Reporting › accumulates usage safely when some rounds report no usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 15,
    -   "outputTokens": 7,
    -   "totalTokens": 22,
    +   "inputTokens": 5,
    +   "outputTokens": 5,
    +   "totalTokens": 10,
      }

      92 |     await orchestrator.processMessage(createSession('ask'));
      93 |
    > 94 |     expect(seenUsage).toEqual({
```

I also:
* Created `.lore/dod.md` to map out the strategy, the tests, and the pending actions (facets/out of scopes).
* Updated the `specs/hal-engine-config-hooks/spec.md` with the newly defined statement representing this change, and anchored the new lines from the test suite using `scripts/repoint-spec-anchors.mjs`. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}