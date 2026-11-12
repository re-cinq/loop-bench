# Definition of Done: Ticket #95 (Call onError for a rejection that is not an Error)

Triage strategy: **`direct`** — The orchestrator lifecycle seam already exists at `createChatOrchestrator(...).processMessage(...)`. The acceptance test calls `processMessage` with a provider rejecting with non-Error values and asserts that `onError` is called with an `Error` wrapping the original rejection in `cause`, while the caller receives the original rejection unchanged.

## Acceptance Test Failure Output

Ran: `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  8

      Array [
        Object {
          "callerRejection": "provider failed with string",
          "callerThrew": true,
    -     "onErrorCalls": 1,
    -     "receivedCause": "provider failed with string",
    -     "receivedIsError": true,
    +     "onErrorCalls": 0,
    +     "receivedCause": undefined,
    +     "receivedIsError": false,
        },
        Object {
          "callerRejection": Object {
            "code": "PROVIDER_ERROR",
            "status": 500,
          },
          "callerThrew": true,
    -     "onErrorCalls": 1,
    -     "receivedCause": Object {
    -       "code": "PROVIDER_ERROR",
    -       "status": 500,
    +     "onErrorCalls": 0,
    +     "receivedCause": undefined,
    +     "receivedIsError": false,
        },
    -     "receivedIsError": true,
    -   },
        Object {
          "callerRejection": undefined,
          "callerThrew": true,
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
          "receivedCause": undefined,
    -     "receivedIsError": true,
    +     "receivedIsError": false,
        },
      ]

      66 |     }
      67 |
    > 68 |     expect(results).toEqual([
         |                     ^
      69 |       {
      70 |         onErrorCalls: 1,
      71 |         receivedIsError: true,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:68:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.221 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails precisely because `chatOrchestrator.ts`'s `catch` block gates `onError` on `error instanceof Error`, resulting in `onErrorCalls: 0` and `receivedIsError: false` when a non-Error rejection is thrown, while `callerThrew: true` and `callerRejection` confirm that the original rejection value still propagates to the caller.

Changes committed and pushed to `origin/HEAD`:
- `src/orchestration/chatOrchestrator.acceptance.test.ts`
- `specs/hal-engine-config-hooks/spec.md`
- `.lore/dod.md`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}