Defined and pushed the `direct` acceptance contract in commit `aa3780b`.

Added:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/81d1dbee8052/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [tool input validation spec](/var/tmp/loop-bench/runs/81d1dbee8052/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [Definition of Done](/var/tmp/loop-bench/runs/81d1dbee8052/workspace/target/.lore/dod.md)

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts --runInBand
```

Actual red-bar summary:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

Key failures confirm malformed inputs currently execute:

```text
Expected "calls": 1
Received "calls": 3

Expected validation result naming location
Received "executor ran"
```

Dynamic schemas remain unvalidated:

```text
Expected: StringMatching /location.*number|number.*location/i
Received: "ok"
```

The orchestrator currently returns the executor response:

```text
Expected validation feedback naming required location
Received: "executor must not run"
```

Branch is merged with current `origin/main`, pushed, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}