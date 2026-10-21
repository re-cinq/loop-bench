Implemented static schema compilation at registration, schema validator caching by object reference, and the Ajv options typing fix. The compile-once test passed after formatting. Committed and pushed as `2c73aee`; the branch is clean and up to date with `origin/main`.

The round’s one red test was mine; **zero regressions were identified**. The prior CI excerpt’s test failure is truncated, so its failing test can’t be identified here. CI also reported lint issues inside the acceptance test; I left that test unchanged as instructed. The Lore trace query tool was unavailable.

Next: bump the package version to MINOR and address remaining CI findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at registration and cache validators by schema object reference","tdd_next":"Bump package version MINOR and resolve remaining CI findings"}}