Added the Definition of Done (`.lore/dod.md`), updated `specs/hal-engine-config-hooks/spec.md`, and created failing acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`, committed (`94387d0`) and pushed to `origin/loop-bench/93` (`Already up to date` with `origin/main`).

### Red bar output (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator turn usage accounting › reports the sum of every provider call when a turn runs two tool rounds

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

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:58:22)

  ● ChatOrchestrator turn usage accounting › counts reporting rounds when another reports none, and passes undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 40,
    -     "outputTokens": 15,
    -     "totalTokens": 55,
    +     "inputTokens": 25,
    +     "outputTokens": 10,
    +     "totalTokens": 35,
        },
        "silent": undefined,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:69:31)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}