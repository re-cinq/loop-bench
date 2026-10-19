Committed and pushed `48a9c0b` using `direct`: two acceptance tests, updated spec links, and `.lore/dod.md`. No production code changed.

Ran only the new acceptance file. Actual failures:

```diff
- "totalTokens": 98,
+ "totalTokens": 54,
```

```diff
- "totalTokens": 44,
+ "totalTokens": 30,
```

```text
Tests:       2 failed, 2 total
```

Both fail because earlier rounds’ usage is lost. Main is merged; the working tree is clean and nothing is unpushed.

The existing Lore adapter does not expose a `spec` descriptor field; that limitation is recorded in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}