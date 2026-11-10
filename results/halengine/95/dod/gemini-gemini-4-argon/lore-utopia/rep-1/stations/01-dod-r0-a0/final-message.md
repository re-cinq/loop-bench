Defined the Definition of Done for `#95` using the `direct` strategy, added the red acceptance test in `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`, linked it in `specs/hal-engine-config-hooks/spec.md`, and recorded the triage in `.lore/dod.md`.

### Failure Output

```
FAIL src/orchestration/onErrorNonErrorRejection.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    +     "causeIsOriginal": false,
    +     "isError": false,
          "label": "string",
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    +     "causeIsOriginal": false,
    +     "isError": false,
          "label": "object",
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    +     "causeIsOriginal": false,
    +     "isError": false,
          "label": "undefined",
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
        },
      ]

      60 |     }
      61 |
    > 62 |     expect(outcomes).toEqual([
         |                      ^
      63 |       {
      64 |         label: 'string',
      65 |         onErrorCallCount: 1,

      at Object.<anonymous> (src/orchestration/onErrorNonErrorRejection.acceptance.test.ts:62:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}