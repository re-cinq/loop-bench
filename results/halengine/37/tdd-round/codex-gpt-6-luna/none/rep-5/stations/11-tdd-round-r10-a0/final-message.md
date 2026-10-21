Added a required-property rejection test and updated the spec links. The registry test passed (8 tests). The prior CI verdict also named an ESLint finding in `registry.ts` and test failures, but their details weren’t available in the round brief; those findings may still need follow-up. I couldn’t query lore’s coverage graph because its tools weren’t available.

Committed and pushed as `39e95b2`; the branch is up to date with `origin/main`. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Required-property rejection unit test and stale spec-link/lint repairs","tdd_next":"Remaining unit and orchestrator tests, documentation, and changelog work"}}