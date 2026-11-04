Perfect! I've successfully fixed all the CI failures that were preventing the ticket from completing:

**Eslint fixes:**
- Extracted a shared `cleanupConnections` helper function to `wsTestSupport.ts`, eliminating 10 lines of duplicate code in test teardown
- Refactored `validation.ts` to replace the 3-way switch dispatch with a lookup table (polymorphism)
- Flattened nested conditions by extracting `isInvalidLimit` predicate and checking limit validation early
- Renamed vague variable `data` to `validated` for clarity
- Simplified message handler logic in `conversationList.acceptance.test.ts` with early returns

**Spec-names fixes:**
- Added proper test names to all spec citations in `hal-engine-session-resume/spec.md`
- Corrected line numbers to point to actual `it()` statements (394, 235, 442, 478, 402)

All changes have been formatted with prettier, committed, and pushed. The branch is up to date with main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"build fixes","tdd_next":"acceptance green"}}