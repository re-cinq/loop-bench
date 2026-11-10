### Acceptance Test Definition

Ticket #95 defines that every rejection must call `onError`, wrapping non-`Error` rejections in an `Error` whose `cause` preserves the original rejection value, while propagating the original rejection to the caller unchanged.

- **Strategy**: `direct` — The orchestrator lifecycle seam already exposes `OrchestratorHooks.onError`. A test directly invokes `createChatOrchestrator` with rejecting providers and observes `onError` behavior.
- **Acceptance test**: `src/orchestration/chatOrchestrator.acceptance.test.ts`
- **Spec citation**: Updated `specs/hal-engine-config-hooks/spec.md` with traceability link to the acceptance test.
- **Definition of Done**: Recorded in `.lore/dod.md`.

### Failure Output

Running `npm test src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejection handling › wraps non-Error rejections in an Error with cause and still rejects original to caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  8

      Array [
        Object {
          "callerRejection": "provider failed string",
    -     "cause": "provider failed string",
    -     "isErrorInstance": true,
    -     "onErrorCalls": 1,
    +     "cause": undefined,
    +     "isErrorInstance": false,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerRejection": Object {
            "reason": "temporary outage",
            "status": 503,
          },
    -     "cause": Object {
    -       "reason": "temporary outage",
    -       "status": 503,
    -     },
    -     "isErrorInstance": true,
    -     "onErrorCalls": 1,
    +     "cause": undefined,
    +     "isErrorInstance": false,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerRejection": undefined,
          "cause": undefined,
    -     "isErrorInstance": true,
    -     "onErrorCalls": 1,
    +     "isErrorInstance": false,
    +     "onErrorCalls": 0,
        },
      ]

      68 |     );
      69 |
    > 70 |     expect(observed).toEqual([
         |                      ^
      71 |       {
      72 |         onErrorCalls: 1,
      73 |         isErrorInstance: true,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:70:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.211 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}