Added and pushed red acceptance coverage in commit `c0fdf90`.

Ran only:

`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

It fails for the intended defect:

```text
Expected: inputTokens 16, outputTokens 9, totalTokens 25
Received: inputTokens 5, outputTokens 7, totalTokens 12
```

The test drives two real tool rounds, checks partial/missing usage handling, and requires a public `TurnUsageMetadata` contract. `.lore/dod.md` records the direct strategy and remaining facets. Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}