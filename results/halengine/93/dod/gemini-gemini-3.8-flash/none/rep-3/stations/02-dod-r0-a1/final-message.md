The Definition of Done for Ticket #93 has been defined and verified with executable acceptance tests in `src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts`.

### Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts`:

```
FAIL src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts
  ● report usage across every tool round › reports usage covering every provider call in a turn driven through two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 75,
    -   "outputTokens": 35,
    -   "totalTokens": 110,
    +   "inputTokens": 40,
    +   "outputTokens": 18,
    +   "totalTokens": 58,
      }

      70 |     await orchestrator.processMessage(createSession('run tools'));
      71 |
    > 72 |     expect(receivedUsage).toEqual({
         |                           ^
      73 |       inputTokens: 75,
      74 |       outputTokens: 35,
      75 |       totalTokens: 110,

      at Object.<anonymous> (src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts:72:27)

  ● report usage across every tool round › accumulates usage from reporting rounds when some rounds report no usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 40,
    -   "outputTokens": 15,
    -   "totalTokens": 55,
    +   "inputTokens": 30,
    +   "outputTokens": 10,
    +   "totalTokens": 40,
      }

      114 |     await orchestrator.processMessage(createSession('run tools with missing usage'));
      115 |
    > 116 |     expect(receivedUsage).toEqual({
          |                           ^
      117 |       inputTokens: 40,
      118 |       outputTokens: 15,
      119 |       totalTokens: 55,

      at Object.<anonymous> (src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts:116:27)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.267 s, estimated 1 s
Ran all test suites matching src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}