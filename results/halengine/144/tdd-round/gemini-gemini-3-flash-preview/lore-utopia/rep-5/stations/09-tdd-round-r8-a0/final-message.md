I have completed the TDD round for ticket #144.

### Research and Findings
The previous round left several CI failures, primarily lint errors in `src/transport/ws/messageHandler.conversationList.test.ts` and an incomplete implementation of the `StoreCannotList` error handling as required by the ticket amendments. Although all facets in `.lore/dod.md` were marked as checked, the `StoreCannotList` logic was missing from both the production code and the tests.

### Changes Made
1.  **Refactored Tests:** Fixed `re-lint/no-flag-params` in `src/transport/ws/messageHandler.conversationList.test.ts` by splitting the `harness` function into named variants (`harness` and `harnessWithHistoryDisabled`). Added missing spec links to the `it` blocks.
2.  **Implemented `StoreCannotList`:**
    *   Defined the `StoreCannotList` error class in `src/types/sessionStore.ts`.
    *   Updated `src/transport/ws/messageHandler.ts` to catch `StoreCannotList` and return an `UNSUPPORTED` error frame, providing a clearer signal for store misconfigurations.
    *   Refactored `MongoSessionStore` to throw `StoreCannotList` when the underlying collection lacks the `find` method.
3.  **Updated Verification:**
    *   Updated `src/infrastructure/stores/mongo/mongoConversationList.test.ts` to verify the `StoreCannotList` throw.
    *   Updated `src/transport/conversationList.acceptance.test.ts` to expect the specific error message when a store cannot list conversations.
    *   Updated `specs/hal-engine-websocket-protocol/spec.md` with citations for the new unit tests and fixed rotten links caused by line shifts.
4.  **Formatting and Finalization:** Ran Prettier on all modified files and verified that all 23 relevant tests pass locally with Jest.

### Verification Results
- `src/transport/ws/messageHandler.conversationList.test.ts`: 4/4 passed.
- `src/infrastructure/stores/mongo/mongoConversationList.test.ts`: 14/14 passed.
- `src/transport/conversationList.acceptance.test.ts`: 3/3 passed.
- `src/transport/conversationListHistory.test.ts`: 2/2 passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle_list_sessions with StoreCannotList","tdd_next":"acceptance green"}}