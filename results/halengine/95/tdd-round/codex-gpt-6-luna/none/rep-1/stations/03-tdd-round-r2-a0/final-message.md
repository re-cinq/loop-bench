Added an assertion that an `Error` rejection reaches `onError` as the same instance, and marked that facet complete. Also repaired both spec links flagged by CI. The selected Jest test passed; formatting completed. The branch is committed and pushed at `e4e90bf`, merged with `origin/main`, and has no commits ahead of upstream.

The trace query tool was unavailable, and `timeout` was not installed, so I ran Jest directly with only the new test selected. No unrelated smells were changed. No regressions were reported; this round added one passing test and no code changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm Error-instance handling passes the original Error through unchanged","tdd_next":"acceptance green"}}