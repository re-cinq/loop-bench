Added the five-test acceptance suite and its spec citations in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/1d4449bed6c8/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), plus the `direct` DoD in [.lore/dod.md](/var/tmp/loop-bench/runs/1d4449bed6c8/workspace/target/.lore/dod.md). No production code was changed.

Ran only `npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`. All five tests fail on missing validation behavior. For example:

> Expected: `/location.*required/i`  
> Received string: `"forecast"`

The invalid-schema registration test also reports:

> Expected function to throw; received function did not throw

Committed as `39bd688`, pushed to `origin/loop-bench/37`, merged the up-to-date `origin/main`, and confirmed the branch is not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}