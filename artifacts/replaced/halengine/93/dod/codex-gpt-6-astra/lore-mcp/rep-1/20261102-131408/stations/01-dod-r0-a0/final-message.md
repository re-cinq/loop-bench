Committed and pushed `42753bb` using strategy `direct`. Two acceptance tests fail for the reported under-count. No production code changed; `main` is merged and the branch is fully pushed.

Ran only `src/orchestration/usage.acceptance.test.ts`. Actual failure excerpts:

```diff
- "totalTokens": 86,
+ "totalTokens": 44,
```

Missing-usage case:

```diff
- "totalTokens": 72,
+ "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Added `.lore/dod.md` and spec links. Discovery tooling currently omits the `spec` descriptor field; that limitation is recorded.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}