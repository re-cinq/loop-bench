## Definition of Done: Ticket #93

### Triage
**Strategy: `direct`** — The seam already exists via `OrchestratorHooks.afterModelResponse` in `createChatOrchestrator`. Acceptance tests drive turns through multiple tool rounds using scripted providers with known, distinct token counts and assert that `afterModelResponse` receives the aggregated token usage across all provider rounds rather than only the final round's usage.

### Test Execution & Failure Output

Running `npm test -- src/orchestration/afterModelResponseUsage.acceptance.test.ts`:

```
FAIL src/orchestration/afterModelResponseUsage.acceptance.test.ts
  ● afterModelResponse usage aggregation across tool rounds › reports usage summed across every provider call in a turn with multiple tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 65,
    -   "outputTokens": 25,
    -   "totalTokens": 90,
    +   "inputTokens": 35,
    +   "outputTokens": 12,
    +   "totalTokens": 47,
      }

      81 |     await orchestrator.processMessage(createSession('Find alpha and beta'));
      82 |
    > 83 |     expect(receivedUsage).toEqual({inputTokens: 65, outputTokens: 25, totalTokens: 90});
         |                           ^
      84 |   });
      85 |
      86 |   it('accumulates usage across tool rounds when some rounds omit usage', async () => {

      at Object.<anonymous> (src/orchestration/afterModelResponseUsage.acceptance.test.ts:83:27)

  ● afterModelResponse usage aggregation across tool rounds › accumulates usage across tool rounds when some rounds omit usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "omitted": undefined,
        "partial": Object {
    -     "inputTokens": 35,
    -     "outputTokens": 15,
    -     "totalTokens": 50,
    +     "inputTokens": 25,
    +     "outputTokens": 10,
    +     "totalTokens": 35,
        },
      }

      142 |     await omittedOrchestrator.processMessage(createSession('Find epsilon'));
      143 |
    > 144 |     expect({partial: receivedPartialUsage, omitted: receivedOmittedUsage}).toEqual({
          |                                                                            ^
      145 |       partial: {inputTokens: 35, outputTokens: 15, totalTokens: 50},
      146 |       omitted: undefined,
      147 |     });

      at Object.<anonymous> (src/orchestration/afterModelResponseUsage.acceptance.test.ts:144:76)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.272 s, estimated 1 s
Ran all test suites matching src/orchestration/afterModelResponseUsage.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}