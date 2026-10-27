Completed one red-green-refactor round and pushed commit `d2a86a5`. The required-property test failed first and passed after the implementation change. Added Ajv, bumped the package to `0.4.0`, and recorded the completed facets. The branch is up to date with its upstream; `origin/main` merged cleanly.

One test was mine; no regressions were identified. The broader acceptance tests were not run. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Ajv setup, schema compilation and required-property rejection","tdd_next":"report field paths and expected types without leaking values"}}