Committed and pushed `d13826a` using `direct`. Two acceptance tests fail on usage under-counting; no production code changed. Main is merged and the branch is fully pushed.

Actual failure excerpts:

```diff
- "totalTokens": 86,
+ "totalTokens": 44,
```

Missing-usage case:

```diff
- "totalTokens": 42,
+ "totalTokens": 28,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

The DoD records API and release obligations. Spec links and `@spec` anchors are included; the existing Lore adapter does not expose a `spec` descriptor field.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}