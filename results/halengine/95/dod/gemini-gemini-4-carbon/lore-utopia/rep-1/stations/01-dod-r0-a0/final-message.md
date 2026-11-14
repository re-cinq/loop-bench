Defined the `direct` Definition of Done in `.lore/dod.md`, replaced the recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` with the linked normative guarantee, and added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts` (committed as `9ef2845` and pushed to `origin/loop-bench/95`).

### Red bar output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● chatOrchestrator non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  + 12

      Object {
        "objectTurn": Object {
          "callerRejectionUnchanged": true,
    -     "onErrorCalls": 1,
    -     "preservesCause": true,
    -     "sessionMatches": true,
    -     "wrappedAsError": true,
    +     "onErrorCalls": 0,
    +     "preservesCause": false,
    +     "sessionMatches": false,
    +     "wrappedAsError": false,
        },
        "stringTurn": Object {
          "callerRejectionUnchanged": true,
    -     "onErrorCalls": 1,
    -     "preservesCause": true,
    -     "sessionMatches": true,
    -     "wrappedAsError": true,
    +     "onErrorCalls": 0,
    +     "preservesCause": false,
    +     "sessionMatches": false,
    +     "wrappedAsError": false,
        },
        "undefinedTurn": Object {
          "callerRejectionUnchanged": true,
    -     "onErrorCalls": 1,
    -     "preservesCause": true,
    -     "sessionMatches": true,
    -     "wrappedAsError": true,
    +     "onErrorCalls": 0,
    +     "preservesCause": false,
    +     "sessionMatches": false,
    +     "wrappedAsError": false,
        },
      }

      15 |     const undefinedTurn = await runNonErrorTurn(undefined);
      16 |
    > 17 |     expect({stringTurn, objectTurn, undefinedTurn}).toEqual({
         |                                                     ^
      18 |       stringTurn: {
      19 |         onErrorCalls: 1,
      20 |         sessionMatches: true,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:17:53)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}