Perfect! One TDD round is complete. Here's the summary:

**Round completed:**

1. **RED**: Wrote a failing test in `src/transport/ws/validation.test.ts` — `accepts a bare list_sessions frame`
2. **GREEN**: Implemented minimal code to make the test pass:
   - Added `ListSessionsMessage`, `SessionListMessage`, `SessionCursorFrame`, `SessionSummaryFrame` types to `src/types/messages.ts`
   - Added complete validation for `list_sessions` frames in `src/transport/ws/validation.ts` (limit 1-200, before cursor validation, field stripping)
   - Exported new types from `src/index.ts`
3. **REFACTOR**: Code is already minimal and clear — no further refactoring needed

Test suite passes, commit pushed, branch up to date with main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"message types and validation","tdd_next":"thread sessionStore into createMessageHandler"}}