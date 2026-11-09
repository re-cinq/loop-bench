Committed and pushed `47d454d` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`; no production code changed. Branch is synced with upstream and current with `origin/main`.

Ran only the acceptance file. Actual failure:

```text
-     "onError",
-     "afterSession",
      "rejected",
    ],
    "originalRejection": true,

Tests:       1 failed, 1 total
```

This confirms the original rejection survives while both required hooks are skipped.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}