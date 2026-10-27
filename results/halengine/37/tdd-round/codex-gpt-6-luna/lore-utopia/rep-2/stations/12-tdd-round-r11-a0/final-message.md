Added an orchestrator unit test for a schema rejection followed by a corrected retry, linked it from the spec, and fixed the CI status mismatch. The test passed; no production code needed changing because the behavior was already implemented. **Red tests: 0; regressions: 0.**

The remaining DoD facet is updating the example and documentation. Commit `4436f71` is pushed, the branch is up to date with `main`, and the working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Orchestrator unit test for schema-rejection retry","tdd_next":"Update the example and documentation"}}