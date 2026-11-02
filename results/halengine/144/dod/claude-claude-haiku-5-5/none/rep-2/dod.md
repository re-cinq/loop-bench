# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` and a real WebSocket upgrade, as `wsTestSupport.ts` and `sessionResume.test.ts` already drive it, with `InMemorySessionStore.listFor` (#143, #146) already shipped. Nothing answers `list_conversations` on the socket yet, so the tests fail on the missing handler. `transport.history` is not in the option types yet, so the test passes it through a non-literal options object to keep the type check from failing for the wrong reason.

## Done when these pass

- [ ] **answers the connection's user's conversations newest first, with ISO-string times and no stream_end** — a `list_conversations` frame on a socket opened by `u1`, with history enabled, is answered with one `conversation_list` whose rows are `u1`'s seeded conversations, newest activity first, each time an ISO string.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers with the connecting user's own list even when the frame names another user** — a frame carrying `userId: 'u2'` is answered with `u1`'s list only; `u2`'s conversation never appears.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `list_conversations` to `IncomingMessage` and `conversation_list` to `OutgoingMessage` in `src/types/messages.ts` (additive only).
- [ ] `validation.ts`: a `list_conversations` case, `limit` an integer 1–200 when present, `before` a cursor when present; anything else is `INVALID_MESSAGE`.
- [ ] `createMessageHandler` takes the session store and history options, and answers `list_conversations` off the per-session lock beside `ping`.
- [ ] The user id comes from `ws.userId`, never the frame (test 2 pins this).
- [ ] `HalEngineConfig.transport.history` (default off) threaded through `createServer`; with it off, the frame is answered with an `error` of code `UNSUPPORTED`.
- [ ] A store without `listFor` is answered with an `error`, not an empty list.
- [ ] Paging by `before` cursor, `limit` pass-through to `listFor`.
- [ ] Spec, CHANGELOG, `example/full-config.ts` and `npm run docs:fix` as the ticket's documentation criteria.

## Out of scope

- The opt-in-off `UNSUPPORTED` answer, the store-without-`listFor` answer, the store-failure answer, the lock-bypass ordering, and the resume-by-`sessionId` round trip. The ticket states each of these; they are facets above, not acceptance tests in this round, to keep the red bar to the central claim.
- A preview or title on the summaries, deleting a conversation from the client, server-side paging state, operator views of other users' conversations, and live sync between tabs (ticket #144 "Out of scope").
- Red bar: run here as `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/ws/conversationList.acceptance.test.ts`, both tests fail with `INVALID_MESSAGE` (unknown message type). CI runs the whole suite, this file included, in the `Verify` job of `.github/workflows/ci.yml`, step "Test (with coverage floor)": `npm run test:coverage`.