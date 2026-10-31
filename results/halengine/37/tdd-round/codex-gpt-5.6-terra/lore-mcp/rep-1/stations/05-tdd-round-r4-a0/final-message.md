Added and linked a unit test proving schema-valid input preserves undeclared keys unchanged. Also repaired the prior CI typecheck and lint failures in validation error handling.

Targeted test passed: `src/orchestration/tools/registry.test.ts`.

Committed and pushed `f1ae1be`; branch is current with upstream. Red tests: 1 mine during setup, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a registry unit test proving schema-valid input reaches the executor unchanged when it contains an undeclared extra property","tdd_next":"Add the remaining unit tests, documentation, changelog, and version updates"}}