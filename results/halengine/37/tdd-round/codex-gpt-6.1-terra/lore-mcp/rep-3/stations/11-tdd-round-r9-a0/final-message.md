Committed and pushed the CI repair in `6817b67`. The branch is up to date with `origin/main` and its upstream.

The new focused test passed, but it also passed before the repair, so this round did not reproduce a local red phase. The prior CI verdict reported two suites unable to load: one acceptance suite and one existing regression suite; it did not report individual failing test counts. CI must confirm the import, type, lint and coverage repairs.

The remaining documentation and test work is tracked in `.lore/dod.md`. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv module loading, type errors, and test lint findings","tdd_next":"Confirm CI coverage after the Ajv import repair"}}