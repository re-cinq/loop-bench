Added the Definition of Done (`.lore/dod.md`), two red acceptance tests (`src/orchestration/chatOrchestrator.acceptance.test.ts`), and spec traceability links (`specs/hal-engine-config-hooks/spec.md`) for `re-cinq/HALEngine#93`, committed as `544ae1c` and pushed to `origin/loop-bench/93` (`Already up to date.` with `origin/main`).

### Red test failure output

Command run:
`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage reporting across tool rounds › reports the sum of all three provider calls when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:66:22)

  ● afterModelResponse usage reporting across tool rounds › counts reporting rounds when another round reports none, and reports undefined when none do

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "none": undefined,
        "partial": Object {
    -     "inputTokens": 12,
    -     "outputTokens": 3,
    -     "totalTokens": 15,
    +     "inputTokens": 5,
    +     "outputTokens": 1,
    +     "totalTokens": 6,
        },
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:96:29)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}