Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, added the colocated red acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, updated `specs/hal-engine-config-hooks/spec.md` with the normative guarantee and `#L79` citation, and pushed commit `c3e1b32` to `origin/loop-bench/95`.

Actual failure output from `npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError for arbitrary rejections › calls onError with a cause-carrying Error for string, object, and undefined rejections

    expect(received).toEqual(expected) // deep equality

    - Expected  - 15
    + Received  + 15

    @@ -8,31 +8,31 @@
          "hookErrorMatchesThrownInstance": true,
          "hookSessionMatches": true,
        },
        "objectTurn": Object {
          "callerReceivedThrown": true,
    -     "hookCalls": 1,
    -     "hookErrorCauseMatchesThrown": true,
    -     "hookErrorHasCauseProperty": true,
    -     "hookErrorIsErrorInstance": true,
    +     "hookCalls": 0,
    +     "hookErrorCauseMatchesThrown": false,
    +     "hookErrorHasCauseProperty": false,
    +     "hookErrorIsErrorInstance": false,
          "hookErrorMatchesThrownInstance": false,
    -     "hookSessionMatches": true,
    +     "hookSessionMatches": false,
        },
        "stringTurn": Object {
          "callerReceivedThrown": true,
    -     "hookCalls": 1,
    -     "hookErrorCauseMatchesThrown": true,
    -     "hookErrorHasCauseProperty": true,
    -     "hookErrorIsErrorInstance": true,
    +     "hookCalls": 0,
    +     "hookErrorCauseMatchesThrown": false,
    +     "hookErrorHasCauseProperty": false,
    +     "hookErrorIsErrorInstance": false,
          "hookErrorMatchesThrownInstance": false,
    -     "hookSessionMatches": true,
    +     "hookSessionMatches": false,
        },
        "voidTurn": Object {
          "callerReceivedThrown": true,
    -     "hookCalls": 1,
    -     "hookErrorCauseMatchesThrown": true,
    -     "hookErrorHasCauseProperty": true,
    -     "hookErrorIsErrorInstance": true,
    +     "hookCalls": 0,
    +     "hookErrorCauseMatchesThrown": false,
    +     "hookErrorHasCauseProperty": false,
    +     "hookErrorIsErrorInstance": false,
          "hookErrorMatchesThrownInstance": false,
    -     "hookSessionMatches": true,
    +     "hookSessionMatches": false,
        },
      }

       98 |     };
       99 |
    > 100 |     expect({stringTurn, objectTurn, voidTurn, errorTurn}).toEqual({
          |                                                           ^
      101 |       stringTurn: wrappedExpected,
      102 |       objectTurn: wrappedExpected,
      103 |       voidTurn: wrappedExpected,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:100:59)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}