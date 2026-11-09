Committed and pushed `ef88ca7` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `chatOrchestratorUsage.acceptance.test.ts`. Actual failures:

```text
- "totalTokens": 98,
+ "totalTokens": 54,

- "totalTokens": 44,
+ "totalTokens": 30,

Tests:       2 failed, 2 total
```

Both fail because earlier rounds’ usage is omitted. The test-discovery adapter’s missing `spec` field support is documented in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}