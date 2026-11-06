# Definition of Done

> The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — The seams exist: `validateMessage` is the validator's entry point, and `startEngineWith` (`src/transport/wsTestSupport.ts`) runs `createServer` over a real socket. Today a `list_conversations` frame is an unknown type and is answered `INVALID_MESSAGE`, which is why every test below is red. `transport.history` is passed through a non-literal options object, so the tests fail on behaviour rather than on a missing config type.

## Done when these pass

- [ ] **accepts list_conversations and refuses a bad limit or before, naming the field** — the frame validates bare and with a cursor. `limit` 0, 201, 1.5 and `'10'` are refused, and so are a `before` that is no date or only half a cursor. Each error names the field.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the connection's own user's list, newest first in ISO times, whatever user id the frame names** — with `history: {enabled: true}`, a frame carrying `userId: 'u2'`, `limit` and `before` gets exactly one `conversation_list`, which is u1's list (including the live session) with ISO times and no `stream_end`. `listFor` is recorded as called with `('u1', {limit, before})`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED and no list with history off, and with history on over a store that cannot list** — one `error` with code `UNSUPPORTED`, and no `conversation_list`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a store that rejects with SERVER_ERROR carrying no store detail, and keeps the socket open**
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a user_message is still streaming, before its stream_end** — answered off the `PerSessionLock`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary` and `ConversationCursor`, and add `UNSUPPORTED` to `ErrorCodes`. Additive only, and `ConnectedMessage` stays untouched.
- [ ] `validation.ts`: add a `list_conversations` case (`limit` 1–200 integer, `before` as a composite cursor whose `updatedAt` `Date.parse` accepts).
- [ ] `createMessageHandler(orchestrator, {sessionStore, history})`: answer the frame beside `ping`, off the lock, with `ws.userId`.
- [ ] Answer `UNSUPPORTED` when history is off or `listFor` is absent (including the exported `StoreCannotList`), and `SERVER_ERROR` for any other rejection. Log the session id only.
- [ ] Thread `HalEngineConfig.transport.history` through `config.ts` and `createServer` like `resume`, and warn at startup when history is on but resume is off.
- [ ] Docs: add the `conversation_list` frame to protocol spec § 5, a GDPR note and § 12 text, the conversation-list spec, the options type's retention note (#41), a `CHANGELOG.md` entry under Unreleased, and `example/full-config.ts` then `npm run docs:fix`. Bump MINOR.

## Out of scope

- Titles or previews on summaries, deleting a conversation from the client, server-side paging state, an operator view of another user's list, and live sync between tabs (#124).
- Switching conversation in-band: the client reconnects with `?sessionId=` on the existing #45 path.