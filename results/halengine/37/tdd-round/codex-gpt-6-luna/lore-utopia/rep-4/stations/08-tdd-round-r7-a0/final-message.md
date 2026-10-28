Fixed nested required-property path formatting and added a regression test linked to the spec. The focused test passed; I did not run acceptance tests. The branch is committed and pushed, and it is up to date with `origin/main`.

The CI failure was the prior round’s nested-path test; no new red test or separate regression was observed. One limitation: this checkout did not reproduce CI’s `/location/.city` output, so the new focused test passed before and after the fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize nested required-property paths without an extra dot","tdd_next":"Add the remaining unit tests and documentation updates"}}