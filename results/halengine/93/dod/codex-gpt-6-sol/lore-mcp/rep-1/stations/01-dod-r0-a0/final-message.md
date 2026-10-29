Committed and pushed the `direct` acceptance test and [Definition of Done](/var/tmp/loop-bench/runs/32718b8acea8/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The [test](/var/tmp/loop-bench/runs/32718b8acea8/workspace/target/src/orchestration/turnUsage.acceptance.test.ts:46) fails for the reported undercount:

```text
"everyRound": expected 35 input, 10 output, 45 total
              received 7 input, 2 output, 9 total
"someRounds": expected 10 input, 3 output, 13 total
              received 6 input, 2 output, 8 total
Tests: 1 failed, 1 total
```

No production code was changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}