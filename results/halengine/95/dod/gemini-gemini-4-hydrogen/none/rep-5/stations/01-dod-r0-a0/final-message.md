Added the red acceptance tests for `re-cinq/HALEngine#95`, linked them in `specs/hal-engine-config-hooks/spec.md`, and recorded the Definition of Done in `.lore/dod.md` (commit `420e607`, pushed to `origin/loop-bench/95`, up to date with `origin/main`).

### Red test run
Command:
```
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/onErrorRejection.acceptance.test.ts
```

Failure output:
```
FAIL src/orchestration/onErrorRejection.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › calls onError once with an Error wrapping a string rejection in cause and rethrows the string unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "callCount": 1,
    -   "cause": "rate limited",
    -   "hasCause": true,
    -   "isError": true,
    +   "callCount": 0,
    +   "cause": undefined,
    +   "hasCause": false,
    +   "isError": false,
        "sameRejection": true,
      }

  ● ChatOrchestrator onError for non-Error rejections › calls onError once with an Error wrapping a plain object or undefined rejection in cause and rethrows each unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 10
    + Received  +  7

      Array [
        Object {
    -     "callCount": 1,
    -     "cause": Object {
    -       "code": 503,
    -       "detail": "unavailable",
    -     },
    -     "hasCause": true,
    -     "isError": true,
    +     "callCount": 0,
    +     "cause": undefined,
    +     "hasCause": false,
    +     "isError": false,
          "sameRejection": true,
        },
        Object {
    -     "callCount": 1,
    +     "callCount": 0,
          "cause": undefined,
    -     "hasCause": true,
    -     "isError": true,
    +     "hasCause": false,
    +     "isError": false,
          "sameRejection": true,
        },
      ]

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}