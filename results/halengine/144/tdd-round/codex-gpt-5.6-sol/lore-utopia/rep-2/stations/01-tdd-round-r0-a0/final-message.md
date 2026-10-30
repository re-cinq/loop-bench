Implemented and pushed commit `e6c42fb`.

- Added and exported conversation-list protocol types.
- Added `list_sessions` validation, cursor checks, and unknown-field stripping.
- Added one focused test; observed red, then green after implementation/refactor.
- Updated spec traceability and DoD facets.
- Test reds: 1 authored, 0 regressions.
- Merged `origin/main` (already current); branch is fully pushed.

Next facet: thread `sessionStore` through `createMessageHandler` and `createServer`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames and expose their protocol types","tdd_next":"thread sessionStore into createMessageHandler and wire it in createServer"}}