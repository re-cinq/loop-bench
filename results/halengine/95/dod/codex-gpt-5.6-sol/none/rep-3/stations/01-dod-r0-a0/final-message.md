Added and pushed the direct acceptance contract in commit `285fa47`.

The focused test fails for the expected reason:

```text
Expected: 1
Received: 0

expect(observation.hookCalls).toBe(1);

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Command run:

```bash
npm test -- --runTestsByPath src/orchestration/nonErrorRejection.acceptance.test.ts --runInBand
```

The spec citation and [.lore/dod.md](/var/tmp/loop-bench/runs/c6ec01831c9a/workspace/target/.lore/dod.md) were updated. The branch is merged with `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}