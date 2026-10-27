Implemented and pushed one TDD round:

- Added conversation-list message types and exports.
- Added validation for `list_conversations`.
- Refactored reported lint issues and duplicate test cleanup.
- Updated spec traceability and `.lore/dod.md`.
- Focused test passed; no acceptance suite/lint/typecheck run.
- Red tests: 1 yours, 0 regressions.
- Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_conversations frames with a 1–200 limit and ISO composite cursor","tdd_next":"Handle list_conversations over the WebSocket transport"}}