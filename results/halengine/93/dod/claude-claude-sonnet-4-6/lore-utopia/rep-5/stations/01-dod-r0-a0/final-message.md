Branch is pushed and up to date. Here's the summary:

---

**Strategy: `direct`** — `afterModelResponse` is a real callable seam; a scripted provider with two tool rounds and known per-round token counts exercises the behaviour directly.

**Acceptance test**: `src/orchestration/chatOrchestrator.acceptance.test.ts`

**Failure output (now)**:
```
● afterModelResponse usage across tool rounds › sums usage across all rounds and passes the total to the hook for a two-round tool turn

    expect(received).toEqual(expected) // deep equality

    Expected  - 3
    Received  + 3

    -   "inputTokens": 300,
    -   "outputTokens": 30,
    -   "totalTokens": 330,
    +   "inputTokens": 200,
    +   "outputTokens": 20,
    +   "totalTokens": 220,
```

The test fails because `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so the hook receives only round 2's `{200, 20, 220}` instead of the sum `{300, 30, 330}`. That is exactly the ticket's claim.

The spec (`specs/hal-engine-config-hooks/spec.md`) has a new "Usage reporting" section linking the test. The `.lore/dod.md` records the facets: accumulate in the round loop, decide the shape (sum only vs. sum + breakdown), update the "Measured semantics" note, and add a CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}