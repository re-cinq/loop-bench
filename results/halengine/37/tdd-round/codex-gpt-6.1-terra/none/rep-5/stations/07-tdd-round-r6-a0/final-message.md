Committed and pushed `36cf041`. The registry now handles the CI-reported validation error path formats and escapes missing-property paths as JSON Pointers. The focused test passed after the fix; acceptance tests and typechecking remain for CI.

The previous CI verdict named three failing test files: one acceptance test and two branch tests; it did not name a pre-existing regression. The new test failed in the red phase and passed after the change. Broader unit coverage and documentation remain for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair validator error path compatibility and escape missing-property paths","tdd_next":"Add remaining unit tests and update tool validation documentation"}}