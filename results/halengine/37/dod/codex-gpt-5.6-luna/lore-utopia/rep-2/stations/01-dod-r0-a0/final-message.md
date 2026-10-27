Added and pushed the direct acceptance contract:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/51b560311c27/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [spec.md](/var/tmp/loop-bench/runs/51b560311c27/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [.lore/dod.md](/var/tmp/loop-bench/runs/51b560311c27/workspace/target/.lore/dod.md)

Command run:

```text
npm test -- --runInBand src/orchestration/tools/registry.acceptance.test.ts
```

Actual failures include:

```text
Tests:       5 failed, 5 total
Received string:  "executed"
Received string:  "42"
Received function did not throw
```

Committed as `cc8ee42`, pushed, merged `origin/main` (already up to date), and verified the branch is synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}