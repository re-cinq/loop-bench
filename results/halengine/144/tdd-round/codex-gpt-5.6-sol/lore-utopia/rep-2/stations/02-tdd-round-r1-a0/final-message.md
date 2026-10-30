Completed and pushed commit `b2a85c6`.

- Closed store threading and `list_sessions` handling facets.
- RED: 1 new test failed as expected; GREEN: that test passed after implementation.
- Prior CI reds: acceptance tests only; 0 regressions.
- Cleared all reported lint/changelog findings.
- Branch is clean, merged with current `origin/main`, and fully pushed.
- Next facet: protocol and conversation-list documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into createMessageHandler and handle list_sessions","tdd_next":"document list_sessions and session_list in both protocol specs"}}