Completed one round for required-property rejection. Added Ajv and the MINOR version bump, implemented the rejection response, added one focused test with a spec anchor, and updated the changelog and DoD.

The new test was red before the implementation and passed after refactoring. No acceptance tests, lint, typecheck, or build were run. Lore had no CI verdict for this branch. Red tests this round: 1 authored, 0 regressions. Commit `5906f1c` is pushed; the branch is up to date with `origin/main` and its upstream.

Next: compile static schemas at registration and cache function-produced schemas.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Ajv dependency and MINOR package version; required-property rejection test and implementation","tdd_next":"Compile static schemas at registration and cache function-produced schemas"}}