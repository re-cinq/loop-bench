Committed and pushed `85334a7` using `direct`. Added one acceptance test, linked the spec, and recorded `.lore/dod.md`. No production code changed; branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure:

```diff
- "totalTokens": 86,
+ "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The hook reports the final call’s usage instead of the whole turn.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}