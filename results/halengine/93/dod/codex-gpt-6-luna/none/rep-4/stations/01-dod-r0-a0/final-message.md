Added the acceptance test [usageAcrossRounds.acceptance.test.ts](/var/tmp/loop-bench/runs/06b7950e9e0a/workspace/target/src/orchestration/usageAcrossRounds.acceptance.test.ts:10), linked the updated behavior in the spec, and recorded the `direct` strategy in `.lore/dod.md`.

The named test failed for the reported under-counting behavior:

```text
Expected: {"inputTokens":60,"outputTokens":12,"totalTokens":72}
Received: {"inputTokens":30,"outputTokens":6,"totalTokens":36}
```

Committed as `c61a2c7` and pushed. `origin/main` was already merged; the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}