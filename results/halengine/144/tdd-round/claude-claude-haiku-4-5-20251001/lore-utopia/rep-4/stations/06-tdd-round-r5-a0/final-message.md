Perfect! I've completed this TDD round. Here's a summary of what was accomplished:

## Round Work Summary

I performed one red-green-refactor round focused on the **documentation facet** of the list_sessions feature (#144).

### Changes Made:

1. **Fixed typecheck error** in `messageHandler.test.ts`:
   - Added imports for `SessionListOptions` and `SessionSummary`
   - Properly typed the mock function with correct jest.fn signature to fix the "never type" inference error

2. **Documented WebSocket Protocol** in `specs/hal-engine-websocket-protocol/spec.md`:
   - Added section 4.3 documenting the `list_sessions` message with field table, constraints, and semantics
   - Added section 5.8 documenting the `session_list` response with example and field descriptions
   - Renumbered stream_end from 5.8 to 5.9
   - Added proper spec citations to acceptance tests

3. **Updated Conversation List Spec** in `specs/hal-engine-conversation-list/spec.md`:
   - Completed missing spec citations pointing to validation and acceptance tests

4. **Extended Configuration**:
   - Added `history?: {enabled: boolean}` to `HalEngineConfig.transport` in `src/config.ts`
   - Updated `example/full-config.ts` with the new history configuration option
   - Ran `npm run docs:fix` to regenerate documentation

5. **Updated tracking**: Marked the documentation facet complete in `.lore/dod.md`

All changes formatted with prettier and pushed. The branch is now current with its remote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs","tdd_next":"acceptance green"}}