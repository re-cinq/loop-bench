The Definition of Done for **re-cinq/HALEngine#93** ("Report usage across every tool round, not just the last") is committed and pushed on branch `loop-bench/93` (`a9a245dec957fd86817a4936676325f45da2655f`).

### Summary of DoD & Acceptance Tests

- **Strategy**: `direct` — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already exist as the public entry point and hook seam.
- **Files committed**:
  - `.lore/dod.md` — records the verbatim central claim, the `direct` strategy, the two acceptance tests, implementation facets, and out-of-scope items.
  - `src/orchestration/chatOrchestrator.acceptance.test.ts` — defines the two red acceptance tests:
    1. `ChatOrchestrator usage across tool rounds > reports the sum of three provider calls when a turn runs two tool rounds`
    2. `ChatOrchestrator usage across tool rounds > counts the rounds that reported usage when one round reports none, and reports nothing when no round did`
  - `specs/hal-engine-config-hooks/spec.md` — replaces the recorded under-counting note under `## Measured semantics — out of scope` with `## Usage reported to afterModelResponse` and `([validated by: ...])` links pointing to `src/orchestration/chatOrchestrator.acceptance.test.ts#L55`, `src/orchestration/chatOrchestrator.test.ts#L236`, and `src/orchestration/chatOrchestrator.acceptance.test.ts#L65`.

### Red Bar Output

Running the acceptance test suite (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts` / CI step `Test (with coverage floor)` running `npm run test:coverage`):

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ChatOrchestrator usage across tool rounds
    ✕ reports the sum of three provider calls when a turn runs two tool rounds
    ✕ counts the rounds that reported usage when one round reports none, and reports nothing when no round did

  ● ChatOrchestrator usage across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds

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

  ● ChatOrchestrator usage across tool rounds › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

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
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}