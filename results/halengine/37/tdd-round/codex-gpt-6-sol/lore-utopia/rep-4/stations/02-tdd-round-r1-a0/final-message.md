Committed and pushed `3d70b40`. The new test failed before the change and passed after it: missing required input now returns a tool rejection before the executor runs. I also addressed the CI findings reported in the round brief and updated the spec links.

Only `registry.test.ts` ran locally; it passed. This round had **1 red test of mine and 0 regressions**. The next facet is caching validators for function-valued definitions by schema object reference. CI will judge the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate tool input before execution and return a safe rejection for missing required fields","tdd_next":"Cache validators for function-valued tool definitions by schema object reference"}}