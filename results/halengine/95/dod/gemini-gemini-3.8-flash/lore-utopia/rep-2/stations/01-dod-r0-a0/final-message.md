### Summary of Work

Defined the Definition of Done for Ticket #95 ("Call onError for a rejection that is not an Error"):

1. **Acceptance Test**: Created `src/orchestration/chatOrchestrator.acceptance.test.ts` testing that non-`Error` rejections (string, plain object, `undefined`) wrap the rejection in an `Error` whose `cause` is the original value when invoking `onError`, while re-throwing the original rejection unchanged to the caller.
2. **Definition of Done**: Created `.lore/dod.md` using the `direct` triage strategy, quoting the ticket's central claim and outlining the required facets.
3. **Spec Traceability**: Replaced the measured-semantics flaw in `specs/hal-engine-config-hooks/spec.md` with the new guarantee linked to the acceptance test declaration (`[validated by: wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original](../../src/orchestration/chatOrchestrator.acceptance.test.ts#L41)`).
4. **Verification**: Executed `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`. The test fails specifically because the `error instanceof Error` guard in `chatOrchestrator.ts` bypasses `onError` for non-`Error` rejections (`onErrorCalls: 0`). Verified that `check:spec-links`, `spec:names`, and `check:spec-status` pass.
5. **Formatting and Git Sync**: Formatted changed files with Prettier, committed, pushed to `origin/loop-bench/95`, merged `origin/main` (already up to date), and verified clean git status.

### Test Failure Output

Command run: `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
          "case": "string",
    -     "causeMatches": true,
    -     "isError": true,
    -     "onErrorCalls": 1,
    +     "causeMatches": false,
    +     "isError": false,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
          "case": "object",
    -     "causeMatches": true,
    -     "isError": true,
    -     "onErrorCalls": 1,
    +     "causeMatches": false,
    +     "isError": false,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
          "case": "undefined",
    -     "causeMatches": true,
    -     "isError": true,
    -     "onErrorCalls": 1,
    +     "causeMatches": false,
    +     "isError": false,
    +     "onErrorCalls": 0,
        },
      ]

      79 |     }
      80 |
    > 81 |     expect(results).toEqual([
         |                     ^
      82 |       {
      83 |         case: 'string',
      84 |         onErrorCalls: 1,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:81:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.203 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}