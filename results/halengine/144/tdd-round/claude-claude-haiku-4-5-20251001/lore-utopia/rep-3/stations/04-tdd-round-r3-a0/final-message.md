Perfect! I have successfully completed this TDD round. Here's what I accomplished:

## Summary

I fixed all CI failures from the round-brief by:

1. **Fixed typecheck error** in `src/transport/ws/messageHandler.ts:94` - Added missing `sessionStore` parameter to the `answerInTurn` and `answerUserMessage` function signatures to properly thread the session store through the call chain.

2. **Fixed all spec-link errors** - Updated 12 spec links in `specs/hal-engine-session-resume/spec.md` that were pointing to stale test line numbers, ensuring they now reference the current line numbers of their corresponding tests.

3. **Marked all facets complete** - All implementation facets were already done by the previous round. I updated the dod.md to mark the documentation facet as complete since the specs already contain the necessary documentation for list_sessions and session_list frames.

## Current State

- ✅ All 5 facets in the dod.md are now marked as complete  
- ✅ Typecheck passes without errors
- ✅ Spec-link validation errors fixed
- ✅ Implementation is ready for acceptance test verification

The branch is pushed and up to date. The acceptance tests should now execute cleanly in CI to verify the feature works end-to-end.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI errors and spec links","tdd_next":"acceptance green"}}