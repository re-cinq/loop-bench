Branch is pushed and up to date. The fix was straightforward: split the test at line 35 that had two `expect` calls into two separate tests, satisfying the `re-lint/max-expects` rule (max 1 per test). All 8 tests pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"split two-expect test to fix eslint max-expects violation","tdd_next":"acceptance green"}}