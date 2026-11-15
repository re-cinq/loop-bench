Perfect! I've successfully completed this TDD round. Here's what was accomplished:

## Summary

**Facet completed:** Validate `list_sessions` frames with `before` cursor validation

### Changes Made:

1. **Fixed TypeScript errors in `validation.ts`:**
   - Properly type-guarded message fields before comparisons
   - Implemented comprehensive `before` cursor validation (object check, sessionId length 1-128, valid ISO date)

2. **Fixed ESLint issues:**
   - Extracted `delegatingTo` helper to shared `wsTestSupport.ts` (eliminating duplication across 2 test files)
   - Refactored early returns in test helper function
   - Updated spec citation line numbers after code shifts

3. **Added 5 new unit tests:**
   - Valid before cursor acceptance
   - Invalid before cursor rejection (not-object, empty sessionId, too-long sessionId, invalid date)
   - Unknown fields stripping (userId)

4. **Test Results:** All 8 validation tests pass ✓

### Files Changed:
- `src/transport/ws/validation.ts` — Added before cursor validation
- `src/transport/ws/validation.test.ts` — Added comprehensive test coverage
- `src/transport/wsTestSupport.ts` — Extracted shared test helper
- `src/transport/conversationList.acceptance.test.ts` — Removed duplication, improved readability
- `src/transport/sessionResume.test.ts` — Removed duplication
- `specs/hal-engine-conversation-list/spec.md` — Fixed test line number citations
- `.lore/dod.md` — Marked before cursor validation facet as complete

The validation layer is now complete with full support for `list_sessions` frame validation, handling both optional `limit` and `before` parameters with proper error messages.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject invalid before cursor (not object, invalid sessionId, invalid updatedAt)","tdd_next":"thread sessionStore into createMessageHandler"}}