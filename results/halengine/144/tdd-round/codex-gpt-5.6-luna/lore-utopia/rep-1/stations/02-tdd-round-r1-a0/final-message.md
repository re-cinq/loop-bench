Implemented and pushed commit `0ce2679`.

- Added enabled WebSocket conversation-list handling and history config.
- Uses authenticated `session.userId`, forwards pagination, serializes dates.
- Added `UNSUPPORTED` and `StoreCannotList`.
- Fixed prior validation type error.
- Added one focused test; it was intentionally red, then green.
- No acceptance suite, lint, or typecheck run.

Next facet: refusal/error paths and amended protocol documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"WebSocket handler, authenticated listing, history wiring, and ISO serialization","tdd_next":"history refusal/error paths and amended list_conversations/conversation_list protocol documentation"}}