The Definition of Done for ticket #95 has been established using strategy `direct`.

### Acceptance Test
The executable acceptance test is in `src/orchestration/chatOrchestrator.acceptance.test.ts` and validates the updated specification statement in `specs/hal-engine-config-hooks/spec.md`. It verifies that when a provider rejects with a string, plain object, or `undefined`:
1. `onError` is called once with an `Error` instance whose `cause` is the original rejection value.
2. The caller still receives the original rejection value unchanged.

### Failure Output
Running `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

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

      62 |     }
      63 |
    > 64 |     expect(results).toEqual([
         |                     ^
      65 |       {label: 'string', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},
      66 |       {label: 'object', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},
      67 |       {label: 'undefined', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:64:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.209 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails precisely because `error instanceof Error` skips `onError` when the rejection is not an `Error` instance (`onErrorCallCount: 0`). The branch is up to date with `origin/main` and all commits are pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}