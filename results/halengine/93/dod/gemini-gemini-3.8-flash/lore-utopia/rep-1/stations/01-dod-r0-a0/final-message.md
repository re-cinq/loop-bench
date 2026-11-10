## Summary of Changes

To define the Definition of Done for ticket **#93: "Report usage across every tool round, not just the last"**, we applied the **`direct`** triage strategy:
- `createChatOrchestrator` already supports lifecycle hooks (`afterModelResponse`) and scripted providers without requiring new seams or wrappers.
- Created `src/orchestration/chatOrchestrator.acceptance.test.ts` with two acceptance tests asserting that `afterModelResponse` receives the summed usage of all provider calls across tool rounds, and properly handles partial reporting (counting rounds that reported without resulting in `undefined`/`NaN`, while reporting `undefined` when no round reported usage).
- Updated `specs/hal-engine-config-hooks/spec.md` to remove the out-of-scope under-counting bullet and add the `## Usage reported to afterModelResponse` section with citations to the acceptance tests and existing single-round test.
- Created `.lore/dod.md` documenting the central claim, strategy, acceptance criteria, facets, and out-of-scope boundaries.
- Committed and pushed to `origin/loop-bench/93`.

## Test Execution Output

Running `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator usage across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,
      }

      81 |     await orchestrator.processMessage(createSession('question'));
      82 |
    > 83 |     expect(seen).toEqual({inputTokens: 600, outputTokens: 60, totalTokens: 660});
         |                  ^
      84 |   });
      85 |
      86 |   it('counts the rounds that reported usage when one round reports none, and reports nothing when no round did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:83:18)

  ● ChatOrchestrator usage across tool rounds › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "none": undefined,
        "partial": Object {
    -     "inputTokens": 12,
    -     "outputTokens": 3,
    -     "totalTokens": 15,
    +     "inputTokens": 5,
    +     "outputTokens": 1,
    +     "totalTokens": 6,
        },
      }

      129 |     await noneOrchestrator.processMessage(createSession('second question'));
      130 |
    > 131 |     expect({partial: seenPartial, none: seenNone}).toEqual({
          |                                                    ^
      132 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      133 |       none: undefined,
      134 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:131:52)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.256 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}