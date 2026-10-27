Added one direct acceptance test in [usageAcrossToolRounds.acceptance.test.ts](/var/tmp/loop-bench/runs/4f5b6d4d6eaf/workspace/target/src/orchestration/usageAcrossToolRounds.acceptance.test.ts:53), updated the hooks spec and recorded the DoD in [.lore/dod.md](/var/tmp/loop-bench/runs/4f5b6d4d6eaf/workspace/target/.lore/dod.md).

The named test fails on the reported behavior. Its output showed:

```text
Expected: {"inputTokens":51,"outputTokens":10,"totalTokens":61}
Received: {"inputTokens":23,"outputTokens":5,"totalTokens":28}
```

The same test also exercises partial and absent usage. I ran Prettier on the changed files and ran only the acceptance test. Both commits are pushed, the branch is up to date with `origin/main`, and `git status` reports no changes or commits ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}