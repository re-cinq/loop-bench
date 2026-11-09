Cached dynamic schema validators by object reference and corrected the Ajv import implicated in the previous CI failures. The focused test passed, and commit `f218af1` was pushed; the branch is up to date with its upstream and `origin/main`.

The previous CI verdict named three failing test suites added on this branch and no pre-existing regression tests. CI will verify the import and typecheck fixes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"cache dynamic schema validators by object reference","tdd_next":"complete dependency and minor version facet"}}