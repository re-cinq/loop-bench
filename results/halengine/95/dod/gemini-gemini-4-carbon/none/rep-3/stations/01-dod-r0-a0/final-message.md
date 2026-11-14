Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, added two red acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`, and linked the new guarantees in `specs/hal-engine-config-hooks/spec.md` (commit `2663315`, pushed to `origin/loop-bench/95`).

### Red bar output (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError for rejections that are not an Error › wraps a string rejection in an Error with cause for onError and rethrows the string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 1

    @@ -1,15 +1,7 @@
      Object {
    -   "seen": Array [
    -     Object {
    -       "cause": "upstream gateway timeout",
    -       "hasCause": true,
    -       "isError": true,
    -       "sameCause": true,
    -       "sessionId": "s1",
    -     },
    -   ],
    +   "seen": Array [],
        "settled": Object {
          "outcome": "rejected",
          "reason": "upstream gateway timeout",
          "sameRejection": true,
        },

      52 |     const turn = await rejectingTurn('upstream gateway timeout');
      53 |
    > 54 |     expect(turn).toEqual({
         |                  ^

  ● onError for rejections that are not an Error › wraps object and undefined rejections with cause for onError and rethrows each as-is

    expect(received).toEqual(expected) // deep equality

    - Expected  - 21
    + Received  +  2

    @@ -1,38 +1,19 @@
      Object {
        "payloadTurn": Object {
    -     "seen": Array [
    -       Object {
    -         "cause": Object {
    -           "code": "UPSTREAM_502",
    -           "status": 502,
    -         },
    -         "hasCause": true,
    -         "isError": true,
    -         "sameCause": true,
    -         "sessionId": "s1",
    -       },
    -     ],
    +     "seen": Array [],
          "settled": Object {
            "outcome": "rejected",
            "reason": Object {
              "code": "UPSTREAM_502",
              "status": 502,
            },
            "sameRejection": true,
          },
        },
        "undefinedTurn": Object {
    -     "seen": Array [
    -       Object {
    -         "cause": undefined,
    -         "hasCause": true,
    -         "isError": true,
    -         "sameCause": true,
    -         "sessionId": "s1",
    -       },
    -     ],
    +     "seen": Array [],
          "settled": Object {
            "outcome": "rejected",
            "reason": undefined,
            "sameRejection": true,
          },

      76 |     const undefinedTurn = await rejectingTurn(undefined);
      77 |
    > 78 |     expect({payloadTurn, undefinedTurn}).toEqual({
         |                                          ^

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}