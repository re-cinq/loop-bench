Added and pushed a direct-strategy acceptance test and DoD.

- Test: [beforeSessionError.acceptance.test.ts](/var/tmp/loop-bench/runs/c6304903b167/workspace/target/src/orchestration/beforeSessionError.acceptance.test.ts)
- Updated spec traceability and [.lore/dod.md](/var/tmp/loop-bench/runs/c6304903b167/workspace/target/.lore/dod.md)
- Commit: `0c3e2a2`
- Branch is pushed and up to date.

Red failure:

```text
Expected: ["beforeSession", "onError", "afterSession"]
Received: ["beforeSession"]
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}