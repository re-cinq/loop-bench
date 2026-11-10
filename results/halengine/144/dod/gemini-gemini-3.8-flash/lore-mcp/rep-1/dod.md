# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — The seam already exists in `createServer` and `startEngineWith` over a real WebSocket connection. The acceptance test connects a real WebSocket client to the engine, sends `list_conversations`, and observes the returned protocol frames.

## Done when these pass

- [ ] **delivers the authenticated user's conversation list over WebSocket, ignoring foreign userId in the frame** — with history and resume enabled, a client sending `list_conversations` with a foreign userId receives only its own conversation summaries (newest first, with ISO dates and entryCount, without stream_end), and reconnecting with `?sessionId=<id>` resumes that conversation.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses list_conversations with an UNSUPPORTED error when history is not enabled or the store cannot list** — with history disabled/absent or when the session store does not implement `listFor`, the server replies with an error frame carrying code `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations without waiting for a streaming turn in progress to end** — sent while a streaming turn is in progress, `list_conversations` is answered with `conversation_list` before the turn's `stream_end` arrives, proving it executes outside the per-session turn lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Red: acceptance tests in `src/transport/conversationList.acceptance.test.ts` verify the conversation list delivery, unsupported handling, and non-blocking streaming concurrency over WebSocket.
- [ ] Green: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, and `ConversationCursor` types to `src/types/messages.ts`, and `UNSUPPORTED` error code to `src/types/session.ts`.
- [ ] Green: validate `list_conversations` message type, `limit`, and composite `before` keyset cursor in `src/transport/ws/validation.ts`.
- [ ] Green: thread `history` option through `HalEngineConfig`, `createServer`, and handle `list_conversations` using `ws.userId` in `src/transport/ws/messageHandler.ts` off the per-session lock.
- [ ] Refactor: update docs in `example/full-config.ts` and run `npm run docs:fix`.

## Out of scope

- Client-side conversation filtering or re-sorting.
- An operator view of another user's conversations.
- Live tab sync between open browser tabs (ruled out by #124).
- In-band conversation switching without reconnecting.