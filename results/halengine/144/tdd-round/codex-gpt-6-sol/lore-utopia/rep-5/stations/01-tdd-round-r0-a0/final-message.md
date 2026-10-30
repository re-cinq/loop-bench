Committed and pushed one round (`cb2002c`). The new `list_sessions` validator test failed before the change and passed after the refactor. Red tests: 1 written this round, 0 regressions. The branch is up to date with `main` and its upstream.

The next facet is threading `sessionStore` into the message handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add and validate list_sessions protocol types and frames","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}