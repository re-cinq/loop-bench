I have completed the TDD round. The `list_sessions` message and `session_list` message have been added to the protocol types, and the `validateMessage` function has been updated to correctly validate `list_sessions` frames (checking `limit` and the `before` cursor with `sessionId` and `updatedAt`, while stripping unknown fields).

The test `src/transport/ws/validation.test.ts` was run and passed locally in this container. No existing acceptance tests were run or modified, leaving them to CI to report status.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler"}}