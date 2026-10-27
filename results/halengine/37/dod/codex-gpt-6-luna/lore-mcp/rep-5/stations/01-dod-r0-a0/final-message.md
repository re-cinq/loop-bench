Added the direct acceptance suite and its issue spec/DoD. The tests exercise schema rejection, unchanged extra properties, function-resolved schemas, invalid schemas at registration, unknown-tool errors, and the orchestrator retry path. No production code was changed.

The targeted run produced **4 failed, 1 passed**. For example:

> Expected `location` validation errors and no executor calls; received `result: "forecast"` and the executor received `{}` and `{location: 8675309}`.

The red bar is in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/71d282e4b93c/workspace/target/src/orchestration/tools/registry.acceptance.test.ts:14). The spec is [spec.md](/var/tmp/loop-bench/runs/71d282e4b93c/workspace/target/specs/hal-engine-tool-input-validation/spec.md), and the DoD is [.lore/dod.md](/var/tmp/loop-bench/runs/71d282e4b93c/workspace/target/.lore/dod.md).

Committed as `ea2c81a`, pushed, and confirmed the branch is even with its upstream. `origin/main` was already up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}