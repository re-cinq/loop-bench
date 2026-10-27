Added a direct acceptance test, updated the spec, and recorded the DoD. The targeted test fails on the reported under-counting behavior:

```text
Expected: {inputTokens: 40, outputTokens: 7, totalTokens: 47}
Received: {inputTokens: 30, outputTokens: 5, totalTokens: 35}
```

Commit `5677860` is pushed. `origin/main` was already merged, and the branch is clean and up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}