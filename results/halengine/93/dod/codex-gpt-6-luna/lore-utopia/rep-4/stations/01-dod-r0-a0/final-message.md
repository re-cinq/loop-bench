Added a direct acceptance test for the two-tool-round usage total and linked it from the spec. The test is committed and pushed as `4048863`; the branch is up to date with `origin/main` and its upstream.

The named test fails because the hook receives the final call’s usage instead of the sum:

```text
Expected: {"inputTokens": 60, "outputTokens": 9, "totalTokens": 69}
Received: {"inputTokens": 30, "outputTokens": 4, "totalTokens": 34}
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}