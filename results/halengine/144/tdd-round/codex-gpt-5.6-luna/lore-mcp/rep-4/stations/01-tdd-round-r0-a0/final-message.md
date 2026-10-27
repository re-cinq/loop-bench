Implemented one TDD round for conversation-list validation.

- Added protocol types and `list_conversations` validation.
- Added and passed the focused validator test.
- Updated spec traceability and DoD facet.
- Committed/pushed: `fa85e11`.
- Main was already up to date.
- No regressions observed; one test was intentionally red, then green.
- CI verdict unavailable (Lore returned 404).

Remaining facets: handler/store integration, config opt-in, errors, docs, and acceptance updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_conversations frames","tdd_next":"Thread conversation-list handling through the WebSocket message handler"}}