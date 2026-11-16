The fix is pushed. The lint error was `new Date()` making the test non-deterministic — replaced with a fixed ISO timestamp `'2024-01-01T00:00:00.000Z'`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"replaced new Date() with a fixed ISO timestamp in onErrorNonError acceptance test to satisfy re-lint/no-nondeterministic-tests"}}