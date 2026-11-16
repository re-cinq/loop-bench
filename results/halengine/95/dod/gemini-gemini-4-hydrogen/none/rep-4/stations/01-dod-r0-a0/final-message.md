Added failing acceptance tests in `src/orchestration/onErrorWrapping.acceptance.test.ts`, updated `specs/hal-engine-config-hooks/spec.md` with the new `onError` guarantee and validated-by anchors, and recorded the Definition of Done (`direct`) in `.lore/dod.md`. Committed (`0b897b2`), pushed to `origin/loop-bench/95`, and confirmed up to date with `origin/main`.

Command run:
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/onErrorWrapping.acceptance.test.ts`

Failure output:
```text
FAIL src/orchestration/onErrorWrapping.acceptance.test.ts
  ● onError rejection wrapping › calls onError with an Error wrapping a thrown string and rethrows the string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "callCount": 1,
    +   "callCount": 0,
        "callerOutcome": Object {
          "rejected": true,
          "value": "provider string failure",
        },
    -   "cause": "provider string failure",
    -   "isError": true,
    +   "cause": undefined,
    +   "isError": false,
      }

      at Object.<anonymous> (src/orchestration/onErrorWrapping.acceptance.test.ts:16:8)

  ● onError rejection wrapping › calls onError with an Error wrapping a thrown object and rethrows the object

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "callCount": 1,
    +   "callCount": 0,
        "callerRejected": true,
    -   "isError": true,
    +   "isError": false,
        "sameCallerValue": true,
    -   "sameCause": true,
    +   "sameCause": false,
      }

      at Object.<anonymous> (src/orchestration/onErrorWrapping.acceptance.test.ts:34:8)

  ● onError rejection wrapping › calls onError with an Error wrapping undefined and rethrows undefined

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "callCount": 1,
    +   "callCount": 0,
        "callerOutcome": Object {
          "rejected": true,
          "value": undefined,
        },
        "cause": undefined,
    -   "isError": true,
    +   "isError": false,
      }

      at Object.<anonymous> (src/orchestration/onErrorWrapping.acceptance.test.ts:51:8)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}