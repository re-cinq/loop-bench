The acceptance test for ticket #95 has been created in `src/orchestration/chatOrchestrator.acceptance.test.ts`, documented in `.lore/dod.md`, anchored in `specs/hal-engine-config-hooks/spec.md`, formatted with Prettier, and committed and pushed to `origin/loop-bench/95`.

### Strategy
**`direct`** — A direct entry point already exists via `createChatOrchestrator`, which returns an orchestrator whose `processMessage` calls `OrchestratorHooks.onError` within its `catch` block. The acceptance test exercises the real orchestrator entry point with providers throwing non-`Error` rejections (`string`, plain `object`, and `undefined`) and asserts that `onError` is invoked with an `Error` whose `cause` is the original rejection value, while the caller still receives the raw rejection unchanged.

### Failure Output
Command run: `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator acceptance: non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
          "case": "string",
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCallCount": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCallCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
          "case": "object",
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCallCount": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCallCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
          "case": "undefined",
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCallCount": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCallCount": 0,
        },
      ]

      80 |     }
      81 |
    > 82 |     expect(results).toEqual([
         |                     ^
      83 |       {
      84 |         case: 'string',
      85 |         onErrorCallCount: 1,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:82:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.204 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}