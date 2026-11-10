Defined the Definition of Done for Ticket #95 using strategy `direct`.

### Failure Output

Command run:
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts
```

Output:
```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejections › calls onError with a wrapped Error when a rejection is not an Error and propagates the raw value unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  +  9

      Object {
        "objectResult": Object {
    -     "calls": 1,
    -     "cause": Object {
    -       "detail": "custom error",
    -       "status": 500,
    -     },
    -     "isError": true,
    +     "calls": 0,
    +     "cause": "no error received",
    +     "isError": false,
          "rejected": Object {
            "detail": "custom error",
            "status": 500,
          },
        },
        "stringResult": Object {
    -     "calls": 1,
    -     "cause": "string failure",
    -     "isError": true,
    +     "calls": 0,
    +     "cause": "no error received",
    +     "isError": false,
          "rejected": "string failure",
        },
        "undefinedResult": Object {
    -     "calls": 1,
    -     "cause": undefined,
    -     "isError": true,
    +     "calls": 0,
    +     "cause": "no error received",
    +     "isError": false,
          "rejected": undefined,
        },
      }

      72 |     const undefinedResult = await observeRejection(undefinedRejection);
      73 |
    > 74 |     expect({stringResult, objectResult, undefinedResult}).toEqual({
         |                                                           ^
      75 |       stringResult: {
      76 |         calls: 1,
      77 |         isError: true,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:74:59)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.261 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}