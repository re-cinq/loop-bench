# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` already exposes the authenticated WebSocket path and the session store. The acceptance tests use real sockets and the in-memory store to pin its wire behavior.

## Done when these pass

- [ ] **validates the list frame and its composite cursor before handling it** — accepts an unpaged list and rejects malformed page fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user, preserves paging, and opens a listed conversation through resume** — sends metadata summaries for the socket owner, forwards paging, and reuses resume.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is disabled or the store cannot list** — answers `UNSUPPORTED`, never an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a failed list without leaking store detail and keeps the socket open** — answers `SERVER_ERROR`, keeps the connection usable, and logs the session id without private content.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list while a turn is streaming, before stream_end** — bypasses the turn lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two wire frames, their payload types, and the `UNSUPPORTED` error code without changing existing message shapes.
- [ ] Validate `limit` and the complete ISO cursor while ignoring any frame-supplied user id.
- [ ] Thread the opt-in history flag and store into the handler; send owner-only summaries or `UNSUPPORTED` outside the turn lock.
- [ ] Answer store failures with a sanitized `SERVER_ERROR`, and map `StoreCannotList` to `UNSUPPORTED` while retaining the socket.
- [ ] Document the authorization and retention rules, regenerate the getting-started example, add an Unreleased note, and make the MINOR version change.

## Out of scope

- Conversation previews, deletion, server-held paging state, operator access to another user's conversations, and live sync across tabs.