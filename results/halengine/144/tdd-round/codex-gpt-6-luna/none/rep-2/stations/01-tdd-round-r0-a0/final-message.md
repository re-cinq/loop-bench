Implemented one round for the branch DoD’s `list_sessions` validation: added wire types, validation, and a focused test. The test failed before the implementation and passed afterward. **One red test was mine; zero regressions were identified.**

Committed and pushed `7546154`; the branch is up to date with `origin/main` and not ahead of its upstream. Ran only my test; acceptance tests were not run.

The ticket says `list_conversations`, while the branch DoD and spec say `list_sessions`. I followed the DoD; that mismatch remains for the next round. The next facet is threading `sessionStore` into the message handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions wire types and frame validation","tdd_next":"thread sessionStore into createMessageHandler and createServer"}}