Added and pushed commit `7e06f1d` with a direct acceptance test and its spec anchor. The working tree is clean and the branch is up to date with its upstream; `origin/main` was already merged.

The named acceptance test fails for the reported behavior: `ToolRegistry.execute` invokes the executor and returns `"forecast"` when required `location` is missing.

> Expected: `"calls": 0`, result containing `"location"`.  
> Received: `"calls": 1`, result: `"forecast"`.

Only `src/orchestration/tools/registry.acceptance.test.ts` was run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}