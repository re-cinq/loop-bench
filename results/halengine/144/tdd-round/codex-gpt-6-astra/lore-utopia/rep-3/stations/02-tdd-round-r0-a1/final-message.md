Committed and pushed `4bd3aa6`: `list_sessions` validation.

One new test went red → green and passed after refactoring. No regressions observed; acceptance tests were not run. CI had no branch record.

Branch is clean, pushed, and current with `main`. Next: thread the session store into message handling. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions paging fields and strip unknown fields","tdd_next":"Thread sessionStore into createMessageHandler and wire createServer"}}