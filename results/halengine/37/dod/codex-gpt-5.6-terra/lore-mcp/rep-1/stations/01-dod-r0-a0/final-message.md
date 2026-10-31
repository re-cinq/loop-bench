Added and pushed commit `79a71bf` with:

- [`registry.acceptance.test.ts`](/var/tmp/loop-bench/runs/552df1402255/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [`spec.md`](/var/tmp/loop-bench/runs/552df1402255/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [`.lore/dod.md`](/var/tmp/loop-bench/runs/552df1402255/workspace/target/.lore/dod.md)

Ran only:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual red-bar results:

```text
Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

Failures show invalid calls reaching the executor, invalid static schemas registering successfully, and dynamic definitions using stale schemas. Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}