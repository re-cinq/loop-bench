Branch is pushed and up to date. 

This round implemented all 4 implementation facets for the `list_sessions` / `session_list` WebSocket protocol:

1. **Types** — added `ListSessionsMessage`, `SessionSummaryFrame`, `SessionListMessage` to `messages.ts`, added them to the `IncomingMessage` and `OutgoingMessage` unions, and re-exported from `index.ts`
2. **Validation** — added `list_sessions` case in `validation.ts` validating limit (non-negative integer) and before cursor (1–128 char sessionId + parseable updatedAt), stripping unknown fields like `userId`
3. **Threading** — `createMessageHandler` now accepts optional `sessionStore` parameter, wired from `createServer.ts`
4. **Handler** — `handleListSessions` reads `session.userId` (not the frame's userId), calls `sessionStore?.listFor?.(...)`, serializes Date fields to ISO strings, returns empty list when no listFor, logs `log.error('ws', ...)` and sends `SERVER_ERROR` on rejection

Unrelated smell noticed but not touched: `answerFrame` doesn't await its call in `answerUserMessage` — harmless for existing behavior since ping is synchronous, but worth noting.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"all implementation facets: types, validation, sessionStore threading, list_sessions handler","tdd_next":"documentation facet: spec.md updates for list_sessions and session_list frames"}}