Added and pushed the direct acceptance tests in commit `91a17cf`. The only test run was:

`npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`

The red output includes:

> Expected substring: "location"  
> Received string: "forecast"

and:

> Expected substring: "weather"  
> Received function did not throw

The valid extra-property pass-through test passed. The branch is synced with `origin/main` and clean. The red bar covers registry behavior; exact compile counts and tool-loop retry remain listed in the DoD for separate review or coverage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}