This round implemented limit validation for the `list_sessions` message, completing the "Reject invalid limit values" facet through one TDD cycle:

**Changes made:**
- Fixed the vitest import issue in validation.test.ts (project uses Jest, not Vitest)
- Added a focused test case for rejecting invalid limit values (0, negatives, floats, >200, non-integers)
- Implemented limit validation in `validateListSessionsMessage()` requiring integers 1–200
- Updated `.lore/dod.md` to mark the facet complete
- All 5 tests pass

The next facet to work on is validating the `before` cursor structure (object type, sessionId length 1–128, valid updatedAt date string).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid limit values (non-integer, negative, >200)","tdd_next":"Reject invalid before cursor (not object, invalid sessionId, invalid updatedAt)"}}