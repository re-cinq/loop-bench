The acceptance test for issue #94 has been created and verified red against the current implementation.

### Actual Failure Output

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession throws › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
    -   "afterSessionMatches": true,
    +   "afterSessionMatches": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorMatches": true,
    +   "onErrorMatches": false,
        "outcome": "beforeSession boom",
      }

      62 |       onErrorMatches: capturedError === beforeSessionError && capturedOnErrorSession === session,
      63 |       afterSessionMatches: capturedAfterSession === session && capturedAfterSession?.entries.length === 1,
    > 64 |     }).toEqual({
         |        ^
      65 |       outcome: 'beforeSession boom',
      66 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      67 |       onErrorMatches: true,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:64:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.324 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}