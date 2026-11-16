Added the Definition of Done (`.lore/dod.md`), linked the new acceptance tests in `specs/hal-engine-config-hooks/spec.md`, and committed and pushed `src/orchestration/usageReporting.acceptance.test.ts` on `loop-bench/93` (`3deddbc`, up to date with `origin/main`).

Ran `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/usageReporting.acceptance.test.ts`:

```
FAIL src/orchestration/usageReporting.acceptance.test.ts
  ● afterModelResponse multi-round usage reporting › sums usage across every provider call in a multi-round tool turn

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "called": true,
        "usage": Object {
    -     "inputTokens": 750,
    -     "outputTokens": 100,
    -     "totalTokens": 850,
    +     "inputTokens": 400,
    +     "outputTokens": 45,
    +     "totalTokens": 445,
        },
      }

      at Object.<anonymous> (src/orchestration/usageReporting.acceptance.test.ts:16:18)

  ● afterModelResponse multi-round usage reporting › counts reported rounds when some omit usage, and reports undefined when none do

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

    @@ -1,12 +1,12 @@
      Object {
        "mixedTurn": Object {
          "called": true,
          "usage": Object {
    -       "inputTokens": 42,
    -       "outputTokens": 10,
    -       "totalTokens": 52,
    +       "inputTokens": 30,
    +       "outputTokens": 7,
    +       "totalTokens": 37,
          },
        },
        "silentTurn": Object {
          "called": true,
          "usage": undefined,

      at Object.<anonymous> (src/orchestration/usageReporting.acceptance.test.ts:30:37)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}