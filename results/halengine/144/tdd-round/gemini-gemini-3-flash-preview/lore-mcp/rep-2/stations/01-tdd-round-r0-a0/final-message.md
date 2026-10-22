I have completed one TDD round for ticket #144.

In this round, I implemented the first two facets of the `list_sessions` feature:
1.  **Message Types**: I added `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, updated the `IncomingMessage` and `OutgoingMessage` unions, and exported these types from `src/index.ts`.
2.  **Validation**: I implemented the validation logic for `list_sessions` frames in `src/transport/ws/validation.ts`, supporting optional `limit` and `before` cursor validation while stripping unknown fields like `userId`.

I followed the TDD cycle:
- **Red**: Added new test cases to `src/transport/ws/validation.test.ts` for `list_sessions`, which initially failed.
- **Green**: Implemented the types and validation logic, resulting in all validation tests passing.
- **Refactor**: Verified the code structure and formatting (Prettier reported no changes needed).

I updated `.lore/dod.md` to reflect the completed work. The changes have been committed and pushed to the branch `loop-bench/144`. I also verified that the branch is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"message validation for list_sessions","tdd_next":"threading sessionStore into createMessageHandler"}}