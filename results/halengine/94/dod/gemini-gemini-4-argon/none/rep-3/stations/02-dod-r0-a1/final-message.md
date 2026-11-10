Defined the red acceptance test and Definition of Done for `#94` using strategy `direct` (`src/orchestration/beforeSessionThrow.acceptance.test.ts`, linked from `specs/hal-engine-config-hooks/spec.md` and recorded in `.lore/dod.md`).

Actual failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionThrow.acceptance.test.ts`:

```text
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● when beforeSession throws › runs onError with the session and error, then afterSession, and still rejects at the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 1

      Object {
        "order": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "rejected: allocation failed",
    -   "seen": Object {
    -     "afterSessionId": "s1",
    -     "onErrorMessage": "allocation failed",
    -     "onErrorSession": "s1",
    -   },
    +   "seen": Object {},
      }

      49 |       .catch((error: Error) => `rejected: ${error.message}`);
      50 |
    > 51 |     expect({outcome, order, seen}).toEqual({
         |                                    ^
      52 |       outcome: 'rejected: allocation failed',
      53 |       order: ['beforeSession', 'onError', 'afterSession'],
      54 |       seen: {

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:51:36)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}