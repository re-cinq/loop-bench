Added and pushed commit `f5a4b62` with the direct acceptance test, its spec anchor, and `.lore/dod.md`. `origin/main` was already up to date, and the branch is not ahead of its upstream.

The named acceptance test fails for the reported behavior:

```text
Expected substring: "location"
Received string:    "forecast"
Tests:       1 failed, 1 total
```

The executor was called and returned `"forecast"` despite the required field being absent.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}