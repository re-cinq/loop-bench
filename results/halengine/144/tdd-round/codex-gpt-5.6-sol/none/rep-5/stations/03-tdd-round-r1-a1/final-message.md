Implemented and pushed one TDD round:

- Added protocol list frame types and exports.
- Wired `sessionStore` into the message handler.
- Added authenticated `list_sessions` handling with ISO dates.
- Added changelog/spec traceability updates.
- Test: 1 RED written, now green; 0 regressions.
- Branch is synchronized with upstream.

Next facet: missing/throwing `listFor` error behavior and WebSocket logging.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire the session store and answer list_sessions for the authenticated user","tdd_next":"Handle missing or throwing listFor with the required response and ws logging"}}