Added a static schema reuse test for ten executions, combined the required field test’s assertions, and corrected the related spec links. Committed and pushed `bd77440`; the branch is up to date with its upstream.

The `registry.test.ts` file passed. The round brief reported one failing wrong-type acceptance test; I couldn’t retrieve its full failure details because Lore tools were unavailable, and I did not run acceptance tests. No tests written this round failed; the reported acceptance failure predates this round. The `.lore/dod.md` facet remains open because its documentation work is unfinished.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Static schema reuse unit coverage and trace links","tdd_next":"Complete remaining unit tests and documentation updates"}}