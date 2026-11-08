### Definition of Done for Ticket #94

The Definition of Done has been recorded in `.lore/dod.md` using the `direct` strategy. An acceptance test has been created in `src/orchestration/chatOrchestrator.acceptance.test.ts` to exercise orchestrator message processing when `beforeSession` throws, verifying that the call rejects to the caller while ensuring `onError` and `afterSession` hooks are invoked.

#### Test Execution & Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession error handling › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 2

      Object {
    -   "afterSessionReceivedId": "s1",
    +   "afterSessionReceivedId": undefined,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorReceived": Object {
    -     "errorMessage": "beforeSession boom",
    -     "sessionId": "s1",
    -   },
    +   "onErrorReceived": undefined,
        "outcome": "beforeSession boom",
      }

      57 |     const outcome = await outcomeOf(orchestrator.processMessage(createSession('hello')));
      58 |
    > 59 |     expect({outcome, onErrorReceived, afterSessionReceivedId, callOrder}).toEqual({
         |                                                                           ^
      60 |       outcome: 'beforeSession boom',
      61 |       onErrorReceived: {sessionId: 's1', errorMessage: 'beforeSession boom'},
      62 |       afterSessionReceivedId: 's1',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:59:75)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.189 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails strictly because `onError` and `afterSession` are bypassed when `beforeSession` throws outside the `try` block. The changes are committed and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}