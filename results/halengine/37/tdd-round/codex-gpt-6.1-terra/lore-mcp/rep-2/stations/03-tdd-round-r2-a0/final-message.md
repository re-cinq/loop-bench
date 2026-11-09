Implemented and pushed input validation before tool execution. Invalid input now returns a rejection result, and the round also addresses the three issues reported by CI.

The one new test failed before the change and passed afterward. The prior CI report showed failures in the previous round’s registry test and pre-existing tests, but its truncated output does not give a reliable regression count. The branch is up to date with `origin/main` and its upstream.

The next facet is the remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input with cached validators and return rejection responses","tdd_next":"Add remaining unit tests and update documentation"}}
