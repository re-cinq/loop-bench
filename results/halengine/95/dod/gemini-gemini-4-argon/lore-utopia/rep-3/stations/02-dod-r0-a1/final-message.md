Defined the Definition of Done (`.lore/dod.md`), updated `specs/hal-engine-config-hooks/spec.md`, and added the red acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts` using strategy `direct`.

Failure output from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causePreserved": true,
    -     "onErrorCalls": 1,
    -     "wrappedInError": true,
    +     "causePreserved": false,
    +     "onErrorCalls": 0,
    +     "wrappedInError": false,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causePreserved": true,
    -     "onErrorCalls": 1,
    -     "wrappedInError": true,
    +     "causePreserved": false,
    +     "onErrorCalls": 0,
    +     "wrappedInError": false,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causePreserved": true,
    -     "onErrorCalls": 1,
    -     "wrappedInError": true,
    +     "causePreserved": false,
    +     "onErrorCalls": 0,
    +     "wrappedInError": false,
        },
      ]

      52 |     }
      53 |
    > 54 |     expect(outcomes).toEqual([
         |                      ^
      55 |       {onErrorCalls: 1, wrappedInError: true, causePreserved: true, callerReceivedOriginal: true},
      56 |       {onErrorCalls: 1, wrappedInError: true, causePreserved: true, callerReceivedOriginal: true},
      57 |       {onErrorCalls: 1, wrappedInError: true, causePreserved: true, callerReceivedOriginal: true},

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:54:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}