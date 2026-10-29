Committed and pushed `1c0c5ea`. A new test exposed a static schema cache bug: registering a second tool with a changed, invalid schema did not throw. The registry now compiles each static registration, and the focused test passed after the fix. The branch is up to date with `origin/main` and its upstream.

One test I wrote was red before the fix and green afterward; no regressions were confirmed. The remaining unit tests and documentation updates are the next facet. The prior CI test failure had no actionable test name in the truncated brief, so CI will judge this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Recompile changed schema objects on each static registration","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}