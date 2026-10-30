Completed and pushed one TDD round:

- Added and exported `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage`.
- Added a compile-contract test and spec traceability citation.
- Test went red for 3 missing exports, then green after implementation.
- Red tests: 1 ours, 0 regressions.
- Branch is merged with current `origin/main` and fully pushed.
- Next facet: validate `list_sessions` frames.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add and export conversation-list protocol message types","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}