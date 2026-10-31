Added and pushed commit `8a649d8`.

Red acceptance test: [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/099ebf05d30e/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:14), with the lifecycle guarantee anchored in the spec and DoD recorded in [.lore/dod.md](/var/tmp/loop-bench/runs/099ebf05d30e/workspace/target/.lore/dod.md:1).

Focused test command and actual failure:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
Expected  - 29
Received  +  0
...
"hook": "onError"
...
"hook": "afterSession"
```

The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}