# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are the two seams; both are callable in-process, so the tests instantiate real stores, real validation, and a real handler factory and exercise the protocol without a network.

## Done when these pass

- [ ] **validateMessage accepts list_conversations and rejects out-of-range limit and non-cursor before** — validator recognises the new frame type, passes valid shapes, and rejects `limit` outside 1–200 (including floats and strings) and a `before` that is not a cursor object
      `src/transport/ws/conversationList.acceptance.test.ts:77`

- [ ] **answers conversation_list from ws.userId with ISO-string dates and no stream_end** — handler calls `listFor` with the session's own `userId` (ignoring any `userId` in the frame), returns a `conversation_list` frame with the right count, serialises both times as ISO strings, and emits no `stream_end`
      `src/transport/ws/conversationList.acceptance.test.ts:102`

- [ ] **answers UNSUPPORTED when history is off or the store lacks listFor, SERVER_ERROR when listFor rejects** — `UNSUPPORTED` for disabled history and for a store with no `listFor`; `SERVER_ERROR` for a `listFor` that throws; no `conversation_list` frame in any error path
      `src/transport/ws/conversationList.acceptance.test.ts:130`

- [ ] **answers list_conversations before the user_message stream_end of a concurrent turn** — a `list_conversations` sent while a streaming turn is in flight resolves before that turn's `stream_end`, proving the handler bypasses `PerSessionLock`
      `src/transport/ws/conversationList.acceptance.test.ts:156`

## Facets

- [ ] `IncomingMessage` gains `ListConversationsMessage {type: 'list_conversations'; limit?: number; before?: SessionCursor}`
- [ ] `OutgoingMessage` gains `ConversationListMessage {type: 'conversation_list'; conversations: ConversationSummary[]}`
- [ ] `ErrorCodes` gains `UNSUPPORTED`
- [ ] `createMessageHandler` accepts orchestrator, store, and options (with `history?: {enabled: boolean}`)
- [ ] `list_conversations` handling is off the `PerSessionLock` path, alongside `ping`
- [ ] `HalEngineConfig.transport.history` opt-in threaded through `createServer`

## Out of scope

- Pagination: `limit` and `before` reach `listFor` but paging UI is not tested here
- `StoreCannotList` sentinel (amendment — answered `UNSUPPORTED` instead of `SERVER_ERROR`)
- Resume path: picking a conversation via `?sessionId=` is covered by existing #45 tests
- GDPR spec annotations and `docs/getting-started.md` update
- `CHANGELOG.md` and version bump
- `ConnectedMessage` changes (there are none)