Added and pushed commit `7367f15` with the direct DoD, cited spec, and four red acceptance cases in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/99e66d1ee6cb/workspace/target/src/orchestration/tools/registry.acceptance.test.ts:14).

Ran only:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual red-bar output:

```text
Expected pattern: /location.*required|required.*location/i
Received string:  "forecast"

Expected pattern: /broken-weather/i
Received function did not throw

Tests: 4 failed, 4 total
```

The branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}