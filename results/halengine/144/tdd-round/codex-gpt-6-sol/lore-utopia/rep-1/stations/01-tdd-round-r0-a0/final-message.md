Committed and pushed `024de9c`. This round closed the `list_sessions` validation facet: the new test went red, then green, and stayed green after refactoring. I ran only that test file. One red test was mine; there were zero known regressions.

The branch is clean and level with its upstream. CI has not yet judged this push. The ticket text and branch checklist use different frame names; I followed the checklist for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames and strip unknown fields","tdd_next":"Add and export the public conversation-list message types"}}