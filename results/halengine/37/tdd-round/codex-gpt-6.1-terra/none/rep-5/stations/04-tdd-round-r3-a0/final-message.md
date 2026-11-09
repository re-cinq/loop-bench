Committed and pushed `483eb5b`. Rejected tool input now logs the failing path and constraint without the input value. The new logging test failed before the change and passed afterward. AJV loading and validator caching were also adjusted for the reported CI errors.

The prior CI verdict showed one red test written on this branch and one provider test failure; the truncated provider output does not establish whether it was a regression or its cause. The graph coverage query was unavailable, and the provider failure remains unresolved. CI must verify the typecheck and lint fixes.

The branch is up to date with `origin/main` and its upstream. The remaining facet is the unit tests and documentation listed in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Log rejected input paths and constraints without input values","tdd_next":"Add remaining unit tests and update tool validation documentation"}}