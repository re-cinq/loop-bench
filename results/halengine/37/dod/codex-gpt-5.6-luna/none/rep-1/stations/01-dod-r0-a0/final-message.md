Added and pushed commit `f5f2404`.

- Strategy: `direct`
- Acceptance test: [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/a5761369615b/workspace/target/src/orchestration/tools/registry.acceptance.test.ts:4)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/a5761369615b/workspace/target/.lore/dod.md)
- Spec anchor added: [spec.md](/var/tmp/loop-bench/runs/a5761369615b/workspace/target/specs/hal-engine-tool-input-validation/spec.md)

Test command:

```text
npm test -- --runInBand src/orchestration/tools/registry.acceptance.test.ts
```

Failure:

```text
Expected pattern: /location.*required/i
Received string:  "forecast"
```

The branch is pushed, clean, and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}