I have defined the Definition of Done for Ticket #93, which requires reporting summed usage across every tool round in the `afterModelResponse` hook.

The research phase confirmed that `chatOrchestrator.ts` currently only reports the usage of the last round (or the last round that yielded usage). While the `spec.md` and `CHANGELOG.md` had already been updated to describe the new behavior, the implementation remains at the under-counting state.

I have created a new acceptance test file, `src/orchestration/UsageAcrossRounds.acceptance.test.ts`, which includes:
- **`reports summed usage across two tool rounds`**: Verifies that a multi-round turn sums input, output, and total tokens.
- **`handles missing usage data gracefully`**: Ensures that rounds with missing usage don't corrupt the total.
- **`reports undefined if no rounds report usage`**: Confirms that a turn with no usage data correctly reports `undefined`.
- **`reports original usage for turns with no tools`**: Pins the existing behavior for simple turns.

I updated `specs/hal-engine-config-hooks/spec.md` to link to the new test file and refreshed `.lore/dod.md` with the strategy and test list.

### Failure Output
```
FAIL src/orchestration/UsageAcrossRounds.acceptance.test.ts
  ● Usage reporting (acceptance) › reports summed usage across two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 35,
    -   "outputTokens": 17,
    -   "totalTokens": 52,
    +   "inputTokens": 5,
    +   "outputTokens": 2,
    +   "totalTokens": 7,
      }

      65 |     expect(receivedUsage).toEqual({
      66 |       inputTokens: usage1.inputTokens + usage2.inputTokens + usage3.inputTokens,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}