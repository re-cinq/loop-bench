Committed and pushed `.lore/dod.md`, `specs/hal-engine-config-hooks/spec.md`, and `src/orchestration/chatOrchestrator.acceptance.test.ts` on `loop-bench/93` (`b517efe`), synced with `origin/main`.

### Red Bar Output

Command:
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse turn usage accumulation › sums usage across every provider call in a turn with two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 775,
    -   "outputTokens": 105,
    -   "totalTokens": 880,
    +   "inputTokens": 410,
    +   "outputTokens": 55,
    +   "totalTokens": 465,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:31:22)

  ● afterModelResponse turn usage accumulation › sums only the rounds that reported usage and passes undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 400,
    -     "outputTokens": 40,
    -     "totalTokens": 440,
    +     "inputTokens": 300,
    +     "outputTokens": 25,
    +     "totalTokens": 325,
        },
        "silent": undefined,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:65:31)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}