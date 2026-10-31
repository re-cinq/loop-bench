Implemented and pushed `bd0928b` (`feat(transport): validate list session frames`).

- Added `list_sessions` / `session_list` wire types and public exports.
- Added cursor and pagination validation, stripping extra fields.
- Added and ran only `src/transport/ws/validation.test.ts` successfully.
- Red tests: 1 authored; regressions: 0.
- Next facet: thread `sessionStore` into the message handler/createServer.
- Noted but did not alter two pre-existing stale acceptance-test anchors in the conversation-list spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"List-session wire types and validation","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}