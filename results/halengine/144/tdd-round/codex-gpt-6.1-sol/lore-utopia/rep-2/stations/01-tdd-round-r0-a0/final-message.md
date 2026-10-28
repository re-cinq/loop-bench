Committed and pushed `8c32356`: bare `list_sessions` validation strips extra identity fields.

One new test failed as expected, then passed. No regressions observed; acceptance tests were not run. Branch is current with main and fully pushed.

Next: pagination validation. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions frames and strip unknown fields","tdd_next":"Validate list_sessions limit and before pagination fields"}}