I have defined the **Definition of Done** for ticket #93 in `.lore/dod.md` and implemented a set of acceptance tests in `src/orchestration/usageReporting.acceptance.test.ts`.

These tests verify the new requirement that token usage be aggregated across all rounds of a tool-calling turn and passed to the `afterModelResponse` hook. Specifically, they cover:
1.  **Aggregated usage**: Verifying that a two-round turn reports the sum of tokens and the per-round breakdown.
2.  **Partial usage**: Verifying that rounds with no reported usage are handled correctly.
3.  **Backwards compatibility**: Verifying that a single-round turn (the common case) reports the same usage fields as today.

I have verified that the new acceptance tests fail on the current implementation for the correct reason, while the existing orchestrator tests remain green.

### Failure Output

```text
FAIL src/orchestration/usageReporting.acceptance.test.ts
  ● Usage Reporting (Acceptance) › reports aggregated usage for tool-heavy turns
    expect(received).toBe(expected) // Object.is equality
    Expected: 30
    Received: 20
    > 72 |     expect(reportedUsage.inputTokens).toBe(30);

  ● Usage Reporting (Acceptance) › reports correctly when some rounds have no usage
    TypeError: expect(received).toHaveLength(expected)
    Matcher error: received value must have a length property whose value must be a number
    Received has value: undefined
    > 104 |     expect(reportedUsage.rounds).toHaveLength(2);

  ● Usage Reporting (Acceptance) › reports single round usage identically to today
    TypeError: expect(received).toHaveLength(expected)
    Matcher error: received value must have a length property whose value must be a number
    Received has value: undefined
    > 135 |     expect(reportedUsage.rounds).toHaveLength(1);
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}