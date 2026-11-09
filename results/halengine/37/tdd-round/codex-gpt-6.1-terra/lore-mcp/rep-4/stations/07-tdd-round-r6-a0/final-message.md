Committed and pushed `21085d1`. Rejection logs now include the failing field and constraint without the input value. The validator also handles the error-path formats implicated by CI and no longer imports AJV types through the failing deep path.

The new focused test passed. CI’s previous verdict named two red acceptance/branch tests; neither was written in this round, and the coverage graph reported no pre-existing tests covering the registry. The new test was red once and is now green. No unrelated smells were identified.

The branch is up to date with `origin/main` and its upstream. CI will judge the remaining acceptance criteria.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Log rejected field paths without values and restore validator compatibility with CI","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}