Committed and pushed `3ddfc65`: bare `list_sessions` validation, with client `userId` discarded.

One new test went red → green and passed after refactoring. Observed regressions: 0; acceptance tests left to CI. Branch is current with main, fully pushed, and clean.

Next: pagination validation. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions requests without forwarding client userId","tdd_next":"Validate list_sessions limit and before pagination fields"}}