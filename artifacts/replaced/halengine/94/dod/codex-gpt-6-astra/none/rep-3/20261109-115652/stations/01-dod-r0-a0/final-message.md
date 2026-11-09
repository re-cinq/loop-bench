Committed and pushed `2f7c33f` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production changes. Branch is current with `main` and fully pushed.

Ran only the new acceptance file. Actual failure:

```text
-   "allocationsRemaining": 0,
+   "allocationsRemaining": 1,
    "events": Array [
      "beforeSession",
-     "onError",
-     "afterSession",
      "caller",
    ],
```

```text
Tests:       1 failed, 1 total
```

The original rejection remains intact; error reporting and cleanup are absent.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}