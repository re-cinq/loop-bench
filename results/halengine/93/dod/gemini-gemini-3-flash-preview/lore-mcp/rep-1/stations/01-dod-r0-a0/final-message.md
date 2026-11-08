I have defined the **Definition of Done** for ticket #93 and committed the corresponding acceptance tests.

### Strategy: `direct`
The acceptance tests call the orchestrator's `processMessageStream` directly using a scripted provider that simulates multiple tool rounds with known usage tokens. This confirms that `afterModelResponse` currently only receives usage from the last round and fails to accumulate the total cost of the turn.

### Acceptance Tests
I created `src/orchestration/usage-reporting.acceptance.test.ts` with four tests:
1.  **reports aggregated usage across multiple tool rounds**: Verifies that the hook receives the sum of tokens from all rounds.
2.  **reports exact usage for turns without tools**: Ensures no regressions for the single-round common case.
3.  **ignores rounds with missing usage metadata**: Verifies that the accumulator handles `undefined` usage safely.
4.  **exposes usage granularity in the hook signature**: Asserts that the reported usage object includes both a `total` sum and a `rounds` breakdown for unambiguous reporting.

### Spec and Documentation
-   **`specs/hal-engine-config-hooks/spec.md`**: Updated to specify the new aggregated reporting behavior and moved the relevant statement from the "out of scope" section to "Installing hooks through config" with a new test citation.
-   **`CHANGELOG.md`**: Added a `Changed` entry under `[Unreleased]` detailing the move to aggregated reporting and the resulting behavior change for hook consumers.

### Failure Output
The tests failed for the correct reasons, demonstrating the current under-counting behavior:

```text
FAIL src/orchestration/usage-reporting.acceptance.test.ts
  ● Usage reporting (acceptance) › reports aggregated usage across multiple tool rounds
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

  ● Usage reporting (acceptance) › ignores rounds with missing usage metadata
    expect(received).toMatchObject(expected)
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 40,
    -   "outputTokens": 20,
    -   "totalTokens": 60,
    +   "inputTokens": 30,
    +   "outputTokens": 15,
    +   "totalTokens": 45,
      }

  ● Usage reporting (acceptance) › exposes usage granularity in the hook signature
    expect(received).toHaveProperty(path)
    Expected path: "total"
    Received value: {"inputTokens": 1, "outputTokens": 1, "totalTokens": 2}
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}