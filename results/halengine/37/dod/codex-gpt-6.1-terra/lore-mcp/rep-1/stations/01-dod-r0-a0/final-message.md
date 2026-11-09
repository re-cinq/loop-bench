Committed and pushed the `direct` acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/075f9f2235b5/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with the validation spec and [Definition of Done](/var/tmp/loop-bench/runs/075f9f2235b5/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The targeted Jest run produced three red tests for the reported missing validation:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts

rejects invalid input and passes valid input through unchanged
  Expected: validation messages and one valid executor call
  Received: "forecast" for invalid inputs, which also reached the executor

rejects an invalid static schema when the tool is registered
  Expected pattern: /weather/i
  Received function did not throw

validates each call against the current dynamic definition
  Expected: required-field messages and calls: []
  Received: "forecast" for both calls and both inputs reached the executor

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The repository’s Lore test-list command currently emits only `id`, `name`, and `file`; it does not expose a `spec` descriptor field. The spec statements link directly to the test declarations.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}