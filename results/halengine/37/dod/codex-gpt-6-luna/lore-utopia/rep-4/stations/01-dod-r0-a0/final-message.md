Added the `direct` acceptance test and its Draft spec anchor in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/a3e017240318/workspace/target/src/orchestration/tools/registry.acceptance.test.ts) and [spec.md](/var/tmp/loop-bench/runs/a3e017240318/workspace/target/specs/hal-engine-tool-input-validation/spec.md). Recorded the triage in [.lore/dod.md](/var/tmp/loop-bench/runs/a3e017240318/workspace/target/.lore/dod.md).

Ran only the new acceptance test. It failed on the missing validation behavior:

```text
Expected pattern: /location.*required/i
Received string:  "forecast"
```

Committed as `625ad38` and pushed. `origin/main` was already merged; the branch is clean and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}