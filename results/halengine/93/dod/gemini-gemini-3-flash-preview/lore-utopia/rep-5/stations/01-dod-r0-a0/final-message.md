I have defined the **Definition of Done** for ticket #93 and implemented the required acceptance tests.

### Strategy: `direct`
I have implemented a new acceptance test suite that uses `createChatOrchestrator` with a scripted provider to verify usage reporting across multiple tool rounds. The tests confirm that the orchestrator currently under-counts usage by only reporting the last round's tokens and lacks an unambiguous aggregate type.

### Changes:
- **Created `.lore/dod.md`**: Outlined the strategy and success criteria for cumulative usage reporting.
- **Created `src/orchestration/usage-reporting.acceptance.test.ts`**: Added 4 tests:
    - `reports cumulative usage across multiple tool rounds`: (RED) Expects the sum of tokens across all provider calls.
    - `reports usage for turns with no tool calls`: (GREEN) Verifies no regression for the common case.
    - `handles partial usage reporting`: (RED) Expects a sum of only those rounds that reported usage.
    - `provides an unambiguous type with roundCount`: (RED) Expects a new `roundCount` field on the usage object.
- **Updated `specs/hal-engine-config-hooks/spec.md`**: Replaced the recorded under-counting behavior with the new requirement for cumulative reporting and updated the validation link.

### Acceptance Test Failure Output:
```text
  ● Usage reporting across tool rounds › reports cumulative usage across multiple tool rounds

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 60,
    -   "outputTokens": 30,
    -   "totalTokens": 90,
    +   "inputTokens": 30,
    +   "outputTokens": 15,
    +   "totalTokens": 45,
      }

  ● Usage reporting across tool rounds › provides an unambiguous type with roundCount

    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: undefined
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}