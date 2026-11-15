Added red acceptance tests in `src/orchestration/usageAggregation.acceptance.test.ts`, linked them in `specs/hal-engine-config-hooks/spec.md`, recorded the `direct` DoD in `.lore/dod.md`, formatted the changed files with Prettier, and pushed commit `71f38c3` to `origin/loop-bench/93` (`Your branch is up to date with 'origin/loop-bench/93'.`, `nothing to commit, working tree clean`).

Actual failure output from `NODE_OPTIONS='--experimental-vm-modules' npx jest --runTestsByPath src/orchestration/usageAggregation.acceptance.test.ts`:

```text
FAIL src/orchestration/usageAggregation.acceptance.test.ts
  ● afterModelResponse usage reporting across tool rounds › sums token usage across every provider call in a turn with two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 750,
    -   "outputTokens": 120,
    -   "totalTokens": 870,
    +   "inputTokens": 400,
    +   "outputTokens": 60,
    +   "totalTokens": 460,
      }

      at Object.<anonymous> (src/orchestration/usageAggregation.acceptance.test.ts:18:22)

  ● afterModelResponse usage reporting across tool rounds › counts rounds that report usage when others omit it, and yields undefined when none report

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "omittedUsage": undefined,
        "partialUsage": Object {
    -     "inputTokens": 40,
    -     "outputTokens": 10,
    -     "totalTokens": 50,
    +     "inputTokens": 30,
    +     "outputTokens": 8,
    +     "totalTokens": 38,
        },
      }

      at Object.<anonymous> (src/orchestration/usageAggregation.acceptance.test.ts:32:42)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}