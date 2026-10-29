Committed and pushed one round. The new test failed before the fix and passed after the refactor (2 tests in that file passed). I also fixed CI’s nondeterministic timestamp finding. The branch is up to date with `main` and its upstream.

Red tests: 1 mine, 0 regressions. Next facet: pin the `undefined` rejection’s cause and caller value.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"report unstringifiable rejection values without replacing the caller rejection","tdd_next":"pin undefined rejection cause and caller value"}}