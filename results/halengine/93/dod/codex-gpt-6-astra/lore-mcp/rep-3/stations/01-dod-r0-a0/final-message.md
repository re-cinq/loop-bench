Committed and pushed `5f74333` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is synchronized; `origin/main` was already merged.

Ran only `src/orchestration/usage.acceptance.test.ts`. Actual failures:

```diff
- "totalTokens": 85,
+ "totalTokens": 44,
```

```diff
- "totalTokens": 41,
+ "totalTokens": 28,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Traceability limitation: the current Lore adapter omits `descriptor.spec`; anchors are stamped and linked in the spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}