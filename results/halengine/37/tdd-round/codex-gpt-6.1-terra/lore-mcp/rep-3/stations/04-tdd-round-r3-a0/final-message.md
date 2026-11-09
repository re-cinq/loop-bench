Committed and pushed `8353c29`. The round addressed the reported Ajv interoperability, type, and lint findings and added coverage for passing valid input with extra properties unchanged. The branch is up to date with `origin/main` and its upstream.

The new test passed locally; it did not reproduce the previous CI failure. The prior verdict reported no individual failing tests: 0 were mine and 0 were identified as regressions; two test suites failed to load. CI will judge the fixes. Remaining unit tests and documentation are the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"valid input passthrough coverage and reported CI fixes","tdd_next":"remaining unit tests and documentation"}}