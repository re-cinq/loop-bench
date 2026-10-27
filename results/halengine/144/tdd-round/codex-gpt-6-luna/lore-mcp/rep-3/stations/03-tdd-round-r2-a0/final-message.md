Implemented and pushed the store wiring and `list_sessions` handler. The focused test failed before the implementation and passed after formatting. One test was red during this round; zero regressions were reported. The CI lookup returned 404 before the branch update. The branch is clean and not ahead of its upstream.

Next DoD facet: document the list frames in the protocol specs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and handle list_sessions","tdd_next":"Document list_sessions and session_list in the protocol specs"}}