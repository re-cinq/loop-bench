Added and pushed five red acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/c532ebea1275/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), plus the spec and DoD.

Command run:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts --runInBand
```

Failure confirms missing validation, executor invocation, stale schemas, absent registration errors, and recompilation.

Committed as `39851f4`, pushed, and branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}