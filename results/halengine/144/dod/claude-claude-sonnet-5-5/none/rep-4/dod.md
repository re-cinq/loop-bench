# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer`, `validateMessage` and `SessionStore.listFor` (#143) already exist, so the tests drive a real engine over a real socket and fail because `list_conversations` is an unknown frame today.

## Done when these pass

- [ ] **rejects a list_conversations frame whose limit or before is out of range** — bare frame valid; `limit` 0, 201, 1.5, '10' and `before: 'not a date'` invalid, naming the field.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connecting user their own list, newest first with ISO times, whatever userId the frame carries** — one `conversation_list`, no `stream_end`, ISO strings, `listFor` called with `ws.userId` and the frame's `limit`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, never a list, when history is off or the store cannot list** — `transport.history` absent, or a store with no `listFor`, gives one `error` frame coded `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list while a user_message is still streaming on the same session** — answered off the per-session lock, before `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the frames and `UNSUPPORTED` to `src/types`, and the `list_conversations` case to `validation.ts`.
- [ ] Thread `history` through `HalEngineConfig.transport` and `createServer`; pass store and options to `createMessageHandler`.
- [ ] Answer `list_conversations` beside `ping` from `ws.userId`; `UNSUPPORTED` when off or `listFor` is missing.
- [ ] `listFor` rejection gives `SERVER_ERROR` with no store detail; `StoreCannotList` gives `UNSUPPORTED`.
- [ ] Specs, `example/full-config.ts` + `npm run docs:fix`, CHANGELOG, startup warning for history without resume.

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, operator views of other users, live tab sync.
- Not yet pinned (owed by later rounds): `listFor` rejection logging, resume via a listed id, `ConnectedMessage` unchanged, the spec/GDPR/CHANGELOG/doc criteria.