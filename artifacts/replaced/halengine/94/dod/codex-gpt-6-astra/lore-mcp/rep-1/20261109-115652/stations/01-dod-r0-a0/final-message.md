Committed and pushed `84b4aa0` using `direct`. Added one acceptance test, the DoD, and the spec’s cleanup contract. No production code changed.

Ran only the acceptance file. Actual failure:

```text
-   "cleanupArguments": true,
-   "errorArguments": true,
+   "cleanupArguments": false,
+   "errorArguments": false,
-     "onError",
-     "afterSession",
-   "resourcesRemaining": 0,
+   "resourcesRemaining": 1,

Tests:       1 failed, 1 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}