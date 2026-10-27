Added the extra-property pass-through test, cleaned up the CI-reported lint issues, and updated the spec links and `.lore/dod.md`. The registry test file passed: 5 tests. Commit `9b2ba1c` is pushed, and the branch is even with upstream after fetching `main`; no merge was needed.

The previous CI report showed one failing test in our registry test file; I found no regression test failures. The report’s test excerpt was truncated. I did not run the acceptance tests. Next facet: add or verify the AJV dependency and apply the minor version bump.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Valid extra properties pass through unchanged and the executor runs exactly once","tdd_next":"Add or verify ajv dependency settings and bump the package version MINOR"}}