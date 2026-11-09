Committed and pushed `73f4431` using strategy `direct`. Added two acceptance tests, linked the spec, and recorded `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failures:

```text
- "totalTokens": 86,
+ "totalTokens": 44,
```

```text
- "totalTokens": 42,
+ "totalTokens": 28,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Both fail because earlier rounds are omitted. Latest `main` is already merged; the working tree is clean and the branch matches upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}