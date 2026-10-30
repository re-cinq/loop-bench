Implemented and pushed `45ba0a1` (`Add list session protocol types`).

- Added list-session protocol interfaces, unions, and public exports.
- Added bare-frame validation that strips client `userId`.
- Added one focused validation test; it passes.
- Updated spec traceability and ticked the completed types facet.
- Red tests: 1 mine; regressions: 0.
- Next facet: validate `limit` and `before`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to the protocol unions and public exports","tdd_next":"Validate list_sessions limit and before fields"}}