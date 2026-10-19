Added and pushed commit `9480a04` with one direct acceptance test, the DoD, and a spec link. The test exercises two tool rounds and fails because the hook receives only the final provider call’s usage:

```text
Expected: {"inputTokens":60,"outputTokens":9,"totalTokens":69}
Received: {"inputTokens":30,"outputTokens":4,"totalTokens":34}
```

The branch is clean, up to date with its upstream, and already up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}