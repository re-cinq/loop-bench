Committed and pushed `b1b7655`. Bare `list_sessions` validation now drops supplied `userId`.

One new test went red → green; zero regressions reported. Acceptance tests were not run. Branch is current with main and upstream.

Next: paging validation. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions and discard supplied userId","tdd_next":"Validate list_sessions paging fields"}}