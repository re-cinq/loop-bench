Added and pushed red acceptance coverage in commit `c331db3`.

- New acceptance suite: [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/c517480a4f76/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- New linked spec: [spec.md](/var/tmp/loop-bench/runs/c517480a4f76/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- DoD recorded: [dod.md](/var/tmp/loop-bench/runs/c517480a4f76/workspace/target/.lore/dod.md)

Ran only:

`npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`

Actual red output includes:

```text
Tests:       4 failed, 4 total
```

Failures show malformed inputs invoking executors, invalid static schemas registering successfully, static schemas not being retained from registration, and dynamic schemas being ignored. Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}