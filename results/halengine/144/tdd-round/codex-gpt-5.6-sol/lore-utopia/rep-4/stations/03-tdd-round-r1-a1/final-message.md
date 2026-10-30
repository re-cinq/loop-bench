Completed and pushed one TDD round:

- Added `list_sessions` validation for paging fields and unknown-field stripping.
- Added and passed one focused validator test.
- Updated spec traceability, changelog, and `.lore/dod.md`.
- Initial red tests: 1 written this round; regressions: 0.
- Next facet: thread `sessionStore` through message-handler creation.
- Commit: `32f8f8d`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}