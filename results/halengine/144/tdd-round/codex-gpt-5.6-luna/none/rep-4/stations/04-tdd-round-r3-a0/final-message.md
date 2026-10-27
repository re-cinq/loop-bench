Completed and pushed commit `958df3c`.

- Added max page-size validation (1–200) with a focused test.
- Fixed all five reported ESLint issues and updated traceability/DoD.
- Focused test: 6 passed.
- No regression tests; 1 intentionally red test during TDD.
- Branch is merged with `origin/main` and synchronized.

Lore trace tooling was unavailable in this pod; lint/typecheck/acceptance suites were not run per instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"bounded list_sessions validation and CI lint repairs","tdd_next":"acceptance green"}}