Completed and pushed one TDD round:

- Added `list_sessions` validation with sanitized output and field-specific errors.
- Added and passed the focused validation unit test.
- Updated spec traceability, changelog, and `.lore/dod.md`.
- Commit: `0004fbd`
- Branch is synchronized with upstream.
- Red tests this round: 1 authored, 0 regressions.
- Next facet: thread `sessionStore` into the message handler and server.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts"}}