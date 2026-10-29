Committed and pushed the `direct` acceptance test as `6e1ef37`. It calls the orchestrator’s real entry point, verifies the caller receives the original error, and requires `onError` and `afterSession` to run in order. The spec now links to the test and states that `afterSession` must allow partial setup.

The focused test fails for the reported behavior:

```text
-   Array ["onError", true, true],
-   Array ["afterSession", true],
```

Only `beforeSession` was recorded. No production code was changed. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}