# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` entry point already accepts a real session store and serves real WebSocket connections. Tests use that path and the real validator; recording delegates preserve real store behavior, and a real Mongo store with an invalid connection URL supplies a deterministic rejection without a test double.

## Done when these pass

- [ ] **validates conversation-list requests and composite cursors independently of configuration** — Accept the additive frame, strip an injected user id, and reject invalid limits and incomplete or invalid cursors with field-specific errors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the authenticated users metadata, pages ties, and opens a listed conversation during a pending turn** — Deliver exactly the owner's ISO metadata in store order, record the authenticated argument and unmodified paging options, bypass the turn lock, and reuse resume for replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers disabled history and a store without listing with UNSUPPORTED, never an empty list** — Default off, explicit off, an original five-member store, and a Mongo collection adapter without find all fail explicitly while leaving the socket usable.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **contains real store failures in a sanitized SERVER_ERROR and keeps the connection usable** — A rejected list is one sanitized error, logged with the session id, without a stream terminator or closing the connection.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively; preserve old message literals and ConnectedMessage.
- [ ] Validate limits and composite ISO cursors without consulting configuration.
- [ ] Thread the separate default-off history option from engine configuration through createServer to the non-locked handler.
- [ ] Read ownership from ws.userId, pass paging options unchanged, and return only ISO summary metadata on request.
- [ ] Answer unavailable listing with UNSUPPORTED, including an exported StoreCannotList for a Mongo collection without find; sanitize and log other failures with the session id.
- [ ] Preserve off-lock delivery and reuse the existing ownership-checked reconnect replay.
- [ ] Document the history disclosure/retention decision and the startup warning when history is enabled without resume; update example/full-config.ts and regenerate docs with docs:fix.
- [ ] Add the consumer changelog entry and MINOR version bump; complete CI checks and maintain coverage floors.

## Out of scope

- Conversation previews or titles, deletion, operator access, server-held paging state, and cross-tab live sync.
- Production implementation in this acceptance-test commit.