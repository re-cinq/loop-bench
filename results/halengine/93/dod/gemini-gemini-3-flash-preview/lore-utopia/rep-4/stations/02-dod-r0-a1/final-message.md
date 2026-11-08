I have defined the **Definition of Done** for ticket #93 and implemented the acceptance tests in a new file, `src/orchestration/UsageAggregation.acceptance.test.ts`.

The tests confirm that the `afterModelResponse` hook currently under-counts usage by only reporting the last provider call in a tool-use turn. The new tests assert that the hook should instead receive the aggregated sum of tokens from all provider rounds.

### Strategy: `direct`
The `ChatOrchestrator` already exposes the `afterModelResponse` hook. I provided a scripted provider that simulates multiple tool rounds with known usage metadata and verified that the hook receives the total sum (which fails today as it only receives the last round).

### Acceptance tests

- **reports summed usage across multiple tool rounds** — A turn with tool calls receives the sum of input, output, and total tokens from all provider rounds.
- **reports single-round usage when no tools are called** — A turn without tool calls reports the exact usage of that single round, pinned by the existing test in `chatOrchestrator.test.ts`.
- **handles missing usage on some rounds gracefully** — If some rounds report usage and others don't, the total is the sum of those that did, without becoming `NaN` or `undefined`.
- **reports nothing when no rounds report usage** — If no provider rounds report usage, the hook receives `undefined`.

I have updated `specs/hal-engine-config-hooks/spec.md` to reflect the desired behavior and pointed the validation link to the new test file. I also added a CHANGELOG entry under the `[Unreleased]` section to document the upcoming behavior change and the renaming of the hook argument to `totalUsage`.

### Failure Output
```
FAIL src/orchestration/UsageAggregation.acceptance.test.ts
  ● Usage aggregation across tool rounds (acceptance) › reports summed usage across multiple tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 15,
    -   "totalTokens": 45,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }

      66 |
      67 |     // Fails today: receives only usage2 {20, 10, 30}
    > 68 |     expect(receivedUsage).toEqual({
         |                           ^
      69 |       inputTokens: 30,
      70 |       outputTokens: 15,
      71 |       totalTokens: 45,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}