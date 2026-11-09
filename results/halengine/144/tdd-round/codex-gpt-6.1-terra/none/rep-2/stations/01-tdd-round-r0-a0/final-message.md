Implemented and pushed validation for `list_sessions` pagination, including stripping unknown fields. The new test passed; it was the only test run. The branch is up to date with `origin/main` and its upstream.

The graph query tool was unavailable, so coverage was inspected locally. The existing mismatch between the ticket’s `list_conversations` contract and the checklist’s `list_sessions` contract remains for a later round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Complete and export session list protocol types"}}