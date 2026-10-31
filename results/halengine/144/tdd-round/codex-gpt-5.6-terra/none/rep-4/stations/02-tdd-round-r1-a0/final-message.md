Committed and pushed `7bd9940` (`feat(transport): forward list session options`).

Added a focused validator test; it failed, then passed after `limit` and `before` are preserved while `userId` remains stripped. Formatter and anchor repair ran. Only that test file was run.

The prior CI’s acceptance-test lint/changelog issues remain untouched per the instruction not to edit acceptance tests. Red phase: 1 test mine; 0 identified regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Forward valid list_sessions limit and cursor through validation while stripping userId","tdd_next":"Reject malformed list_sessions limit and before values with INVALID_MESSAGE"}}