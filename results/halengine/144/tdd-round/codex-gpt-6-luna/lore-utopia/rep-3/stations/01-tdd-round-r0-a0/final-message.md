**Delivered one round:** added and exported the `list_sessions` frame types, implemented its validation, and documented the tested validation behavior. Updated the two corresponding DoD facets.

The test I wrote failed before the implementation and passed afterward. **Red tests:** 1 of mine; 0 regressions reported. I ran no other tests. Formatter and diff checks passed. Commit `4ad04e2` was pushed, and the branch is synced with its upstream.

Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions frame types and validation","tdd_next":"thread sessionStore into createMessageHandler"}}