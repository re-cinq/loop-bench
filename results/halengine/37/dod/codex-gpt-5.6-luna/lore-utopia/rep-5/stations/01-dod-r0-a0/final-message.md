Added and pushed:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/25e1b243c5be/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/25e1b243c5be/workspace/target/.lore/dod.md)

Targeted command ran:

`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`

All 5 tests fail for the intended missing-validation behavior, including:

> Expected pattern: /location.*required/i  
> Received string: `"executor ran"`

Committed as `f5d4aa6` and pushed. Branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}