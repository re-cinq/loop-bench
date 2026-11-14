Added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked it to the updated guarantee in `specs/hal-engine-config-hooks/spec.md`, and recorded the `direct` Definition of Done in `.lore/dod.md` (pushed in commit `d21de96`).

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejections › wraps string, plain-object, and undefined rejections for onError and rethrows each unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 30
    + Received  +  3

    @@ -1,54 +1,27 @@
      Object {
        "plainObject": Object {
    -     "onErrorCalls": Array [
    -       Object {
    -         "cause": Object {
    -           "code": "UPSTREAM_503",
    -           "detail": "bad gateway",
    -         },
    -         "hasCauseProperty": true,
    -         "isErrorInstance": true,
    -         "preservesCauseIdentity": true,
    -         "sessionId": "s1",
    -       },
    -     ],
    +     "onErrorCalls": Array [],
          "preservesRejectedIdentity": true,
          "settlement": Object {
            "reason": Object {
              "code": "UPSTREAM_503",
              "detail": "bad gateway",
            },
            "status": "rejected",
          },
        },
        "string": Object {
    -     "onErrorCalls": Array [
    -       Object {
    -         "cause": "upstream gateway timeout",
    -         "hasCauseProperty": true,
    -         "isErrorInstance": true,
    -         "preservesCauseIdentity": true,
    -         "sessionId": "s1",
    -       },
    -     ],
    +     "onErrorCalls": Array [],
          "preservesRejectedIdentity": true,
          "settlement": Object {
            "reason": "upstream gateway timeout",
            "status": "rejected",
          },
        },
        "undefinedValue": Object {
    -     "onErrorCalls": Array [
    -       Object {
    -         "cause": undefined,
    -         "hasCauseProperty": true,
    -         "isErrorInstance": true,
    -         "preservesCauseIdentity": true,
    -         "sessionId": "s1",
    -       },
    -     ],
    +     "onErrorCalls": Array [],
          "preservesRejectedIdentity": true,
          "settlement": Object {
            "reason": undefined,
            "status": "rejected",
          },

      32 |     };
      33 |
    > 34 |     expect(outcomes).toEqual({
         |                      ^
      35 |       string: expectedWrappedRejection('upstream gateway timeout'),
      36 |       plainObject: expectedWrappedRejection(upstreamFailure),
      37 |       undefinedValue: expectedWrappedRejection(undefined),

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:34:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.316 s
Ran all test suites within paths "src/orchestration/chatOrchestrator.acceptance.test.ts".
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}