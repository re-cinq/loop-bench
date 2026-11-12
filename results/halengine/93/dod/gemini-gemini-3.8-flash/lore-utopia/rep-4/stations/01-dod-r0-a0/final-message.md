### Acceptance Tests & Definition of Done for Ticket #93

**Strategy: `direct`** — The seam already exists on `createChatOrchestrator({hooks: {afterModelResponse}})`. The acceptance tests drive multi-round turns through the real `processMessage` entry point using a scripted provider and assert on the token counts reported to `afterModelResponse`.

The acceptance tests were added in `src/orchestration/chatOrchestrator.acceptance.test.ts` and validate the statements added to `specs/hal-engine-config-hooks/spec.md`. The Definition of Done was committed to `.lore/dod.md` and pushed to `origin/loop-bench/93`.

### Actual Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator acceptance: multi-round usage reporting › reports the sum of three provider calls when a turn runs two tool rounds

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

      88 |     await orchestrator.processMessage(createSession('run tools'));
      89 |
    > 90 |     expect(seenUsage).toEqual({
         |                       ^
      91 |       inputTokens: 600,
      92 |       outputTokens: 60,
      93 |       totalTokens: 660,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:90:23)

  ● ChatOrchestrator acceptance: multi-round usage reporting › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

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

      150 |     await noneOrchestrator.processMessage(createSession('none'));
      151 |
    > 152 |     expect({partial: seenPartial, none: seenNone}).toEqual({
          |                                                    ^
      153 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      154 |       none: undefined,
      155 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:152:52)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.252 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}