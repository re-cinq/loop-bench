Committed and pushed `f9244a1`; the branch is up to date with its upstream and `origin/main`.

The change targets CI’s Ajv resolution errors and consolidates the assertions flagged by lint. The new field-path test passes locally, but it **did not fail before the fix**: this checkout resolves Ajv 8, while CI’s errors indicate Ajv 6. The requested red phase therefore was not reproduced; CI must judge the fix.

The prior CI report named one failing test from this ticket and no regressions. The remaining facet is the unit tests, spec links, and documentation listed in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI-reported Ajv resolution and rejection logging and consolidate unit test assertions","tdd_next":"Remaining unit tests, spec links, and documentation"}}