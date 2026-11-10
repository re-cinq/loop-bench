Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, added the acceptance test in `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`, and updated `specs/hal-engine-config-hooks/spec.md` with the normative guarantee and traceability citation.

Red bar output (`NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`):
```text
FAIL src/orchestration/onErrorNonErrorRejection.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  + 12

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeMatches": true,
    -     "hasCauseKey": true,
    -     "isErrorInstance": true,
    +     "causeMatches": false,
    +     "hasCauseKey": false,
    +     "isErrorInstance": false,
          "label": "string",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeMatches": true,
    -     "hasCauseKey": true,
    -     "isErrorInstance": true,
    +     "causeMatches": false,
    +     "hasCauseKey": false,
    +     "isErrorInstance": false,
          "label": "plainObject",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeMatches": true,
    -     "hasCauseKey": true,
    -     "isErrorInstance": true,
    +     "causeMatches": false,
    +     "hasCauseKey": false,
    +     "isErrorInstance": false,
          "label": "undefined",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
      ]

      65 |     );
      66 |
    > 67 |     expect(observed).toEqual(
         |                      ^
      68 |       cases.map(({label}) => ({
      69 |         label,
      70 |         onErrorCalls: 1,

      at Object.<anonymous> (src/orchestration/onErrorNonErrorRejection.acceptance.test.ts:67:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}