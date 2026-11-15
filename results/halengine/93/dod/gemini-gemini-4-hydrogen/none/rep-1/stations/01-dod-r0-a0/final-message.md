Added two red acceptance tests in `src/orchestration/usageAggregation.acceptance.test.ts`, linked them in `specs/hal-engine-config-hooks/spec.md`, recorded the DoD in `.lore/dod.md`, and pushed commit `e3245f7` to `origin/loop-bench/93` (already up to date with `origin/main`).

Verified the existing single-round test (`src/orchestration/chatOrchestrator.test.ts`, `"receives collected response text and usage"`) passes (`1 passed, 23 skipped`), and running the acceptance tests fails for the ticket's stated reason (`lastUsage` retains only the final round's usage):

```text
FAIL src/orchestration/usageAggregation.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums token usage across every provider call in a multi-round tool turn

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 750,
    -   "outputTokens": 100,
    -   "totalTokens": 850,
    +   "inputTokens": 400,
    +   "outputTokens": 50,
    +   "totalTokens": 450,
      }

      at Object.<anonymous> (src/orchestration/usageAggregation.acceptance.test.ts:72:27)

  ● afterModelResponse usage across tool rounds › counts reported rounds when some rounds omit usage and still reports undefined when none do

    expect(received).toMatchObject(expected)

    - Expected  - 6
    + Received  + 6

      Object {
        "middleOmitted": Object {
    -     "inputTokens": 500,
    -     "outputTokens": 70,
    -     "totalTokens": 570,
    +     "inputTokens": 400,
    +     "outputTokens": 50,
    +     "totalTokens": 450,
        },
        "silentIsUndefined": true,
        "trailingOmitted": Object {
    -     "inputTokens": 350,
    -     "outputTokens": 50,
    -     "totalTokens": 400,
    +     "inputTokens": 250,
    +     "outputTokens": 30,
    +     "totalTokens": 280,
        },
      }

      at Object.<anonymous> (src/orchestration/usageAggregation.acceptance.test.ts:92:8)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}