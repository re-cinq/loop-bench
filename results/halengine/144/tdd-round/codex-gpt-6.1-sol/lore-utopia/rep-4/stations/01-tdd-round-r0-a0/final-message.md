Completed one red-green-refactor round for `list_sessions` validation. One new test failed as expected, then passed after implementation and refactoring. No regressions were reported; acceptance tests were not run.

Changes are committed and pushed. The branch is current with `main` and its upstream. Next: wire the session store into the message handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions pagination and strip unknown fields","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}