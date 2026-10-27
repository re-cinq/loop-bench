Added and committed the direct acceptance test and updated the spec link. The test ran and failed for the ticket’s stated reason:

```text
Expected: { inputTokens: 60, outputTokens: 9, totalTokens: 69 }
Received: { inputTokens: 30, outputTokens: 4, totalTokens: 34 }
```

Commit `e158f7f` is pushed; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}