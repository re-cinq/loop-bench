I have defined the acceptance test for Ticket #95 in `src/orchestration/chatOrchestrator.acceptance.test.ts`, updated `specs/hal-engine-config-hooks/spec.md` with the new guarantee and traceability link, and recorded the triage and definition of done in `.lore/dod.md`.

### Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejection handling › wraps a non-Error rejection in an Error preserving its cause and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  8

      Array [
        Object {
          "callerRejection": "provider failed",
    -     "cause": "provider failed",
    -     "isErrorInstance": true,
    +     "cause": undefined,
    +     "isErrorInstance": false,
          "label": "string",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
          "threw": true,
        },
        Object {
          "callerRejection": Object {
            "detail": "upstream error",
            "status": 500,
          },
    -     "cause": Object {
    -       "detail": "upstream error",
    -       "status": 500,
    -     },
    -     "isErrorInstance": true,
    +     "cause": undefined,
    +     "isErrorInstance": false,
          "label": "plain object",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
          "threw": true,
        },
        Object {
          "callerRejection": undefined,
          "cause": undefined,
    -     "isErrorInstance": true,
    +     "isErrorInstance": false,
          "label": "undefined",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
          "threw": true,
        },
      ]

      72 |     }
      73 |
    > 74 |     expect(results).toEqual([
         |                     ^
      75 |       {
      76 |         label: 'string',
      77 |         onErrorCalls: 1,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:74:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.201 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails precisely because `onError` is gated on `error instanceof Error` in `src/orchestration/chatOrchestrator.ts` and drops rejections that are strings, plain objects, or `undefined`.

The changes have been formatted with Prettier, committed to `loop-bench/95`, and pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}