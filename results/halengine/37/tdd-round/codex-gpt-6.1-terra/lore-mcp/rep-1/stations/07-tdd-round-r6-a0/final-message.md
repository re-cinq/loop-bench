Committed and pushed the CI repairs in `18517e1`. The new wrong-type test passed locally both before and after the changes, so it did not reproduce CI’s failure. CI must verify the validator import and lint fixes on a clean install.

The prior CI verdict reported one failing acceptance test and no identified regressions. No unrelated issues were identified. The remaining facet covers unit tests, spec links, and documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported validation path, type declarations, and lint failures","tdd_next":"Complete remaining unit tests, spec links, and documentation"}}