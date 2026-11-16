# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createServer` over a real socket already exist and are the real entry points; the `list_conversations` frame, `transport.history` option and `UNSUPPORTED` code are simply absent.

## Done when these pass

- [ ] **accepts a bare list_conversations frame and names the field of an invalid limit or before** — validator rules for `limit` (integer 1-200) and `before`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers with one conversation_list of the connecting user, ignoring a userId in the frame, and no stream_end** — list comes from `ws.userId`, ISO times, `limit` reaches `listFor`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and sends no list, when history is off or the store cannot list** — opt-in flag and missing `listFor`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a list request while a user_message is still streaming, and a listed id reconnects as resumed** — off the per-session lock; picking a row uses the #45 resume path.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Types, `ErrorCodes.UNSUPPORTED`, validator case.
- [ ] `HalEngineConfig.transport.history`, threaded through `createServer`; handler answers on the non-locked path.
- [ ] Spec, docs (`npm run docs:fix`), CHANGELOG, spec-link citations (not covered by these tests).

## Out of scope

- Previews/titles, deleting from the client, server-side paging state, operator views, live tab sync.
- `listFor` rejection logging and `StoreCannotList` detail, startup warning for history without resume (left to round tests).