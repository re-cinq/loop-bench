Added and pushed three acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/cd3dacba543f/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with a new spec and [.lore/dod.md](/var/tmp/loop-bench/runs/cd3dacba543f/workspace/target/.lore/dod.md). The two invalid-input tests fail for the reported behavior; the valid-input pass-through test passes.

Failure output: `Expected substring: "location" / Received string: "forecast"` in both rejection cases. The branch is synced with `origin/main` and not ahead of its upstream. Commit: `0ed81ef`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}