Added and pushed direct acceptance coverage in:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/4ea4d423c45e/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [spec.md](/var/tmp/loop-bench/runs/4ea4d423c45e/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [.lore/dod.md](/var/tmp/loop-bench/runs/4ea4d423c45e/workspace/target/.lore/dod.md)

Command run:

`node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand src/orchestration/tools/registry.acceptance.test.ts`

Result: 3 failed, 1 passed. Actual failures included:

- `Expected pattern: /location.*required/i; Received string: "forecast"`
- `Expected: /weather/i; Received function did not throw`

Commit `dddbea8` is pushed; branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}