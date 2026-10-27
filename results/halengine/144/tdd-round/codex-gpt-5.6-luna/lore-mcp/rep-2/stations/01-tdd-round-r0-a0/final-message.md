Implemented and pushed validator support for `list_sessions` paging:

- Added `ListSessionsMessage` and exports.
- Validated limits, cursors, and ignored `userId`.
- Added traceability citation and ticked the validator facet.
- Authored test: red, then green after implementation/refactor.
- Commit: `41bef4f`
- Branch synchronized with upstream.
- CI verdict unavailable (Lore returned 404).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Add and wire list session handling"}}