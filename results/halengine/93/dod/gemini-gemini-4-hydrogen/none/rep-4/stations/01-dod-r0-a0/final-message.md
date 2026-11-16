Added red acceptance tests in `src/orchestration/afterModelResponseUsage.acceptance.test.ts`, linked them in `specs/hal-engine-config-hooks/spec.md`, recorded the Definition of Done in `.lore/dod.md`, and pushed commit `2817cf1` to `origin/loop-bench/93` (up to date with `origin/main`).

### Red bar output

Command:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/afterModelResponseUsage.acceptance.test.ts`

```text
FAIL src/orchestration/afterModelResponseUsage.acceptance.test.ts
  ● afterModelResponse turn usage aggregation › sums usage across every provider call when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 450,
    -   "outputTokens": 90,
    -   "totalTokens": 540,
    +   "inputTokens": 200,
    +   "outputTokens": 40,
    +   "totalTokens": 240,
      }

      at Object.<anonymous> (src/orchestration/afterModelResponseUsage.acceptance.test.ts:16:27)

  ● afterModelResponse turn usage aggregation › counts rounds that reported usage when other rounds omit it, and passes undefined when none report

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "omitted": undefined,
        "partial": Object {
    -     "inputTokens": 40,
    -     "outputTokens": 13,
    -     "totalTokens": 53,
    +     "inputTokens": 28,
    +     "outputTokens": 9,
    +     "totalTokens": 37,
        },
      }

      at Object.<anonymous> (src/orchestration/afterModelResponseUsage.acceptance.test.ts:28:32)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}