Defined and pushed the `direct` acceptance contract in commit `429faa2`.

Added:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/ffee0bde312a/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [validation spec](/var/tmp/loop-bench/runs/ffee0bde312a/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [Definition of Done](/var/tmp/loop-bench/runs/ffee0bde312a/workspace/target/.lore/dod.md)

The targeted run produced three intended failures:

```text
Expected: location required rejection with no executor call
Received: { result: "forecast", received: [{}] }

Expected schemaReads: > 0
Received: 0

Expected pattern: /query.*number|number.*query/i
Received string: "found"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

Branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}