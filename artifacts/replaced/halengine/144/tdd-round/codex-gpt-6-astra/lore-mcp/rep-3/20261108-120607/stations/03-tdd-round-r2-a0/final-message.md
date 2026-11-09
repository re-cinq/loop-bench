Committed and pushed `09451d2`: cursor validation and both reported lint fixes.

One new test went red → green and passed after refactoring. No regressions were reported; acceptance failures remain for CI. Branch is synchronized with main and upstream.

Next: thread the session store into the message handler. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions pagination cursors and strip unknown fields","tdd_next":"Thread sessionStore into createMessageHandler and wire createServer"}}