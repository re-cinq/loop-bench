I have defined the Definition of Done for ticket #93 as a set of executable acceptance tests and a spec update. The strategy used is `direct`, as the `afterModelResponse` hook already exists in the `ChatOrchestrator` but currently only receives the usage metadata of the final round.

I created a new test file `src/orchestration/usage-reporting.acceptance.test.ts` with three tests:
1. **reports summed usage across multiple tool rounds** — Verifies that for a turn with two tool rounds, the reported usage is the sum of both provider calls.
2. **reports exact usage for a turn with no tool calls** — Ensures that the common single-round path remains correct.
3. **handles rounds with no usage reported** — Confirms that if some rounds omit usage data, the total still includes all reported data without becoming `NaN` or `undefined`.

I also updated `specs/hal-engine-config-hooks/spec.md` to reflect the new requirement for summed usage and linked it to the primary acceptance test.

The tests currently fail as expected because `chatOrchestrator.ts` only assigns the most recent round's usage to the `lastUsage` local.

```
FAIL src/orchestration/usage-reporting.acceptance.test.ts
  ● Usage reporting across tool rounds (acceptance) › reports summed usage across multiple tool rounds

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
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}