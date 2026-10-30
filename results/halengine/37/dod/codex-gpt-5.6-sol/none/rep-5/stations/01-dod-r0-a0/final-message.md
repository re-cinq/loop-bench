Defined and pushed the direct acceptance contract in:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/27ae78c0eb66/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [validation spec](/var/tmp/loop-bench/runs/27ae78c0eb66/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [Definition of Done](/var/tmp/loop-bench/runs/27ae78c0eb66/workspace/target/.lore/dod.md)

Ran only the new acceptance file. Both tests failed for the intended reasons:

```text
executorCallsBeforeValidInput:
- Expected: 0
+ Received: 3

results:
- Expected validation messages naming location/units constraints
+ Received: "forecast", "forecast", "forecast"
```

```text
Expected pattern: /broken-tool/i
Received function did not throw
```

Committed as `ae68f24`, pushed, merged with `origin/main` (already current), and confirmed the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}