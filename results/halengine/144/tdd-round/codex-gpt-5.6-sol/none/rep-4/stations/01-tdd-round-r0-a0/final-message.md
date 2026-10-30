Completed and pushed one TDD round for `list_sessions` frame validation.

- Added one initially failing validation test, now green.
- Added sanitized paging validation and the minimal incoming message type.
- Updated spec traceability and `.lore/dod.md`.
- Test result: 1 passed; 1 red test was mine, 0 regressions.
- Commit: `ba0a6bd`
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames with optional paging fields and sanitized unknown fields","tdd_next":"Add and export ListSessionsMessage, SessionSummaryFrame, and SessionListMessage protocol types"}}